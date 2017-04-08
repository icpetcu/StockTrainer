import json

import time
import tornado.web

from pymongo import CursorType
from sse import Sse
from tornado.iostream import StreamClosedError


class StreamHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.set_header('Content-Type', 'text/event-stream')
        self.set_header('Cache-Control', 'no-cache')
        self.set_header('X-Accel-Buffering', 'no')
        self.sse = Sse()
        self.stream = True

    def on_connection_close(self):
        self.stream = False
        super().on_connection_close()

    async def publish(self, message=None):
        try:
            if message is not None:
                self.sse.add_message('message', message)
            for item in self.sse:
                self.write(item)
            await self.flush()
        except StreamClosedError:
            self.stream = False

    async def get(self):
        # Send retry option to client
        await self.publish()

        ts = time.time() - 1800  # last 30 minutes
        collection = self.settings['db'].news
        cursor = collection.find({'ts': {'$gt': ts}}, cursor_type=CursorType.TAILABLE_AWAIT)
        while self.stream:
            if not cursor.alive:
                cursor = collection.find({'ts': {'$gt': ts}}, cursor_type=CursorType.TAILABLE_AWAIT)

            if (await cursor.fetch_next):
                doc = cursor.next_object()
                doc.pop('_id')
                ts = doc['ts']
                await self.publish(json.dumps(doc))
