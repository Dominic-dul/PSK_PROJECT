package com.psk.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StatisticRequestDTO {
    private Long orderId;
    private Timestamp createdDate;
    private String description;
}
