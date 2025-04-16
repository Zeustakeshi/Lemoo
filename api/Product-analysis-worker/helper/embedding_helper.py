from event.ProductAnalysisEvent import ProductAnalysisEvent
from langchain_google_genai import GoogleGenerativeAIEmbeddings


def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")


def extract_text_for_embedding(product_event: ProductAnalysisEvent, sku: ProductAnalysisEvent.ProductSku):
    categories_str = ", ".join(product_event.categories) if product_event.categories else ""
    store_info = f"Store: {product_event.store.name} (ID: {product_event.store.id})" if product_event.store else ""
    variants_str = ", ".join([f"{k} - {v}" for k, v in sku.variants.items()]) if sku.variants else ""
    text = f"Product: {product_event.name}, SKU: {sku.name}, Description: {product_event.description}, Categories: {categories_str}, {store_info}, Variants: {variants_str}"
    return text
