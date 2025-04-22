/*
 *  ProductSearchService
 *  @author: pc
 *  @created 4/17/2025 11:42 PM
 * */


package com.lemoo.chat_ai_mcp_server.service;

import com.lemoo.chat_ai_mcp_server.client.SearchClient;
import com.lemoo.chat_ai_mcp_server.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductSearchService {
    private final SearchClient searchClient;

    @Tool(
            name = "naturalSearchProducts",
            description = "Searches for products in the e-commerce system based on a natural language query. The tool uses Retrieval-Augmented Generation (RAG) to process the query and return a list of relevant products. The query can include product names, categories, price ranges, or specific attributes (e.g., 'smartphone under 10 million VND', 'red dress for women'). The tool returns a list of ProductSearchResponse objects containing product details such as name, price, and description. Use this tool when the user asks for product recommendations or searches for specific items."
    )
    public ApiResponse<?> searchProduct(String query) {
        return ApiResponse.success(searchClient.searchProducts(query));
    }
}
