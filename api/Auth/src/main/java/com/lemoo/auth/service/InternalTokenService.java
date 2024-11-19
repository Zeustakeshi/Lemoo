/*
 *  InternalTokenService
 *  @author: Minhhieuano
 *  @created 10/29/2024 3:16 PM
 * */


package com.lemoo.auth.service;

import java.util.Map;

public interface InternalTokenService {
    Map<String, Object> getJwkSets();
}
