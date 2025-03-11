from events.BaseEvent import BaseEvent


class ProductEvaluatedEvent(BaseEvent):
    def __init__(self, product_id: str, score: int, note: str):
        self.product_id = product_id
        self.score = score
        self.note = note
