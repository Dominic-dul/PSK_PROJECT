package com.psk.eshop.controller;

import com.psk.eshop.dto.RefundRequestDTO;
import com.psk.eshop.model.Refund;
import com.psk.eshop.service.RefundService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/e-shop")
@AllArgsConstructor
public class RefundController {
    private final RefundService refundService;
    @PostMapping(value = "/refund")
    public Refund add(@RequestBody RefundRequestDTO refundRequest){
        return refundService.saveRefund(refundRequest);
    }

    @GetMapping("/refunds")
    public List<Refund> getRefunds(){
        return refundService.getRefunds();
    }

    @GetMapping("/refund/{refundId}")
    public Refund getRefundById(@PathVariable Long refundId){
        return refundService.getRefundById(refundId);
    }

    @PutMapping("/refund/{refundId}")
    public Refund update(@PathVariable Long refundId, @RequestBody RefundRequestDTO refundRequest){
        return refundService.updateRefund(refundId, refundRequest);
    }
}
