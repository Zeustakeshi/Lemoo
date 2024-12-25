/*
 *  MailTemplate
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:40 AM
 * */

package com.lemoo.notification.mail;

import java.util.Map;

public interface MailTemplate {
    String getSubject();

    String getContent(Map<String, Object> model);
}
