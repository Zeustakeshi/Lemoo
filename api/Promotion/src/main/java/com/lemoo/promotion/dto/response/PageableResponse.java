package com.lemoo.promotion.dto.response;

import java.util.List;

import lombok.Data;

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
