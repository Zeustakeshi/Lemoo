/*
 *  VoucherMapper
 *  @author: Minhhieuano
 *  @created 12/27/2024 8:53 PM
 * */

package com.lemoo.promotion.mapper;

import com.lemoo.promotion.dto.request.FirstPurchaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.VoucherDetailResponse;
import com.lemoo.promotion.entity.FirstPurchaseVoucher;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.entity.SellerVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import org.mapstruct.Mapper;

@Mapper
public interface VoucherMapper {
    VoucherDetailResponse toVoucherResponse(SellerVoucher sellerVoucher);

    RegularVoucher toRegularVoucher(RegularVoucherRequest request);

    StoreFollowerVoucher toStoreFollowerVoucher(StoreFollowerVoucherRequest request);

    FirstPurchaseVoucher toFirstPurchaseVoucher(FirstPurchaseVoucherRequest request);


}
