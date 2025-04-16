from kafka import KafkaConsumer
import os
import json
from handler.product_analysis_handler import analyze_product


def consume_product_analysis():
    consumer = KafkaConsumer(
        'product-service.analyze-product',
        bootstrap_servers=os.getenv("KAFKA_BOOTSTRAP_SERVER", "localhost:9093"),
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='product-analysis-worker-group'
    )

    print("Start consume to product-service.analyze-product topic")

    for message in consumer:
        raw_message = message.value.decode('utf-8')
        data = json.loads(raw_message)
        analyze_product(data)
