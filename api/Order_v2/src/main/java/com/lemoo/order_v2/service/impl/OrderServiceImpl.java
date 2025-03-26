/*
 *  OrderServiceImpl
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:50 PM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.OrderRequest;
import com.lemoo.order_v2.dto.request.OrderSkuRequest;
import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import com.lemoo.order_v2.entity.ShippingAddress;
import com.lemoo.order_v2.exception.BadRequestException;
import com.lemoo.order_v2.exception.NotfoundException;
import com.lemoo.order_v2.mapper.ShippingAddressMapper;
import com.lemoo.order_v2.repository.OrderRepository;
import com.lemoo.order_v2.service.OrderService;
import com.lemoo.order_v2.service.PromotionService;
import com.lemoo.order_v2.service.ShippingAddressService;
import com.lemoo.order_v2.service.SkuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final ShippingAddressService shippingAddressService;
    private final OrderRepository orderRepository;
    private final ShippingAddressMapper shippingAddressMapper;
    private final SkuService skuService;
    private final PromotionService promotionService;


    @Override
    public void placeOrder(OrderRequest request, AuthenticatedAccount account) {
        ShippingAddressResponse shippingAddressResponse = shippingAddressService
                .getShippingAddressByIdAndUserId(request.getShippingAddressId(), account.getUserId());

        ShippingAddress shippingAddress = shippingAddressMapper.toShippingAddress(shippingAddressResponse);

        List<Order> orders = new ArrayList<>();

        for (var orderItemRequest : request.getItems()) {
            String storeId = orderItemRequest.getStoreId();
            Set<OrderSkuRequest> skuRequests = orderItemRequest.getSkus();
            Set<String> vouchers = orderItemRequest.getVouchers();
            Set<String> skuCodes = skuRequests.stream().map(OrderSkuRequest::getLemooSku).collect(Collectors.toSet());

            promotionService.validateVoucher(account.getUserId(), vouchers, skuCodes);

            Order order = Order.builder()
                    .storeId(storeId)
                    .userId(account.getUserId())
                    .shippingAddress(shippingAddress)
                    .paymentMethod(request.getPaymentMethod())
                    .status(OrderStatus.PENDING)
                    .items(createOrderItem(skuRequests))
                    .vouchers(orderItemRequest.getVouchers())
                    .build();

            orders.add(order);
        }

        orderRepository.saveAll(orders);

    }

    private Set<OrderItem> createOrderItem(Set<OrderSkuRequest> skuRequests) {

        Set<OrderItem> orderItems = new HashSet<>();

        for (var skuRequest : skuRequests) {
            SkuResponse sku = skuService.getSkuBySkuCode(skuRequest.getLemooSku())
                    .orElseThrow(() -> new NotfoundException("Sku not found"));

            if (sku.getStock() <= 0) {
                throw new BadRequestException("Sku " + sku.getSkuCode() + " is out of stock");
            }

            OrderItem orderItem = OrderItem.builder()
                    .image(sku.getImage())
                    .skuName(sku.getName())
                    .quantity(skuRequest.getQuantity())
                    .price(sku.getPrice())
                    .skuCode(sku.getSkuCode())
                    .build();

            orderItems.add(orderItem);
        }

        return orderItems;
    }
}
