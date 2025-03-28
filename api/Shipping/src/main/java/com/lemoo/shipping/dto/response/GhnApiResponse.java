/*
 *  GhnApiResponse
 *  @author: pc
 *  @created 3/28/2025 2:41 AM
 * */


package com.lemoo.shipping.dto.response;

import lombok.Data;

@Data
public class GhnApiResponse<T> {
    private String code;
    private String message;
    private T data;
}
