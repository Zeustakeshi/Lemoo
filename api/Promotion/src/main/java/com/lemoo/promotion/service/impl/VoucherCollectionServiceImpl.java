/*
 *  UserVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:02 PM
 */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.CollectedVoucherStatus;
import com.lemoo.promotion.common.enums.VoucherStatus;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.UserVoucherResponse;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.entity.CollectedVoucher;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import com.lemoo.promotion.event.eventModel.PromotionCheckedEvent;
import com.lemoo.promotion.event.producer.OrderProducer;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.mapper.UserVoucherMapper;
import com.lemoo.promotion.repository.BaseVoucherRepository;
import com.lemoo.promotion.repository.UserVoucherRepository;
import com.lemoo.promotion.service.VoucherCollectionService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class VoucherCollectionServiceImpl implements VoucherCollectionService {

    private final OrderProducer orderProducer;
    private final BaseVoucherRepository baseVoucherRepository;
    private final UserVoucherRepository userVoucherRepository;
    private final UserVoucherMapper userVoucherMapper;
    private final RedissonClient redisson;

    @Override
    @Transactional
    public UserVoucherResponse collectVoucher(AuthenticatedAccount account, String voucherId) {
        RLock lock = redisson.getLock("voucherLock:" + voucherId);
        try {
            if (!lock.tryLock(20, 30, TimeUnit.SECONDS)) {
                throw new RuntimeException("Could not acquire the lock.");
            }
            return processVoucherCollection(account, voucherId);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Thread was interrupted while acquiring the lock.", e);
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    private UserVoucherResponse processVoucherCollection(AuthenticatedAccount account, String voucherId) {
        BaseVoucher voucher = baseVoucherRepository.findById(voucherId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));
        return switch (voucher.getVoucherType()) {
            case REGULAR_VOUCHER -> collectRegularVoucher((RegularVoucher) voucher, account);
            case STORE_FOLLOWER_VOUCHER -> collectStoreFollowerVoucher((StoreFollowerVoucher) voucher, account);
//            case FIRST_PURCHASE -> collectFirstPurchaseVoucher((FirstPurchaseVoucher) voucher, account);
            default -> throw new UnsupportedOperationException("Unsupported voucher type: " + voucher.getVoucherType());
        };
    }

    private UserVoucherResponse collectRegularVoucher(RegularVoucher voucher, AuthenticatedAccount account) {
        validateVoucherEligibility(voucher, account);

        boolean isActiveNow = voucher.getPeriodStartTime().isBefore(LocalDateTime.now());
        CollectedVoucher collectedVoucher = userVoucherRepository.save(
                CollectedVoucher.builder()
                        .userId(account.getUserId())
                        .voucherId(voucher.getId())
                        .status(isActiveNow ? CollectedVoucherStatus.ACTIVE : CollectedVoucherStatus.NOT_STARTED)
                        .collectedAt(LocalDateTime.now())
                        .build()
        );

        updateVoucherAvailability(voucher);
        return userVoucherMapper.toUserVoucherResponse(collectedVoucher);
    }

    private UserVoucherResponse collectStoreFollowerVoucher(StoreFollowerVoucher voucher, AuthenticatedAccount account) {
        validateVoucherAvailability(voucher);
        // Custom logic for Store Follower Voucher
        return null; // Placeholder
    }

//    private UserVoucherResponse collectFirstPurchaseVoucher(FirstPurchaseVoucher voucher, AuthenticatedAccount account) {
//        validateVoucherEligibility(voucher, account);
//        // Custom logic for First Purchase Voucher
//        return null; // Placeholder
//    }

    private void validateVoucherEligibility(BaseVoucher voucher, AuthenticatedAccount account) {
        validateVoucherAvailability(voucher);
        if (!canCollectedVoucher(voucher, account.getUserId())) {
            throw new ForbiddenException("You do not meet the conditions to collect this voucher.");
        }
    }

    private void validateVoucherAvailability(BaseVoucher voucher) {
        if (!isVoucherAvailable(voucher)) {
            throw new ForbiddenException("Voucher is not available.");
        }
    }

    private boolean isVoucherAvailable(BaseVoucher voucher) {
        return voucher.getLimit() > 0 &&
                voucher.getTotalAvailable() > 0 &&
                VoucherStatus.ACTIVE.equals(voucher.getStatus());
    }

    private boolean canCollectedVoucher(BaseVoucher voucher, String userId) {
        boolean alreadyCollected = userVoucherRepository.existsByUserIdAndVoucherId(userId, voucher.getId());
        if (alreadyCollected && voucher.getLimit() == 1) {
            return false;
        }
        return voucher.getCollectStartTime() == null ||
                voucher.getCollectStartTime().isBefore(LocalDateTime.now());
    }

    private void updateVoucherAvailability(BaseVoucher voucher) {
        voucher.setTotalAvailable(voucher.getTotalAvailable() - 1);
        baseVoucherRepository.save(voucher);
    }

    @Override
    public void checkOrderVoucher(String orderId, String userId, Set<String> promotions) {
        orderProducer.promotionChecked(PromotionCheckedEvent.builder()
                .orderId(orderId)
                .build());
    }
}
