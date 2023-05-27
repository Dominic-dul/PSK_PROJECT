package com.psk.eshop.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {
    private String userEmail;
    private Long discountId;
    private BigDecimal price;
    private String name;
    private String description;
    private Long quantity;
}
