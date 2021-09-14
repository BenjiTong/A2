import os
import json
import boto3
from urllib.request import urlopen

from mysql.connector import catch23
from file_utils import FileUtils
from sns_processor import process

SQS_CLIENT = boto3.client('sqs') 

global url 
url = 'https://globalnightlight.s3.amazonaws.com/VIIRS_npp_catalog.json'

wait_area = FileUtils.WAIT_LIST

native_run = FileUtils.native_run

def url_to_json(url: str):
    try:
        with urlopen(url) as furl:
            content = furl.read()
            return json.loads(content)
    except Exception as e:
        print('[ERROR] url load error:{}'.format(url))
    return None
    

def get_links(catalog: json, url: str):
    children = list()
    items = list()
    base_url = ''
    if not catalog['links'][0]['href'].startswith('http'):
        part = url.rpartition('/')
        base_url = part[0] + part[1]
    for link in catalog['links']:
        if link['rel'] == 'child':
            children.append(base_url + ((link['href']).replace('./','')))
        if link['rel'] == 'item':
            items.append(base_url + ((link['href']).replace('./','')))
    return children, items



# STAC processing...  sqs: child-link and push item into sns
def native_handle_sqs(event, context):
    global counter
    records = event['Records']
    if native_run == False:
        to_be_visited_queue = os.environ['CATALOG_CRAWL_QUEUE']
        item_topic_arn = os.environ['STAC_ITEM_TOPIC']
        max_link = int(os.environ['MAX_CHILDREN'])
        max_item = int(os.environ['MAX_ITEM'])

    for record in records:    
        url = record['body']
        print('[INFO] process filename:{}'.format(url))
        # if url.__contains__('/2012') or url.__contains__('/201301'):
        #     print('[INFO] {} already process!'.format(url))
        #     continue
        catalog = url_to_json(url)
        if catalog == None:
            continue
        child_links, items = get_links(catalog, url)
        for clink in child_links:
            print('[INFO] Catalog inserted: ', clink)
            if native_run == False:
                SQS_CLIENT.send_message(QueueUrl=to_be_visited_queue, MessageBody=clink)
            else:
                exx = {'Records':[
                            {'body':clink},   
                    ]}
                native_handle_sqs(exx, None)
            print('[INFO] Catalog inserted OK: ', clink)
        print('[INFO] clink size:{} items size:{}'.format(str(len(child_links)), str(len(items))))
        for item in items:
            itr = url_to_json(item)
            if itr == None:
                continue
            for idx, area in wait_area.items():
                if FileUtils.is_overlap(area, itr['bbox']):
                    result = {
                        'city_id': idx,
                        'bbox': itr['bbox'],
                        'url': itr['assets']['image']['href'],
                        'datetime': itr['properties']['datetime']
                    }
                    print('[INFO] send to Item {}'.format(str(result)))
                    if native_run == False:
                        SQS_CLIENT.send_message(QueueUrl=item_topic_arn,MessageBody=json.dumps(result))
                    else:
                        process(itr['assets']['image']['href'],itr['bbox'],itr['properties']['datetime'],idx)
                    # push tif to SQS*

def sqs_handler(event, context):
    native_handle_sqs(event, context)


def start_handler(event, context):
    if native_run == False:
        SQS_CLIENT.send_message(QueueUrl=os.environ['CATALOG_CRAWL_QUEUE'], MessageBody=url)
    print('[INFO] Inserting root catalog', url)