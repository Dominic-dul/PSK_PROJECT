package com.psk.eshop.dto;

import com.psk.eshop.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDTO {
    private List<Long> productIds;
    private String userEmail;
    private OrderStatus orderStatus;
    private String shippingAddress;
}
