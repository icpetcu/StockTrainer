import boto3
import json
import time
import tornado.gen


try:
    from aws_config import *
    aws_credentials = {
        'region_name': REGION,
        'aws_access_key_id': AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': AWS_SECRET_ACCESS_KEY
    }
except:
    aws_credentials = {}


async def fetch_prices(*args, **kwargs):
    db = kwargs['db']
    sqs = boto3.resource('sqs', **aws_credentials)
    queue = sqs.get_queue_by_name(QueueName='prices.fifo')
    while True:
        for message in queue.receive_messages(WaitTimeSeconds=1, VisibilityTimeout=2):
            doc = json.loads(message.body)
            doc['ts'] = time.time()
            await db.prices_test.insert_one(doc)
            message.delete()
        await tornado.gen.sleep(1)
