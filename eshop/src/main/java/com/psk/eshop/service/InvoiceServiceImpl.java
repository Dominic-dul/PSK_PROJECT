package com.psk.eshop.service;

import com.psk.eshop.dto.InvoiceRequestDTO;
import com.psk.eshop.model.Invoice;
import com.psk.eshop.repository.InvoiceRepository;
import jakarta.persistence.OptimisticLockException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class InvoiceServiceImpl implements InvoiceService{
    private final InvoiceRepository invoiceRepository;
    private final OrderService orderService;

    @Override
    public Invoice getInvoiceById(Long invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invoice with id %d not found", invoiceId))
        );
    }

    @Override
    public Invoice createInvoice(InvoiceRequestDTO invoiceRequest) {
        var newInvoice = Invoice.builder()
                .order(orderService.getOrderById(invoiceRequest.getOrderId()))
                .createdDate(invoiceRequest.getCreatedDate())
                .paymentType(invoiceRequest.getPaymentType())
                .notes(invoiceRequest.getNotes())
                .amount(invoiceRequest.getAmount())
                .build();
        return invoiceRepository.save(newInvoice);
    }

    @Override
    public Invoice updateInvoice(Long invoiceId, InvoiceRequestDTO invoiceRequest) {
        return invoiceRepository.findById(invoiceId)
                .map(invoice -> {
                    invoice.setOrder(orderService.getOrderById(invoiceRequest.getOrderId()));
                    invoice.setCreatedDate(invoiceRequest.getCreatedDate());
                    invoice.setPaymentType(invoiceRequest.getPaymentType());
                    invoice.setNotes(invoiceRequest.getNotes());
                    invoice.setAmount(invoiceRequest.getAmount());
                    try {
                        return invoiceRepository.save(invoice);
                    } catch (OptimisticLockException ex) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, "Entity was updated by another user. Try again");
                    }
                })
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invoice with id %d not found", invoiceId))
                );
    }
    @Override
    public void deleteInvoiceById(Long invoiceId)
    {
        invoiceRepository.deleteById(invoiceId);
    }

    @Override
    public List<Invoice> getInvoices() {
        return invoiceRepository.findAll();
    }
}
