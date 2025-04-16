from xml.dom.minidom import Document

from typing_extensions import TypedDict


class ProductSearchState(TypedDict):
    search_query: str
    keywords: list[str]
    results: list[Document]
