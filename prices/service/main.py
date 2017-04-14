import os
import motor
import tornado.ioloop
import tornado.web

from consumer import fetch_prices
from stream import StreamHandler


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

    db = motor.motor_tornado.MotorClient(db_url)[db_name]

    app = tornado.web.Application([
        (r"/", StreamHandler),
    ], db=db)
    app.listen(8004)

    io_loop = tornado.ioloop.IOLoop.current()
    io_loop.spawn_callback(fetch_prices, db=db)
    io_loop.start()


if __name__ == '__main__':
    main()
