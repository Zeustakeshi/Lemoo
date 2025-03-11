/*
 *  OrderServiceImpl
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:50 PM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.OrderItemRequest;
import com.lemoo.order_v2.dto.request.OrderRequest;
import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import com.lemoo.order_v2.exception.NotfoundException;
import com.lemoo.order_v2.mapper.OrderMapper;
import com.lemoo.order_v2.mapper.ShippingAddressMapper;
import com.lemoo.order_v2.repository.OrderRepository;
import com.lemoo.order_v2.service.OrderService;
import com.lemoo.order_v2.service.ShippingAddressService;
import com.lemoo.order_v2.service.SkuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final ShippingAddressService shippingAddressService;
    private final OrderRepository orderRepository;
    private final ShippingAddressMapper shippingAddressMapper;
    private final OrderMapper orderMapper;
    private final SkuService skuService;


    @Override
    public OrderResponse placeOrder(OrderRequest request, AuthenticatedAccount account) {
        // check shipping address and set shipping address to order
        ShippingAddressResponse shippingAddress = shippingAddressService
                .getShippingAddressByIdAndUserId(
                        request.getShippingAddressId(),
                        account.getUserId()
                );

        // inventory quick check (skus)
        Set<String> skus = request.getItems()
                .stream()
                .map(OrderItemRequest::getLemooSku)
                .collect(Collectors.toSet()
                );

        Map<String, Boolean> validateResults = skuService.validateSkus(skus);

        skus.forEach(sku -> {
            if (!validateResults.containsKey(sku) ||
                    (validateResults.containsKey(sku) && !validateResults.get(sku))
            ) {
                throw new NotfoundException("The sku is either unavailable or does not exist.");
            }
        });

        // promotion quick check (promotions)

        // save order with pending status
        Order order = orderRepository.save(Order.builder()
                .shippingAddress(shippingAddressMapper.toShippingAddress(shippingAddress))
                .userId(account.getUserId())
                .promotions(request.getPromotions())
                .status(OrderStatus.PENDING)
                .paymentMethod(request.getPaymentMethod())
                .items(getOrderItemFromOrderRequest(request))
                .build());

        return orderMapper.toOrderResponse(order);
    }

    private Set<OrderItem> getOrderItemFromOrderRequest(OrderRequest request) {
        return request.getItems().stream().map(itemRequest -> CompletableFuture.supplyAsync(() -> {
            SkuResponse skuResponse = skuService.getSkuBySkuCode(itemRequest.getLemooSku())
                    .orElseThrow(() -> new NotfoundException("The sku is either unavailable or does not exist."));
            return OrderItem.builder()
                    .image(skuResponse.getImage())
                    .price(skuResponse.getPrice())
                    .quantity(itemRequest.getQuantity())
                    .storeId(skuResponse.getStoreId())
                    .skuCode(skuResponse.getSkuCode())
                    .build();
        })).map(CompletableFuture::join).collect(Collectors.toSet());
    }
}
