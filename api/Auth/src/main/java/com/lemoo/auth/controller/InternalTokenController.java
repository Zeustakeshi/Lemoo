/*
 *  InternalTokenController
 *  @author: Minhhieuano
 *  @created 10/29/2024 3:17 PM
 * */


package com.lemoo.auth.controller;

import com.lemoo.auth.service.InternalTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/internal/token")
@RequiredArgsConstructor
public class InternalTokenController {

    private final InternalTokenService tokenService;

    @GetMapping("/.well-known/jwks.json")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> getJwkSet() {
        return tokenService.getJwkSets();
    }
}
