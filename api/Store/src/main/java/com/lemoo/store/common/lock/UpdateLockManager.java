/*
 *  UpdateLockManager
 *  @author: Minhhieuano
 *  @created 12/13/2024 9:15 PM
 * */


package com.lemoo.store.common.lock;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class UpdateLockManager {
    private final ConcurrentHashMap<String, Object> locks = new ConcurrentHashMap<>();

    public Object getLock(String lockKey) {
        return locks.computeIfAbsent(lockKey, key -> new Object());
    }

    public void releaseLock(String lockKey) {
        locks.remove(lockKey);
    }
}
