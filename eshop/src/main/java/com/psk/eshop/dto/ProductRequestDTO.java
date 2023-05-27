package com.psk.eshop.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Builder
public class ProductRequestDTO {
    private String userEmail;
    private Long discountId;
    private BigDecimal price;
    private String name;
    private String description;
    private Long quantity;

    @JsonCreator
    public ProductRequestDTO(@JsonProperty("userEmail") String userEmail, @JsonProperty("discountId") Long discountId,
                             @JsonProperty("price") BigDecimal price, @JsonProperty("name") String name,
                             @JsonProperty("description") String description, @JsonProperty("quantity") Long quantity) {
            this.userEmail = userEmail;
            this.discountId = discountId;
            this.price = price;
            this.name = name;
            this.description = description;
            this.quantity = quantity;
        }
}
