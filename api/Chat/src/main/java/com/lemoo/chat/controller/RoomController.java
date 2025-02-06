/*
 *  RoomController
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:19 AM
 * */


package com.lemoo.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    @GetMapping
    public void getAllRoom(
            
    ) {

    }

}
