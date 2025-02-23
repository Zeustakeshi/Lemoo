/*
 *  RegularVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 2/20/2025 2:09 PM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.BaseVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.StoreFollowerVoucherResponse;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import com.lemoo.promotion.exception.BadRequestException;
import com.lemoo.promotion.mapper.VoucherMapper;
import com.lemoo.promotion.repository.BaseVoucherRepository;
import com.lemoo.promotion.service.StoreFollowerVoucherService;
import com.lemoo.promotion.service.StoreService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StoreFollowerVoucherServiceImpl extends BaseVoucherService implements StoreFollowerVoucherService {

    private final VoucherMapper voucherMapper;

    public StoreFollowerVoucherServiceImpl(
            BaseVoucherRepository voucherRepository,
            StoreService storeService,
            VoucherMapper voucherMapper
    ) {
        super(voucherRepository, storeService);
        this.voucherMapper = voucherMapper;
    }

    @Override
    public String createVoucher(StoreFollowerVoucherRequest request, String storeId, AuthenticatedAccount account) {
        return super.createVoucher(storeId, account, request);
    }

    @Override
    public StoreFollowerVoucherResponse findVoucherById(String voucherId, String storeId, AuthenticatedAccount account) {
        StoreFollowerVoucher voucher = (StoreFollowerVoucher) super.findVoucherById(voucherId, storeId, account, VoucherType.STORE_FOLLOWER_VOUCHER);
        return voucherMapper.toStoreFollowerVoucherResponse(voucher);
    }

    @Override
    protected boolean canActivateVoucher(BaseVoucher voucher) {
        boolean baseValidation = super.canActivateVoucher(voucher);
        return baseValidation && voucher.getVoucherType().equals(VoucherType.STORE_FOLLOWER_VOUCHER);
    }

    @Override
    protected boolean canDeactivateVoucher(BaseVoucher voucher) {
        boolean baseValidation = super.canDeactivateVoucher(voucher);
        return baseValidation && voucher.getVoucherType().equals(VoucherType.STORE_FOLLOWER_VOUCHER);
    }

    @Override
    protected void setVoucherType(BaseVoucher voucher) {
        voucher.setVoucherType(VoucherType.STORE_FOLLOWER_VOUCHER);
    }

    @Override
    protected BaseVoucher mapToVoucher(BaseVoucherRequest request) {
        return voucherMapper.toStoreFollowerVoucher((StoreFollowerVoucherRequest) request);
    }

    @Override
    protected void customValidation(BaseVoucherRequest request) {
        super.customValidation(request);
        StoreFollowerVoucherRequest storeFollowerVoucherRequest = (StoreFollowerVoucherRequest) request;
        if (storeFollowerVoucherRequest.getVoucherExpireIn().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Expiration time cannot be earlier than or equal to the current time. Please enter a valid expiration time.");
        }
    }

    @Override
    protected <T extends BaseVoucher> T customVoucherBuilder(T voucher) {
        StoreFollowerVoucher storeFollowerVoucher = (StoreFollowerVoucher) voucher;
        storeFollowerVoucher.setScope(VoucherScope.ENTIRE_STORE);
        return voucher;
    }
}
