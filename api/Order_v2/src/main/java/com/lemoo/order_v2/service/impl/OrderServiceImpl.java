/*
 *  OrderServiceImpl
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:50 PM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.common.enums.PaymentMethod;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.OrderRequest;
import com.lemoo.order_v2.dto.request.OrderSkuRequest;
import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import com.lemoo.order_v2.entity.ShippingAddress;
import com.lemoo.order_v2.event.model.ApplyVoucherEvent;
import com.lemoo.order_v2.event.producer.PromotionProducer;
import com.lemoo.order_v2.exception.BadRequestException;
import com.lemoo.order_v2.exception.NotfoundException;
import com.lemoo.order_v2.mapper.OrderMapper;
import com.lemoo.order_v2.mapper.PageMapper;
import com.lemoo.order_v2.mapper.ShippingAddressMapper;
import com.lemoo.order_v2.repository.OrderRepository;
import com.lemoo.order_v2.service.OrderService;
import com.lemoo.order_v2.service.PromotionService;
import com.lemoo.order_v2.service.ShippingAddressService;
import com.lemoo.order_v2.service.SkuService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final PromotionProducer promotionProducer;
    private final OrderMapper orderMapper;
    private final PageMapper pageMapper;

    @Override
    public PageableResponse<OrderResponse> getAllOrders(AuthenticatedAccount account, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Order> orders = orderRepository.findAllByUserId(account.getUserId(), pageRequest);
        Page<OrderResponse> orderItemResponses = orders.map(orderMapper::toOrderResponse);
        return pageMapper.toPageableResponse(orderItemResponses);
    }

    @Override
    @Transactional
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

            OrderStatus status = request.getPaymentMethod().equals(PaymentMethod.COD) ?
                    OrderStatus.PENDING : OrderStatus.UN_PAID;

            Order order = Order.builder()
                    .storeId(storeId)
                    .userId(account.getUserId())
                    .shippingAddress(shippingAddress)
                    .paymentMethod(request.getPaymentMethod())
                    .status(status)
                    .items(createOrderItem(skuRequests))
                    .vouchers(orderItemRequest.getVouchers())
                    .build();

            orders.add(order);
        }

        if (request.getPaymentMethod().equals(PaymentMethod.COD)) {
            processOrderDiscount(account.getUserId(), orderRepository.saveAll(orders));
        }

    }

    @Override
    public void updateOrderStatus(String userId, String orderId, OrderStatus status) {
        Order order = findByIdAndUserId(orderId, userId);
        order.setStatus(status);
        orderRepository.save(order);
    }

    @Override
    public Order findByIdAndUserId(String orderId, String userId) {
        return orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new NotfoundException("Order not found"));
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

    @Async
    protected void processOrderDiscount(String userId, List<Order> orders) {
        for (var order : orders) {
            promotionProducer.applyVoucher(ApplyVoucherEvent.builder()
                    .orderId(order.getId())
                    .userId(userId)
                    .vouchers(order.getVouchers())
                    .build());
        }
    }
}
