package com.psk.eshop.dto;

import com.psk.eshop.enums.RefundStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RefundRequestDTO {
    private Long orderId;
    private String userEmail;
    private RefundStatus refundStatus;
    private Timestamp createdDate;
    private String description;
}
