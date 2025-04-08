/*
 *  UserVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:02 PM
 */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.CollectedVoucherStatus;
import com.lemoo.promotion.common.enums.VoucherStatus;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.CollectedVoucherResponse;
import com.lemoo.promotion.dto.response.PageableResponse;
import com.lemoo.promotion.dto.response.UserVoucherResponse;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.entity.CollectedVoucher;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import com.lemoo.promotion.event.producer.OrderProducer;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.mapper.PageMapper;
import com.lemoo.promotion.mapper.UserVoucherMapper;
import com.lemoo.promotion.repository.BaseVoucherRepository;
import com.lemoo.promotion.repository.CollectedVoucherRepository;
import com.lemoo.promotion.service.StoreService;
import com.lemoo.promotion.service.VoucherCollectionService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class VoucherCollectionServiceImpl implements VoucherCollectionService {

    private final OrderProducer orderProducer;
    private final BaseVoucherRepository baseVoucherRepository;
    private final CollectedVoucherRepository collectedVoucherRepository;
    private final UserVoucherMapper userVoucherMapper;
    private final RedissonClient redisson;
    private final PageMapper pageMapper;
    private final StoreService storeService;

    @Override
    public Boolean isCollectedVoucher(String userId, String voucherId) {
        return collectedVoucherRepository.existsByUserIdAndVoucherId(userId, voucherId);
    }

    @Override
    public PageableResponse<UserVoucherResponse> getAllVoucherByStoreId(String storeId, int page, int limit) {

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

        Page<BaseVoucher> vouchers = baseVoucherRepository.findAllByStoreIdAndStatus(storeId, VoucherStatus.ACTIVE, request);
        Page<UserVoucherResponse> userVoucherResponses = vouchers.map(userVoucherMapper::toUserVoucherResponse);

        return pageMapper.toPageableResponse(userVoucherResponses);
    }

    @Override
    @Transactional
    public CollectedVoucherResponse collectVoucher(AuthenticatedAccount account, String voucherId) {
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

    @Override
    public PageableResponse<CollectedVoucherResponse> getAllCollectedVoucher(AuthenticatedAccount account, int page, int limit) {
        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<CollectedVoucher> vouchers = collectedVoucherRepository.findAllByUserId(account.getUserId(), request);

        return pageMapper.toPageableResponse(vouchers.map(collectedVoucher -> CompletableFuture.supplyAsync(() -> {
            BaseVoucher voucher = baseVoucherRepository.findById(collectedVoucher.getVoucherId())
                    .orElseThrow(() -> new NotfoundException("Voucher not found"));
            return userVoucherMapper.toCollectedVoucherResponse(collectedVoucher, voucher);
        })).map(CompletableFuture::join));

    }

    @Override
    @Transactional
    public void updateUserVoucherQuantity(String userId, Set<String> vouchers) throws Exception {
        List<CollectedVoucher> collectedVouchers = collectedVoucherRepository.findAllByUserIdAndVoucherIdIn(userId, vouchers);

        for (CollectedVoucher voucher : collectedVouchers) {
            int quantity = voucher.getQuantity();
            if (quantity <= 0) {
                throw new Exception("The voucher quantity is inadequate for use.");
            }
            voucher.setQuantity(quantity - 1);
        }

        collectedVoucherRepository.saveAll(collectedVouchers);
    }

    @Override
    public void compensateVoucher(String userId, Set<String> vouchers) throws Exception {
        List<CollectedVoucher> collectedVouchers = collectedVoucherRepository.findAllByUserIdAndVoucherIdIn(userId, vouchers);

        for (CollectedVoucher voucher : collectedVouchers) {
            int quantity = voucher.getQuantity();
            if (quantity <= 0) {
                throw new Exception("The voucher quantity is inadequate for use.");
            }
            voucher.setQuantity(quantity + 1);
        }

        collectedVoucherRepository.saveAll(collectedVouchers);
    }

    private CollectedVoucherResponse processVoucherCollection(AuthenticatedAccount account, String voucherId) {
        BaseVoucher voucher = baseVoucherRepository.findById(voucherId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));
        return switch (voucher.getVoucherType()) {
            case REGULAR_VOUCHER -> collectRegularVoucher((RegularVoucher) voucher, account);
            case STORE_FOLLOWER_VOUCHER -> collectStoreFollowerVoucher((StoreFollowerVoucher) voucher, account);
            default -> throw new UnsupportedOperationException("Unsupported voucher type: " + voucher.getVoucherType());
        };
    }

    private CollectedVoucherResponse collectRegularVoucher(RegularVoucher voucher, AuthenticatedAccount account) {
        validateVoucherEligibility(voucher, account);

        boolean isActiveNow = voucher.getPeriodStartTime().isBefore(LocalDateTime.now());
        CollectedVoucher collectedVoucher = collectedVoucherRepository
                .findByUserIdAndVoucherId(account.getUserId(), voucher.getId())
                .orElse(CollectedVoucher.builder()
                        .userId(account.getUserId())
                        .voucherId(voucher.getId())
                        .status(isActiveNow ? CollectedVoucherStatus.ACTIVE : CollectedVoucherStatus.NOT_STARTED)
                        .collectedAt(LocalDateTime.now())
                        .build());

        collectedVoucher.setQuantity(collectedVoucher.getQuantity() + 1);

        collectedVoucherRepository.save(collectedVoucher);
        updateVoucherAvailability(voucher);
        return userVoucherMapper.toCollectedVoucherResponse(collectedVoucher, voucher);
    }

    private CollectedVoucherResponse collectStoreFollowerVoucher(StoreFollowerVoucher voucher, AuthenticatedAccount account) {
        validateVoucherAvailability(voucher);
        if (!canCollecteVoucher(voucher, account.getUserId())) {
            throw new ForbiddenException("You do not meet the conditions to collect this voucher.");
        }
        boolean isFollowed = storeService.isFollowedStore(account.getUserId(), voucher.getStoreId());

        if (!isFollowed) {
            throw new ForbiddenException(": You cannot collect this voucher as you have not yet followed our store. Please follow our store to unlock this offer.");
        }

        CollectedVoucher collectedVoucher = collectedVoucherRepository
                .findByUserIdAndVoucherId(account.getUserId(), voucher.getId())
                .orElse(CollectedVoucher.builder()
                        .userId(account.getUserId())
                        .voucherId(voucher.getId())
                        .status(CollectedVoucherStatus.ACTIVE)
                        .collectedAt(LocalDateTime.now())
                        .build());

        collectedVoucher.setQuantity(collectedVoucher.getQuantity() + 1);
        updateVoucherAvailability(voucher);
        return userVoucherMapper.toCollectedVoucherResponse(collectedVoucher, voucher);
    }

    private void validateVoucherEligibility(BaseVoucher voucher, AuthenticatedAccount account) {
        validateVoucherAvailability(voucher);
        if (!canCollecteVoucher(voucher, account.getUserId())) {
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

    private boolean canCollecteVoucher(BaseVoucher voucher, String userId) {
        boolean alreadyCollected = collectedVoucherRepository.existsByUserIdAndVoucherId(userId, voucher.getId());
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


}
