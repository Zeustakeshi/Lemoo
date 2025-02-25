/*
 *  UserVoucherMapper
 *  @author: Minhhieuano
 *  @created 1/19/2025 6:23 PM
 * */

package com.lemoo.promotion.mapper;

import com.lemoo.promotion.dto.response.CollectedVoucherResponse;
import com.lemoo.promotion.dto.response.UserVoucherResponse;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.entity.CollectedVoucher;
import org.mapstruct.Mapper;

@Mapper
public interface UserVoucherMapper {

    default CollectedVoucherResponse toCollectedVoucherResponse(CollectedVoucher collectedVoucher, BaseVoucher baseVoucher) {
        return CollectedVoucherResponse.builder()
                .collectedAt(collectedVoucher.getCollectedAt())
                .status(collectedVoucher.getStatus())
                .voucher(toUserVoucherResponse(baseVoucher))
                .collectedAt(collectedVoucher.getCollectedAt())
                .build();
    }


    UserVoucherResponse toUserVoucherResponse(BaseVoucher voucher);
}
