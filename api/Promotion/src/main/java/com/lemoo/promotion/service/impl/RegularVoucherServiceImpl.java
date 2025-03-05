/*
 *  RegularVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 2/20/2025 2:09 PM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.BaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.response.PageableResponse;
import com.lemoo.promotion.dto.response.RegularVoucherResponse;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.mapper.PageMapper;
import com.lemoo.promotion.mapper.VoucherMapper;
import com.lemoo.promotion.repository.BaseVoucherRepository;
import com.lemoo.promotion.service.RegularVoucherService;
import com.lemoo.promotion.service.SkuService;
import com.lemoo.promotion.service.StoreService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class RegularVoucherServiceImpl extends BaseVoucherService implements RegularVoucherService {

    private final VoucherMapper voucherMapper;
    private final BaseVoucherRepository baseVoucherRepository;
    private final StoreService storeService;
    private final PageMapper pageMapper;
    private final SkuService skuService;

    public RegularVoucherServiceImpl(
            BaseVoucherRepository voucherRepository,
            StoreService storeService,
            VoucherMapper voucherMapper,
            BaseVoucherRepository baseVoucherRepository,
            PageMapper pageMapper,
            SkuService skuService
    ) {
        super(voucherRepository, storeService, skuService);
        this.voucherMapper = voucherMapper;
        this.baseVoucherRepository = baseVoucherRepository;
        this.storeService = storeService;
        this.pageMapper = pageMapper;
        this.skuService = skuService;
    }

    @Override
    public String createVoucher(RegularVoucherRequest request, String storeId, AuthenticatedAccount account) {
        return super.createVoucher(storeId, account, request);
    }

    @Override
    public PageableResponse<RegularVoucherResponse> findAllByStoreId(String storeId, int page, int limit, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);

        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

        Page<BaseVoucher> baseVouchers = baseVoucherRepository
                .findAllByStoreIdAndVoucherType(storeId, VoucherType.REGULAR_VOUCHER, pageRequest);

        Page<RegularVoucherResponse> regularVouchers = baseVouchers
                .map(baseVoucher -> voucherMapper.toRegularVoucherResponse((RegularVoucher) baseVoucher));

        return pageMapper.toPageableResponse(regularVouchers);
    }

    @Override
    public RegularVoucherResponse findVoucherById(String voucherId, String storeId, AuthenticatedAccount account) {
        RegularVoucher voucher = (RegularVoucher) super.findVoucherById(voucherId, storeId, account, VoucherType.REGULAR_VOUCHER);
        return voucherMapper.toRegularVoucherResponse(voucher);
    }

    @Override
    protected boolean canActivateVoucher(BaseVoucher voucher) {
        boolean baseValidation = super.canActivateVoucher(voucher);
        return baseValidation && voucher.getVoucherType().equals(VoucherType.REGULAR_VOUCHER);
    }

    @Override
    protected boolean canDeactivateVoucher(BaseVoucher voucher) {
        boolean baseValidation = super.canDeactivateVoucher(voucher);
        return baseValidation && voucher.getVoucherType().equals(VoucherType.REGULAR_VOUCHER);
    }

    @Override
    protected void setVoucherType(BaseVoucher voucher) {
        voucher.setVoucherType(VoucherType.REGULAR_VOUCHER);
    }

    @Override
    protected BaseVoucher mapToVoucher(BaseVoucherRequest request) {
        return voucherMapper.toRegularVoucher((RegularVoucherRequest) request);
    }
}
