package com.lemoo.promotion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PromotionApplication {
	public static void main(String[] args) {
		SpringApplication.run(PromotionApplication.class, args);
	}
}
