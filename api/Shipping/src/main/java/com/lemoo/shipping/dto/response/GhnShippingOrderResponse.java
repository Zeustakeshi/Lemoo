/*
 *  GhnShippingOrderDetailResponse
 *  @author: pc
 *  @created 4/15/2025 9:12 AM
 * */


package com.lemoo.shipping.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class GhnShippingOrderResponse {
    private ApiData data;

    @Data
    public static class ApiData {
        private String content;
        private String order_code;
        private String status;
        private LocalDateTime order_date;
        private LocalDateTime finish_date;
        private LocalDateTime pickup_time;
        private LocalDateTime leadtime;
        private LeadtimeOrder leadtime_order;
        private Set<Log> logs;
        private Long cod_amount;
    }

    @Data
    public static class LeadtimeOrder {
        private String from_estimate_date;
        private String to_estimate_date;
        private String picked_date;
    }

    @Data
    public static class Log {
        private String status;
        private int payment_type_id;
        private String trip_code;
        private String updated_date;
    }


}
