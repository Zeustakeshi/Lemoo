/*
 *  NotificationService
 *  @author: Minhhieuano
 *  @created 2/12/2025 1:06 AM
 * */

package com.lemoo.chat.service;

public interface NotificationService {
    void sendNewMessageNotification(String message, String roomId, String senderId);
}
