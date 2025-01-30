/*
 *  AdminConsumer
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:38 PM
 * */


package com.lemoo.auth.event.consumer;

import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.event.eventModel.NewSellerEvent;
import com.lemoo.auth.event.eventModel.SellerRoleCreatedEvent;
import com.lemoo.auth.event.producer.AdminProducer;
import com.lemoo.auth.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminConsumer {

    private final AccountService accountService;
    private final AdminProducer adminProducer;

    @KafkaListener(topics = "admin-service.seller.new", groupId = "${spring.kafka.consumer.group-id}")
    public void newSellerEventListener(NewSellerEvent event) {
        String accountId = event.getAccountId();
        accountService.addAccountAuthority(accountId, Role.SELLER);
        
        adminProducer.sellerRoleCreated(SellerRoleCreatedEvent.builder()
                .accountId(accountId)
                .build());
    }
}
