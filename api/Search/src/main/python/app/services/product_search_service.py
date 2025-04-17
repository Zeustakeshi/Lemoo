import json
import os

from google import genai
from google.genai import types
from langgraph.constants import START, END
from langgraph.graph import StateGraph

from ..configs.vectordb_config import get_vector_store
from ..models.response.ProductSearchResponse import ProductSearchResponse
from ..models.state.ProductSearchState import ProductSearchState

generate_content_config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_schema=genai.types.Schema(
        type=genai.types.Type.OBJECT,
        required=["search_keywords"],
        properties={
            "search_keywords": genai.types.Schema(
                type=genai.types.Type.ARRAY,
                items=genai.types.Schema(
                    type=genai.types.Type.STRING,
                ),
            ),
        },
    ),
)


def analyze_user_query(state: ProductSearchState) -> ProductSearchState:
    client = genai.Client(
        api_key=os.environ.get("GOOGLE_API_KEY"),
    )

    prompt = f"""
    Bạn là chuyên gia phân tích từ khóa trong thương mại điện tử. Sản phẩm được lưu trong vectordb với cấu trúc như sau:
    - "product_id": mã sản phẩm,
    - "sku_code": mã sku,
    - "sku_name": tên sku,
    - "price": giá sku,
    - "variants": biến thể của sku (ví dụ nếu sku là "đỏ - xl" thì sku này thuộc biến thể màu sắc và kích thước),
    - "store_id": mã cửa hàng,
    - "store_name": tên cửa hàng.

    Nhiệm vụ của bạn là phân tích truy vấn của người dùng và tạo ra một danh sách từ khóa mở rộng bao gồm các từ đồng nghĩa, thuộc tính liên quan, và các thuật ngữ có thể xuất hiện trong tên hoặc mô tả sản phẩm để tối ưu hóa việc tìm kiếm. Hãy bao gồm bất kỳ thuộc tính cụ thể nào được nhắc đến trong truy vấn, chẳng hạn như màu sắc, kích thước, thương hiệu, hoặc tên cửa hàng. 

    Ví dụ: Nếu người dùng tìm kiếm 'điện thoại chụp ảnh đẹp', bạn nên tạo ra các từ khóa như 'camera đẹp', 'độ phân giải cao', 'chụp đêm tốt', 'bộ nhớ trong lớn', v.v.

    Hãy trả về một đối tượng JSON với key 'search_keywords' chứa danh sách các từ khóa, ví dụ: {{'search_keywords': ['keyword1', 'keyword2', ...]}}. 
    Tối đa 5 keywords
    Truy vấn của người dùng: {state['search_query']}
    """

    response = client.models.generate_content(
        config=generate_content_config,
        model="gemini-2.0-flash",
        contents=prompt
    )

    state["keywords"] = json.loads(response.text)["search_keywords"]
    return state


def vector_store_search(state: ProductSearchState) -> ProductSearchState:
    vector_store = get_vector_store()
    state["results"] = vector_store.similarity_search("".join(state["search_query"]), k=3)
    return state


graph_builder = StateGraph(ProductSearchState)
graph_builder.add_node("analyze_user_query", analyze_user_query)
graph_builder.add_node("vector_store_search", vector_store_search)

graph_builder.add_edge(START, "analyze_user_query")
graph_builder.add_edge("analyze_user_query", "vector_store_search")
graph_builder.add_edge("vector_store_search", END)

graph = graph_builder.compile()


def search_product(query: str) -> list[ProductSearchResponse]:
    vector_store = get_vector_store()
    docs = vector_store.similarity_search(query, k=10)
    products = []
    for doc in docs:
        products.append(ProductSearchResponse(
            id=doc.metadata.get("product_id"),
            name=doc.page_content.split(",")[0].split(":")[1].strip(),
            price=doc.metadata.get("price"),
            image=doc.metadata.get("image"),
            sku_code=doc.metadata.get("sku_code"),
            sku_name=doc.metadata.get("sku_name"),
            store_id=doc.metadata.get("store_id"),
            store_name=doc.metadata.get("store_name")
        ))

    return products
