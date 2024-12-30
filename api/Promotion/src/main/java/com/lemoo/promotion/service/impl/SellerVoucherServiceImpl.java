/*
 *  SellerVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:48 PM
 * */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.client.StoreClient;
import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.request.VerifyStoreRequest;
import com.lemoo.promotion.entity.RegularVoucher;
import com.lemoo.promotion.entity.StoreFollowerVoucher;
import com.lemoo.promotion.exception.ConflictException;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.mapper.VoucherMapper;
import com.lemoo.promotion.repository.VoucherRepository;
import com.lemoo.promotion.service.SellerVoucherService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerVoucherServiceImpl implements SellerVoucherService {

	private final VoucherRepository voucherRepository;
	private final VoucherMapper voucherMapper;
	private final StoreClient storeClient;

	@Override
	@CircuitBreaker(name = "store-service", fallbackMethod = "createRegularVoucherFallback")
	public String createRegularVoucher(String storeId, AuthenticatedAccount account, RegularVoucherRequest request) {

		verifyStore(account.getId(), storeId);

		if (voucherRepository.existsByNameAndStoreId(request.getName(), storeId)) {
			throw new ConflictException("Voucher name already existed in this store");
		}

		RegularVoucher voucher = voucherMapper.regularVoucherRequestToRegularVoucher(request);
		voucher.setStoreId(storeId);

		if (request.getCollectionStartTime() == null) {
			voucher.setCollectionStartTime(request.getPeriodStartTime());
		}

		return voucherRepository.save(voucher).getId();
	}

	@Override
	public String createStoreFollowerVoucher(
			String storeId, AuthenticatedAccount account, StoreFollowerVoucherRequest request) {
		verifyStore(account.getId(), storeId);

		if (voucherRepository.existsByNameAndStoreId(request.getName(), storeId)) {
			throw new ConflictException("Voucher name already existed in this store");
		}

		StoreFollowerVoucher voucher = voucherMapper.storeFollowerVoucherRequestToStoreFollowerVoucher(request);
		voucher.setStoreId(storeId);
		voucher.setScope(VoucherScope.ENTIRE_STORE);

		if (request.getCollectionStartTime() == null) {
			voucher.setCollectionStartTime(request.getPeriodStartTime());
		}

		if (request.getStoreTimeLimit() == null) {
			voucher.setStoreTimeLimit(
					request.getPeriodStartTime().plusDays(7)); // default expire 7 day if customer not use this voucher
		}

		return voucherRepository.save(voucher).getId();
	}

	@CircuitBreaker(name = "store-service", fallbackMethod = "createStoreFollowerVoucherFallback")
	private void verifyStore(String accountId, String storeId) {
		if (storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId)).getData()) return;
		throw new ForbiddenException("Can't access this store");
	}

	private String createRegularVoucherFallback(
			String storeId, AuthenticatedAccount account, RegularVoucherRequest request, Throwable throwable) {
		return "Store service is unavailable. Please try again later!";
	}

	public String createStoreFollowerVoucherFallback(String accountId, String storeId, Throwable throwable) {
		return "Store service is unavailable. Please try again later!";
	}
}
