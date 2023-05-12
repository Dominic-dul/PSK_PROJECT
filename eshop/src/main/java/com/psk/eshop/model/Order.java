package com.psk.eshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.psk.eshop.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    private OrderStatus orderStatus;
    private BigDecimal price;
    private String shippingAddress;
    @JsonIgnore
    @OneToOne(mappedBy = "order")
    private Invoice invoice;
    @JsonIgnore
    @OneToOne(mappedBy = "order")
    private Refund refund;
    @JsonIgnore
    @OneToOne(mappedBy = "order")
    private Payment payment;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(
                    name = "order_id", referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "product_id", referencedColumnName = "id"
            )
    )
    private Set<Product> products = new HashSet<>();
}
