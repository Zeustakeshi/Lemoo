import json

from kafka import KafkaProducer

from config.kafka_config import KAFKA_BOOTSTRAP_SERVER
from events.ProductEvaluatedEvent import ProductEvaluatedEvent

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVER,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)


def evaluation_success_producer(event: ProductEvaluatedEvent):
    producer.send("product-evaluation-worker.evaluation-success", event.to_dict())


def evaluation_fail_producer(event: ProductEvaluatedEvent):
    producer.send("product-evaluation-worker.evaluation-failed", event.to_dict())
