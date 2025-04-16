from event.BaseEvent import BaseEvent


class ProductAnalysisResultEvent(BaseEvent):
    def __init__(self, product_id: str, message: str):
        self.product_id = product_id
        self.message = message
