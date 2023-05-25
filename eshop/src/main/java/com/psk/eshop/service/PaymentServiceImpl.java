package com.psk.eshop.service;

import com.psk.eshop.dto.PaymentRequestDTO;
import com.psk.eshop.model.Payment;
import com.psk.eshop.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@Primary
@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService{
    private final PaymentRepository paymentRepository;
    private final OrderService orderService;
    @Override
    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Payment with id %d not found", paymentId))
        );
    }

    @Override
    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment createPayment(PaymentRequestDTO paymentRequest) {
        var newPayment = Payment.builder()
                .paymentType(paymentRequest.getPaymentType())
                .amount(paymentRequest.getAmount())
                .billingAddress(paymentRequest.getBillingAddress())
                .transactionDate(paymentRequest.getTransactionDate())
                .order(orderService.getOrderById(paymentRequest.getOrderId()))
                .transactionState(paymentRequest.getTransactionState())
                .build();
        return paymentRepository.save(newPayment);
    }

    @Override
    public Payment updatePayment(Long paymentId, PaymentRequestDTO paymentRequest) {
        return paymentRepository.findById(paymentId)
                .map(payment -> {
                    payment.setPaymentType(paymentRequest.getPaymentType());
                    payment.setAmount(paymentRequest.getAmount());
                    payment.setOrder(orderService.getOrderById(paymentRequest.getOrderId()));
                    payment.setBillingAddress(paymentRequest.getBillingAddress());
                    payment.setTransactionDate(paymentRequest.getTransactionDate());
                    payment.setTransactionState(paymentRequest.getTransactionState());
                    return paymentRepository.save(payment);
                })
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Payment with id %d not found", paymentId))
                );
    }
    @Override
    public void deletePaymentById(Long paymentId)
    {
        paymentRepository.deleteById(paymentId);
    }
}
