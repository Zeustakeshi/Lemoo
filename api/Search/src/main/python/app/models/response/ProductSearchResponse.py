from typing_extensions import TypedDict


class ProductSearchResponse(TypedDict):
    id: str
    name: str
    price: int
    image: str
    sku_code: str
    sku_name: str
    store_id: str
    store_name: str
