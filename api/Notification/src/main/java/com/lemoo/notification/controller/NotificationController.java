/*
 *  NotificationController
 *  @author: Minhhieuano
 *  @created 3/12/2025 6:10 PM
 * */


package com.lemoo.notification.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/hello")
public class NotificationController {
    @GetMapping
    public Mono<String> getSingleNotify() {
        return Mono.just("Hello world");
    }

    @GetMapping("v2")
    public Mono<String> getSingleNotify2() {
        return Mono.just("Hello world v2");
    }

}
