from kafka import KafkaProducer
import os
import json

from event.ProductAnalysisResultEvent import ProductAnalysisResultEvent

producer = KafkaProducer(
    bootstrap_servers=os.getenv("KAFKA_BOOTSTRAP_SERVER", "localhost:9093"),
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)


def analysis_success_producer(event: ProductAnalysisResultEvent):
    producer.send("product-analysis-worker.analysis-success", event.to_dict())


def analysis_failed_producer(event: ProductAnalysisResultEvent):
    producer.send("product-analysis-worker.analysis-failed", event.to_dict())
