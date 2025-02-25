package com.lemoo.order_v2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class OrderV2Application {

    public static void main(String[] args) {
        SpringApplication.run(OrderV2Application.class, args);
    }

}
