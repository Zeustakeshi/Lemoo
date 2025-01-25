/*
 *  CartController
 *  @author: Minhhieuano
 *  @created 1/25/2025 11:00 AM
 * */


package com.lemoo.order.controller;

import com.lemoo.order.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
}
