/*
 *  NewShippingOrderRequest
 *  @author: pc
 *  @created 4/13/2025 11:36 PM
 * */


package com.lemoo.shipping.dto.request;

import com.lemoo.shipping.dto.common.ShippingOrderItem;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NewShippingOrderRequest {
    private String from_name;
    private String to_name;
    private String to_phone;
    private String to_address;
    private String to_ward_name;
    private String to_ward_code;
    private String from_ward_code;
    private String to_district_name;
    private int weight;
    private int length;
    private int width;
    private int height;
    private int service_type_id;
    private int payment_type_id;
    private String required_note;
    private String name;
    private int quantity;
    private String client_order_code;
    private List<ShippingOrderItem> items;
}
