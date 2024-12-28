/*
 *  MailService
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:57 AM
 * */

package com.lemoo.notification.service;

import com.lemoo.notification.common.enums.MailType;
import java.util.Map;

public interface MailService {
	void sendMail(MailType mailType, Map<String, Object> model, String recipient);
}
