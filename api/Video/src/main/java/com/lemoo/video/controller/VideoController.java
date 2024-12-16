/*
 *  VideoController
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:58 PM
 * */


package com.lemoo.video.controller;

import com.lemoo.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;
}
