package com.psk.eshop.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.psk.eshop.dto.ProductRequestDTO;
import com.psk.eshop.model.Product;
import com.psk.eshop.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/e-shop")
@CrossOrigin("*")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = "/product")
    public Product add(@RequestBody ProductRequestDTO productRequest, @RequestParam(required = false) MultipartFile file) {
        return productService.createProduct(productRequest, file);
    }

    @GetMapping("/products")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping("/product/{productId}")
    public Product getProductById(@PathVariable Long productId){
        return productService.getProductById(productId);
    }

    @PutMapping("/product/{productId}")
    public Product update(@PathVariable Long productId, @RequestBody ProductRequestDTO productRequest, @RequestParam(required = false) MultipartFile file) {
        return productService.updateProduct(productId, productRequest, file);
    }

    @DeleteMapping("/product/{productId}")
    public void deleteProductById(@PathVariable Long productId)
    {
        productService.deleteProductById(productId);
    }
    @GetMapping("/product/{productId}/quantity")
    public Long getProductQuantityById(@PathVariable Long productId){
        return productService.getProductQuantityById(productId);
    }
}
