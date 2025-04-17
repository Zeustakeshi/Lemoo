from event.BaseEvent import BaseEvent


class ProductAnalysisEvent(BaseEvent):
    def __init__(self, product_id=None, name=None, description=None, categories=None, store=None, skus=None):
        self.product_id = product_id
        self.name = name
        self.description = description
        self.categories = categories if categories is not None else set()
        self.store = store
        self.skus = skus

    class ProductSku:
        def __init__(self, sku_code=None, name=None, price=None, variants=None, image=None):
            self.sku_code = sku_code
            self.name = name
            self.price = price
            self.image = image
            self.variants = variants if variants is not None else {}

    class Store:
        def __init__(self, id=None, name=None):
            self.id = id
            self.name = name
