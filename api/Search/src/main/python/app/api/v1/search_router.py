from fastapi import APIRouter

from src.main.python.app.services.product_search_service import search_product

router = APIRouter(prefix="/search", tags=["v1"])


@router.get("")
async def search(q: str):
    return search_product(q)
