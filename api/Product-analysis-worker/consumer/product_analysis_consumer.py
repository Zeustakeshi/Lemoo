import json
import os

from kafka import KafkaConsumer

from event.ProductAnalysisEvent import ProductAnalysisEvent
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
        try:
            raw_message = message.value.decode('utf-8')
            data = json.loads(raw_message)

            # Manually map camelCase JSON keys to snake_case attributes
            store_data = data.get("store", {})
            skus_data = data.get("skus", [])

            # Create ProductAnalysisEvent object
            event = ProductAnalysisEvent(
                product_id=data.get("productId"),
                name=data.get("name"),
                description=data.get("description"),
                categories=set(data.get("categories", [])),
                store=ProductAnalysisEvent.Store(
                    id=store_data.get("id"),
                    name=store_data.get("name")
                ),
                skus={
                    ProductAnalysisEvent.ProductSku(
                        sku_code=sku.get("skuCode"),
                        name=sku.get("name"),
                        price=sku.get("price"),
                        variants=sku.get("variants", {})
                        image=sku.get("image")
                    ) for sku in skus_data
                }
            )
            analyze_product(event)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
        except Exception as e:
            print(f"Error processing message: {e}")
