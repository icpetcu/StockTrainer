import csv
import boto3
import json
import os
import random
import time
from threading import Thread


def load_prices():
    stocks = ['TSLA', 'FB', 'AAPL', 'GOOG']
    prices = {}

    data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
    for sym in stocks:
        with open(os.path.join(data_dir, '%s.csv' % sym), 'r') as f:
            reader = csv.reader(f)
            prices[sym] = [float(row[0]) for row in reader]

    return prices


def stream_prices(queue, sym, prices):
    while True:
        for price in prices:
            message = {'sym': sym, 'price': price}
            queue.send_message(MessageBody=json.dumps(message), MessageGroupId='prices')
            time.sleep(1 + random.random())
        time.sleep(1)


def main():
    if os.environ.get('ENV') == 'production':
        sqs = boto3.resource('sqs')
        queue = sqs.get_queue_by_name(QueueName='prices.fifo')
    else:
        sqs = boto3.resource('sqs', **{
            'region_name': 'us-west-2',
            'aws_access_key_id': '',
            'aws_secret_access_key': '',
            'endpoint_url': 'http://10.200.10.1:5000',
        })
        queue = sqs.create_queue(QueueName='prices.fifo')

    prices = load_prices()
    threads = [Thread(target=stream_prices, args=(queue, sym, prices)) for sym, prices in prices.items()]
    for t in threads:
        t.start()


if __name__ == '__main__':
    main()
