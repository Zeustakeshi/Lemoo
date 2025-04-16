from langchain_core.documents import Document
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
import os

from event.ProductAnalysisEvent import ProductAnalysisEvent
from helper.embedding_helper import get_embedding_model, extract_text_for_embedding


def init_vector_store() -> QdrantVectorStore:
    qdrant_client = QdrantClient(url=os.getenv("QDRANT_URL"))
    collection_name = "products"

    try:
        qdrant_client.get_collection(collection_name)
    except:
        qdrant_client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=768, distance=Distance.COSINE)
        )

    return QdrantVectorStore(
        client=qdrant_client,
        collection_name=collection_name,
        embedding=get_embedding_model()
    )


def create_document(product_event: ProductAnalysisEvent, sku: ProductAnalysisEvent.ProductSku):
    text = extract_text_for_embedding(product_event, sku)
    metadata = {
        "product_id": product_event.product_id,
        "sku_code": sku.sku_code,
        "sku_name": sku.name,
        "price": sku.price,
        "variants": sku.variants,
        "store_id": product_event.store.id if product_event.store else None,
        "store_name": product_event.store.name if product_event.store else None
    }
    return Document(page_content=text, metadata=metadata)


def save_to_db(product_event: ProductAnalysisEvent, vector_store: QdrantVectorStore):
    documents = [create_document(product_event, sku) for sku in product_event.skus]
    vector_store.add_documents(documents)
    print(f"Save {len(documents)} SKU to Qdrant.")
