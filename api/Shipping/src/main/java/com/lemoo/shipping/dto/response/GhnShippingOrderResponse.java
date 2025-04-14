/*
 *  GhnShippingOrderResponse
 *  @author: pc
 *  @created 4/14/2025 11:36 PM
 * */


package com.lemoo.shipping.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GhnShippingOrderResponse {
    private int code;
    private String code_message_value;
    private ResponseData data;
    private String message;
    private String message_display;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseData {
        private String order_code;
        private String sort_code;
        private String trans_type;
        private String ward_encode;
        private String district_encode;
        private Fee fee;
        private int total_fee;
        private String expected_delivery_time;
        private String operation_partner;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Fee {
        private int main_service;
        private int insurance;
        private int cod_fee;
        private int station_do;
        private int station_pu;
        private int return_fee;
        private int r2s;
        private int return_again;
        private int coupon;
        private int document_return;
        private int double_check;
        private int double_check_deliver;
        private int pick_remote_areas_fee;
        private int deliver_remote_areas_fee;
        private int pick_remote_areas_fee_return;
        private int deliver_remote_areas_fee_return;
        private int cod_failed_fee;
    }
}