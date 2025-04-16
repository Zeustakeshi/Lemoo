from event.ProductAnalysisEvent import ProductAnalysisEvent
from event.ProductAnalysisResultEvent import ProductAnalysisResultEvent
from helper.vector_store_helper import init_vector_store, save_to_db
from producer.product_producer import analysis_success_producer, analysis_failed_producer

vector_store = init_vector_store()


def analyze_product(event: ProductAnalysisEvent):
    try:
        save_to_db(event, vector_store)
        analysis_success_producer(ProductAnalysisResultEvent(
            product_id=event.product_id,
            message="Analysis product success."
        ))
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        analysis_failed_producer(ProductAnalysisResultEvent(
            product_id=event.product_id,
            message=f"Analysis product failed with error: {str(e)}."
        ))
