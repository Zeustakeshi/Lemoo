/*
 *  GhnShippingOrderDetailResponse
 *  @author: pc
 *  @created 4/15/2025 9:12 AM
 * */


package com.lemoo.shipping.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GhnShippingOrderResponse {
    private ApiData data;
    private Integer code;
    private String message;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiData {
        private String content;
        private String order_code;
        private String status;
        private String order_date;
        private String finish_date;
        private String pickup_time;
        private String leadtime;
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
