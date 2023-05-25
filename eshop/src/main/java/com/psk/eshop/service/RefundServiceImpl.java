package com.psk.eshop.service;

import com.psk.eshop.dto.RefundRequestDTO;
import com.psk.eshop.model.Refund;
import com.psk.eshop.repository.RefundRepository;
import jakarta.persistence.OptimisticLockException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class RefundServiceImpl implements RefundService{
    private final RefundRepository refundRepository;
    private final OrderService orderService;
    @Override
    public Refund createRefund(RefundRequestDTO refundRequest) {
        var newRefund = Refund.builder()
                .order(orderService.getOrderById(refundRequest.getOrderId()))
                .refundStatus(refundRequest.getRefundStatus())
                .createdDate(refundRequest.getCreatedDate())
                .userEmail(refundRequest.getUserEmail())
                .description(refundRequest.getDescription())
                .build();
        return refundRepository.save(newRefund);
    }

    @Override
    public List<Refund> getRefunds() {
        return refundRepository.findAll();
    }

    @Override
    public Refund updateRefund(Long refundId, RefundRequestDTO refundRequest) {
        return refundRepository.findById(refundId)
                .map(refund -> {
                    refund.setRefundStatus(refundRequest.getRefundStatus());
                    refund.setDescription(refundRequest.getDescription());
                    refund.setCreatedDate(refundRequest.getCreatedDate());
                    refund.setUserEmail(refundRequest.getUserEmail());
                    refund.setOrder(orderService.getOrderById(refundRequest.getOrderId()));
                    try {
                        return refundRepository.save(refund);
                    } catch (OptimisticLockException ex) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, "Entity was updated by another user. Try again");
                    }
                })
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Refund with id %d not found", refundId))
                );
    }
    @Override
    public void deleteRefundById(Long refundId)
    {
        refundRepository.deleteById(refundId);
    }

    @Override
    public Refund getRefundById(Long refundId) {
        return refundRepository.findById(refundId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Refund with id %d not found", refundId))
        );
    }
}