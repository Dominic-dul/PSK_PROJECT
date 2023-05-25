package com.psk.eshop.model;

import com.psk.eshop.enums.RefundStatus;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "customer_id", referencedColumnName = "id")
//    private User user;
    private String userEmail;
    private RefundStatus refundStatus;
    private Timestamp createdDate;
    private String description;
    @Version
    private Long version;
}
