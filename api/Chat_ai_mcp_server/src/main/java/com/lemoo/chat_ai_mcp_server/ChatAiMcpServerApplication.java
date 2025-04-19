package com.lemoo.chat_ai_mcp_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@EnableFeignClients
public class ChatAiMcpServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatAiMcpServerApplication.class, args);
    }

}
