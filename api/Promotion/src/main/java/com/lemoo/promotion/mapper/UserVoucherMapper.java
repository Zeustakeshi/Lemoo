/*
 *  UserVoucherMapper
 *  @author: Minhhieuano
 *  @created 1/19/2025 6:23 PM
 * */

package com.lemoo.promotion.mapper;

import com.lemoo.promotion.dto.response.UserVoucherResponse;
import com.lemoo.promotion.entity.CollectedVoucher;
import org.mapstruct.Mapper;

@Mapper
public interface UserVoucherMapper {
    UserVoucherResponse toUserVoucherResponse(CollectedVoucher collectedVoucher);
}
