/*
 *  VoucherMapper
 *  @author: Minhhieuano
 *  @created 12/27/2024 8:53 PM
 * */

package com.lemoo.promotion.mapper;

import com.lemoo.promotion.dto.response.VoucherDetailResponse;
import com.lemoo.promotion.entity.SellerVoucher;
import org.mapstruct.Mapper;

@Mapper
public interface VoucherMapper {
    VoucherDetailResponse toVoucherResponse(SellerVoucher sellerVoucher);

    RegularVoucher regularVoucherRequestToRegularVoucher(RegularVoucherRequest request);

}
