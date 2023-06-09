package com.psk.eshop.service;

import com.psk.eshop.dto.RefundRequestDTO;
import com.psk.eshop.model.Refund;

import java.util.List;

public interface RefundService {
    Refund createRefund(RefundRequestDTO refundRequest);
    List<Refund> getRefunds();
    Refund updateRefund(Long refundId, RefundRequestDTO refundRequest);
    Refund getRefundById(Long refundId);
    void deleteRefundById(Long refundId);
}
