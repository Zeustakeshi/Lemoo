/*
 *  RegularVoucherRequest
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:39 PM
 * */

package com.lemoo.promotion.dto.request;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreFollowerVoucherRequest extends BaseVoucherRequest {

	private LocalDateTime storeTimeLimit;
}
