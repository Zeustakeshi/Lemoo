/*
 *  InternalProductServiceImpl
 *  @author: Minhhieuano
 *  @created 3/5/2025 4:31 PM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.dto.response.InternalProductSkuResponse;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.ProductSkuMapper;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.InternalProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InternalProductServiceImpl implements InternalProductService {
    private final ProductSkuMapper productSkuMapper;
    private final ProductSkuRepository productSkuRepository;

    @Override
    public InternalProductSkuResponse getSkuBySkuCode(String skuCode) {
        ProductSku sku = productSkuRepository.findBySkuCode(skuCode)
                .orElseThrow(() -> new NotfoundException("Sku " + skuCode + " not found"));
        return productSkuMapper.toInternalProductSkuResponse(sku);
    }

    @Override
    public Set<InternalProductSkuResponse> getAllSkuBySkuCodes(Set<String> skuCode) {
        return productSkuRepository
                .findBySkuCodeIn(skuCode)
                .stream()
                .filter(sku -> sku.getReserveStock() > 0)
                .map(productSkuMapper::toInternalProductSkuResponse)
                .collect(Collectors.toSet());
    }
}
