/*
 *  PageHelper
 *  @author: Minhhieuano
 *  @created 2/26/2025 11:14 AM
 * */


package com.lemoo.order_v2.helper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class PageHelper {
    private PageHelper() {
    }

    public static <T> Page<T> toPage(List<T> items, Pageable pageable) {
        int totalElements = items.size();
        return new PageImpl<>(items, pageable, totalElements);
    }
}
