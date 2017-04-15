import boto3
import json
import os
import time
import tornado.gen


async def fetch_news(*args, **kwargs):
    db = kwargs['db']
    if os.environ.get('ENV') == 'production':
        sqs = boto3.resource('sqs', region_name='us-west-2')
    else:
        sqs = boto3.resource('sqs', **{
            'region_name': 'us-west-2',
            'aws_access_key_id': '',
            'aws_secret_access_key': '',
            'endpoint_url': 'http://10.200.10.1:5000',
        })

    queue = sqs.get_queue_by_name(QueueName='news.fifo')
    while True:
        for message in queue.receive_messages(WaitTimeSeconds=2, VisibilityTimeout=2):
            doc = json.loads(message.body)
            doc['ts'] = time.time()
            await db.news.insert_one(doc)
            message.delete()
        await tornado.gen.sleep(0.2)
