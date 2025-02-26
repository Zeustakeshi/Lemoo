/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.client.ProductClient;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
	private final ProductClient productClient;

	@Override
	public SkuResponse getSkuBySkuCode(String skuCode) {
		// TODO: implement cache here
		return productClient.getSkuBySkuCode(skuCode).getData();
	}
}
