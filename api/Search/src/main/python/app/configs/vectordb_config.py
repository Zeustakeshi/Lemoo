import os
from threading import Lock

from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from src.main.python.app.configs.embedding_config import get_embeddings

vector_store = None
vector_store_lock = Lock()


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
        embedding=get_embeddings()
    )


def get_vector_store() -> QdrantVectorStore:
    global vector_store
    with vector_store_lock:
        if vector_store is None:
            vector_store = init_vector_store()
    return vector_store
