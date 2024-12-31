/*
 *  VoucherMapper
 *  @author: Minhhieuano
 *  @created 12/27/2024 8:53 PM
 * */

package com.lemoo.promotion.mapper;

import com.lemoo.promotion.dto.request.FirstPurchaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.FirstPurchaseVoucherResponse;
import com.lemoo.promotion.dto.response.RegularVoucherResponse;
import com.lemoo.promotion.dto.response.StoreFollowerVoucherResponse;
import com.lemoo.promotion.entity.FirstPurchaseVoucher;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import org.mapstruct.Mapper;

@Mapper
public interface VoucherMapper {

    RegularVoucher toRegularVoucher(RegularVoucherRequest request);

    StoreFollowerVoucher toStoreFollowerVoucher(StoreFollowerVoucherRequest request);

    FirstPurchaseVoucher toFirstPurchaseVoucher(FirstPurchaseVoucherRequest request);

    RegularVoucherResponse toRegularVoucherResponse(RegularVoucher regularVoucher);

    StoreFollowerVoucherResponse toStoreFollowerVoucherResponse(StoreFollowerVoucher storeFollowerVoucher);

    FirstPurchaseVoucherResponse toFirstPurchaseVoucherResponse(FirstPurchaseVoucher firstPurchaseVoucher);

}
