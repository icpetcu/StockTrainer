import motor
import tornado.ioloop
import tornado.web
from tornado import gen

from consumer import fetch_prices
from stream import StreamHandler


class MainHandler(tornado.web.RequestHandler):
    @gen.coroutine
    def get(self):
        self.write('Hello world!')

def main():
    db = motor.motor_tornado.MotorClient().test
    app = tornado.web.Application([
        (r"/stream", StreamHandler),
        (r"/", MainHandler),
    ], db=db)
    app.listen(8004)

    io_loop = tornado.ioloop.IOLoop.current()
    io_loop.spawn_callback(fetch_prices, db=db)
    io_loop.start()


if __name__ == '__main__':
    main()
