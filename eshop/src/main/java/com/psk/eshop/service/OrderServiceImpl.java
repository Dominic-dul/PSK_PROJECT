package com.psk.eshop.service;

import com.psk.eshop.dto.OrderFilterDTO;
import com.psk.eshop.dto.OrderRequestDTO;
import com.psk.eshop.model.Order;
import com.psk.eshop.model.Product;
import com.psk.eshop.repository.OrderRepository;
import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private OrderRepository orderRepository;
    private ProductService productService;
    @Override
    public Order createOrder(OrderRequestDTO orderRequest) {
        List<Product> products = orderRequest.getProductIds().stream()
                .map(id -> productService.getProductById(id))
                .collect(Collectors.toList());
        var newOrder = Order.builder()
                .products(products)
                .userEmail(orderRequest.getUserEmail())
                .orderStatus(orderRequest.getOrderStatus())
                .price(products.stream().map(Product::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add))
                .shippingAddress(orderRequest.getShippingAddress())
                .build();
        return orderRepository.save(newOrder);
    }

    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Order with id %d not found", orderId))
        );
    }
    @Override
    public Order updateOrder(Long orderId, OrderRequestDTO orderRequest) {
        List<Product> products = orderRequest.getProductIds().stream()
                .map(id -> productService.getProductById(id))
                .collect(Collectors.toList());
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setProducts(products);
                    order.setUserEmail(orderRequest.getUserEmail());
                    order.setOrderStatus(orderRequest.getOrderStatus());
                    order.setPrice(products.stream().map(Product::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add));
                    order.setShippingAddress(orderRequest.getShippingAddress());
                    try {
                        return orderRepository.save(order);
                    } catch (OptimisticLockException ex) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, "Entity was updated by another user. Try again");
                    }
                })
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Order with id %d not found", orderId))
                );
    }
    @Transactional
    @Override
    public void deleteOrderById(Long orderId)
    {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> filterOrders(OrderFilterDTO orderFilter) {
        return orderRepository.filterOrders(orderFilter.getUserEmail(), orderFilter.getOrderStatus());
    }
}
