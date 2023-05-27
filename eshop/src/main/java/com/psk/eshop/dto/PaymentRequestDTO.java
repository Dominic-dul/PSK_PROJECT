package com.psk.eshop.dto;

import com.psk.eshop.enums.PaymentType;
import com.psk.eshop.enums.TransactionState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDTO {
    private Long orderId;
    private PaymentType paymentType;
    private BigDecimal amount;
    private Timestamp transactionDate;
    private TransactionState transactionState;
    private String billingAddress;
}
