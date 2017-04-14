import csv
import boto3
import json
import os
import time


def load_news():
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'news.tsv'), 'r') as f:
        reader = csv.reader(f, delimiter='\t')
        news = [row[0] for row in reader]
        return news


def main():
    if os.environ.get('ENV') == 'production':
        sqs = boto3.resource('sqs', region_name='us-west-2')
        queue = sqs.get_queue_by_name(QueueName='news.fifo')
    else:
        sqs = boto3.resource('sqs', **{
            'region_name': 'us-west-2',
            'aws_access_key_id': '',
            'aws_secret_access_key': '',
            'endpoint_url': 'http://10.200.10.1:5000',
        })
        queue = sqs.create_queue(QueueName='news.fifo')

    news = load_news()
    while True:
        for body in news:
            message = {'body': body}
            queue.send_message(MessageBody=json.dumps(message), MessageGroupId='news')
            time.sleep(60)  # 1 minute
        time.sleep(1)


if __name__ == '__main__':
    main()
