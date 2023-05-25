package com.psk.eshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany(mappedBy = "products", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JsonIgnore
    private Set<Order> orders = new HashSet<>();
//    @Column(name = "user_id")
//    private Long userId;

    private String userEmail;
    private Long discountId;
    private BigDecimal price;
    private String name;
    private String description;
    private String picturePath;
    private Long quantity;
    private Timestamp dateReceived;
}
