package com.psk.eshop.model;

import com.psk.eshop.enums.PaymentType;
import com.psk.eshop.enums.TransactionState;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;
    private PaymentType paymentType;
    private BigDecimal amount;
    private Timestamp transactionDate;
    private TransactionState transactionState;
    private String billingAddress;
    @Version
    private Long version;
}
