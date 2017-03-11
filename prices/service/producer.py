import boto3
import json
import random
import time

try:
    from aws_config import *
    aws_credentials = {
        'region_name': REGION,
        'aws_access_key_id': AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': AWS_SECRET_ACCESS_KEY
    }
except:
    aws_credentials = {}


def main():
    sqs = boto3.resource('sqs', **aws_credentials)
    queue = sqs.get_queue_by_name(QueueName='prices.fifo')

    while True:
        message = {
            'sym': 'FB',
            'price': random.randint(1000, 4000) * 0.0001,
        }
        queue.send_message(MessageBody=json.dumps(message), MessageGroupId='prices')
        time.sleep(2)


if __name__ == '__main__':
    main()
