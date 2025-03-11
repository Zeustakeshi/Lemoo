import json

from kafka import KafkaConsumer

from events.ProductEvaluatedEvent import ProductEvaluatedEvent
from producers.product_evaluation_producer import evaluation_fail_producer, evaluation_success_producer
from utils.product_evaluation import evaluation


def consume_product_evaluation():
    consumer = KafkaConsumer(
        'product-service.evaluation-product',
        bootstrap_servers="127.0.0.1:9093",
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='product-evaluation-worker-group'
    )

    print("Start consume to product-service.evaluation-product topic")

    for message in consumer:
        print("Start consume to product-service.evaluation-product topic1")
        raw_message = message.value.decode('utf-8')
        data = json.loads(raw_message)
        print(data)
        evaluation_result = evaluation(data)
        print(evaluation_result)
        evaluation_event = ProductEvaluatedEvent(
            data["productId"],
            evaluation_result["score"],
            evaluation_result["note"]
        )

        if evaluation_result["score"] < 65:
            evaluation_fail_producer(evaluation_event)
        else:
            evaluation_success_producer(evaluation_event)
