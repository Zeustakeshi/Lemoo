/*
 *  CartController
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:39 PM
 * */


package com.lemoo.order_v2.controller;

import com.lemoo.order_v2.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartItemService cartItemService;
}
