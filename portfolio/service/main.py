import json

import motorengine
import tornado.ioloop
import tornado.web

from models import Portfolio


class MainHandler(tornado.web.RequestHandler):
    def get_user(self):
        return 1

    async def get(self):
        user = self.get_user()
        portfolio = await Portfolio.objects.get(user=user)
        if portfolio is None:
            portfolio = await Portfolio.objects.create(user=user)
        self.write(json.dumps(portfolio.serialize()))

    async def post(self):
        user = self.get_user()
        data = json.loads(self.request.body.decode("utf-8"))
        portfolio = await Portfolio.objects.get(user=user)
        if portfolio is None:
            self.set_status(404, 'Portfolio not found!')
            return

        try:
            action = data.get('action')
            if action == 'reset':
                await portfolio.reset()
            else:
                await portfolio.make_deal(data['sym'], data['units'], data['price'])
            self.write(json.dumps(portfolio.serialize()))
        except Exception as e:
            self.write(str(e))


def main():
    app = tornado.web.Application([
        (r"/", MainHandler),
    ])
    app.listen(8003)

    io_loop = tornado.ioloop.IOLoop.current()
    motorengine.connect("test", host="10.200.10.1", port=27017, io_loop=io_loop)
    io_loop.start()


if __name__ == "__main__":
    main()
