package com.psk.eshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.psk.eshop.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
    @OneToOne
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
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(
                    name = "order_id", referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "product_id", referencedColumnName = "id"
            )
    )
    private List<Product> products = new ArrayList<>();
}
