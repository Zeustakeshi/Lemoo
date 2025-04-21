/*
 *  ShareVoucherServiceImpl
 *  @author: pc
 *  @created 4/21/2025 10:04 AM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.VoucherTransactionStatus;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.ShareVoucherRequest;
import com.lemoo.promotion.entity.CollectedVoucher;
import com.lemoo.promotion.entity.VoucherTransaction;
import com.lemoo.promotion.event.eventModel.NewShareVoucherEvent;
import com.lemoo.promotion.event.producer.ChatProducer;
import com.lemoo.promotion.exception.BadRequestException;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.repository.VoucherTransactionRepository;
import com.lemoo.promotion.service.ShareVoucherService;
import com.lemoo.promotion.service.VoucherCollectionService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ShareVoucherServiceImpl implements ShareVoucherService {
    private final VoucherTransactionRepository voucherTransactionRepository;
    private final VoucherCollectionService voucherCollectionService;
    private final ChatProducer chatProducer;

    @Override
    @Transactional
    @SneakyThrows
    public String shareVoucher(ShareVoucherRequest request, AuthenticatedAccount account) {

        CollectedVoucher collectedVoucher = voucherCollectionService.findByIdAndUserId(request.getVoucherId(), account.getUserId());

        if (collectedVoucher.getQuantity() > request.getAmount()) {
            throw new BadRequestException("You do not have enough vouchers to complete this sharing request. Please check your available voucher balance.");
        }

        VoucherTransaction transaction = voucherTransactionRepository.save(VoucherTransaction.builder()
                .ownerId(account.getUserId())
                .amount(request.getAmount())
                .status(VoucherTransactionStatus.PENDING)
                .targetId(request.getTargetId())
                .voucherId(request.getVoucherId())
                .build());

        chatProducer.sendNewShareVoucher(NewShareVoucherEvent.builder()
                .targetId(request.getTargetId())
                .userId(account.getUserId())
                .voucherId(request.getVoucherId())
                .transactionId(transaction.getId())
                .chatId(request.getChatId())
                .build());

        return "Voucher shared successfully.";
    }

    @Override
    @Transactional
    public String collectSharedVoucher(String transactionId, AuthenticatedAccount account) {
        VoucherTransaction transaction = voucherTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new NotfoundException("Transaction not found"));
        voucherCollectionService.collectVoucher(account, transaction.getVoucherId());

        transaction.setStatus(VoucherTransactionStatus.COMPLETED);
        voucherTransactionRepository.save(transaction);

        return "You have successfully collected the voucher.";
    }
}
