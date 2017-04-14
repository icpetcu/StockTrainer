import json
import jwt
import os

import motorengine
import tornado.ioloop
import tornado.web

from models import Portfolio


class MainHandler(tornado.web.RequestHandler):
    def get_user(self):
        header = self.request.headers.get('Authorization')
        try:
            token = header.split()[1]
            return jwt.decode(token, verify=False)['sub']
        except:
            return None

    async def get(self):
        user = self.get_user()
        if user is None:
            self.set_status(401)
            return

        portfolio = await Portfolio.objects.get(user=user)
        if portfolio is None:
            portfolio = await Portfolio.objects.create(user=user)
        self.write(json.dumps(portfolio.serialize()))

    async def post(self):
        user = self.get_user()
        if user is None:
            self.set_status(401)
            return

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
    db_name = os.environ.get('DB_NAME', 'test')
    db_host = os.environ.get('DB_HOST', '10.200.10.1')
    db_port = os.environ.get('DB_PORT', '27017')
    db_user = os.environ.get('DB_USER', '')
    db_password = os.environ.get('DB_PASSWORD', '')

    credentials = None if not db_user else '{0}:{1}@'.format(db_user, db_password)
    if credentials is not None:
        db_url = 'mongodb://{0}{1}:{2}/{3}'.format(credentials, db_host, db_port, db_name)
    else:
        db_url = 'mongodb://{0}:{1}/'.format(db_host, db_port)

    app = tornado.web.Application([
        (r"/", MainHandler),
    ])
    app.listen(8003)

    io_loop = tornado.ioloop.IOLoop.current()
    motorengine.connect(db_name, host=db_url, io_loop=io_loop)
    io_loop.start()


if __name__ == "__main__":
    main()
