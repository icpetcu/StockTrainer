import boto3
import json
import os
import random
import time


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

    while True:
        message = {
            'sym': random.choice(['FB', 'TSLA', 'GOOG', 'AAPL']),
            'price': random.randint(100, 110),
        }
        queue.send_message(MessageBody=json.dumps(message), MessageGroupId='prices')
        time.sleep(2)


if __name__ == '__main__':
    main()
