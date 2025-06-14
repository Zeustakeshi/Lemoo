package com.lemoo.chat_ai_mcp_server.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class PageableResponse<T> {
    private int totalPages;
    private int totalElements;
    private int size;
    private List<T> content;
    private boolean first;
    private boolean last;
    private int pageNumber;
    private boolean empty;
}
