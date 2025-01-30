/*
 *  SellerVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:48 PM
 * */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.common.enums.VoucherStatus;
import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.FirstPurchaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.FirstPurchaseVoucherResponse;
import com.lemoo.promotion.dto.response.RegularVoucherResponse;
import com.lemoo.promotion.dto.response.StoreFollowerVoucherResponse;
import com.lemoo.promotion.entity.FirstPurchaseVoucher;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.entity.SellerVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.mapper.VoucherMapper;
import com.lemoo.promotion.repository.SellerVoucherRepository;
import com.lemoo.promotion.service.SellerVoucherService;
import com.lemoo.promotion.service.SellerVoucherValidationService;
import com.lemoo.promotion.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerVoucherServiceImpl implements SellerVoucherService {

    private final SellerVoucherRepository sellerVoucherRepository;
    private final VoucherMapper voucherMapper;
    private final StoreService storeService;
    private final SellerVoucherValidationService voucherValidationService;


    @Override
    public RegularVoucherResponse getRegularVoucherById(String storeId, AuthenticatedAccount account, String voucherId) {
        SellerVoucher voucher = sellerVoucherRepository.findByIdAndStoreIdAndVoucherType(voucherId, storeId, VoucherType.REGULAR_VOUCHER)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));
        return voucherMapper.toRegularVoucherResponse((RegularVoucher) voucher);
    }

    @Override
    public StoreFollowerVoucherResponse getStoreFollowerVoucherById(String storeId, AuthenticatedAccount account, String voucherId) {
        SellerVoucher voucher = sellerVoucherRepository.findByIdAndStoreIdAndVoucherType(voucherId, storeId, VoucherType.STORE_FOLLOWER_VOUCHER)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));
        return voucherMapper.toStoreFollowerVoucherResponse((StoreFollowerVoucher) voucher);
    }

    @Override
    public FirstPurchaseVoucherResponse getFirstPurchaseVoucherById(String storeId, AuthenticatedAccount account, String voucherId) {
        SellerVoucher voucher = sellerVoucherRepository.findByIdAndStoreIdAndVoucherType(voucherId, storeId, VoucherType.FIRST_PURCHASE)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));
        return voucherMapper.toFirstPurchaseVoucherResponse((FirstPurchaseVoucher) voucher);
    }

    @Override
    public String createRegularVoucher(String storeId, AuthenticatedAccount account, RegularVoucherRequest request) {
        storeService.verifyStore(account.getId(), storeId);

        voucherValidationService.validateRegularVoucher(request);

        var voucher = voucherMapper.toRegularVoucher(request);
        voucher.setStoreId(storeId);
        voucher.setVoucherType(VoucherType.REGULAR_VOUCHER);

        var newVoucher = sellerVoucherRepository.save(voucher);
        return newVoucher.getId();
    }

    @Override
    public String createStoreFollowerVoucher(String storeId, AuthenticatedAccount account, StoreFollowerVoucherRequest request) {
        storeService.verifyStore(account.getId(), storeId);

        voucherValidationService.validateStoreFollowerVoucher(request);

        var voucher = voucherMapper.toStoreFollowerVoucher(request);
        voucher.setStoreId(storeId);
        voucher.setVoucherType(VoucherType.STORE_FOLLOWER_VOUCHER);
        voucher.setScope(VoucherScope.ENTIRE_STORE);

        var newVoucher = sellerVoucherRepository.save(voucher);
        return newVoucher.getId();
    }

    @Override
    public void activateVoucher(String storeId, AuthenticatedAccount account, String voucherId) {
        storeService.verifyStore(account.getId(), storeId);
        SellerVoucher voucher = sellerVoucherRepository.findByIdAndStoreId(voucherId, storeId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

        if (voucher.getStatus().equals(VoucherStatus.ACTIVE)) return;

        voucher.setStatus(VoucherStatus.ACTIVE);
        sellerVoucherRepository.save(voucher);
    }

    @Override
    public void deactivateVoucher(String storeId, AuthenticatedAccount account, String voucherId) {
        storeService.verifyStore(account.getId(), storeId);
        SellerVoucher voucher = sellerVoucherRepository.findByIdAndStoreId(voucherId, storeId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

        if (voucher.getStatus().equals(VoucherStatus.NOT_ACTIVE)) return;

        voucher.setStatus(VoucherStatus.NOT_ACTIVE);

        sellerVoucherRepository.save(voucher);
    }

    @Override
    public String createFirstPurchaseVoucher(String storeId, AuthenticatedAccount account, FirstPurchaseVoucherRequest request) {
        storeService.verifyStore(account.getId(), storeId);

        voucherValidationService.validateFirstPurchaseVoucher(request);

        var voucher = voucherMapper.toFirstPurchaseVoucher(request);
        voucher.setStoreId(storeId);
        voucher.setLimit(1L);
        voucher.setVoucherType(VoucherType.FIRST_PURCHASE);

        var newVoucher = sellerVoucherRepository.save(voucher);
        return newVoucher.getId();
    }

}
