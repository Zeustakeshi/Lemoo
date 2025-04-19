package com.lemoo.chat_ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ChatAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatAiApplication.class, args);
    }


}
