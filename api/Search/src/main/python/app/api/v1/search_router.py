from fastapi import APIRouter

from ...models.response.ApiResponse import ApiResponse
from ...models.response.ProductSearchResponse import ProductSearchResponse
from ...services.product_search_service import search_product

router = APIRouter(prefix="/search", tags=["v1"])


@router.get("")
async def search(q: str) -> ApiResponse[list[ProductSearchResponse]]:
    return ApiResponse.success(search_product(q))
