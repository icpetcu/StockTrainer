import boto3
import json
import os
import time
import tornado.gen


async def fetch_prices(*args, **kwargs):
    db = kwargs['db']
    if os.environ.get('ENV') == 'production':
        sqs = boto3.resource('sqs')
    else:
        sqs = boto3.resource('sqs', {
            'region_name': 'us-west-2',
            'aws_access_key_id': '',
            'aws_secret_access_key': '',
            'endpoint_url': 'http://localhost:5000',
        })

    queue = sqs.get_queue_by_name(QueueName='prices.fifo')
    while True:
        for message in queue.receive_messages(WaitTimeSeconds=1, VisibilityTimeout=2):
            doc = json.loads(message.body)
            doc['ts'] = time.time()
            await db.prices_test.insert_one(doc)
            print (doc)
            message.delete()
        await tornado.gen.sleep(1)
