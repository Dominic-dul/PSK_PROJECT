package com.psk.eshop.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.psk.eshop.dto.ProductRequestDTO;
import com.psk.eshop.dto.UserIdDTO;
import com.psk.eshop.model.Product;
import com.psk.eshop.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/e-shop")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = "/product")
    public Product add(@RequestParam String productRequest, @RequestParam MultipartFile file) throws JsonProcessingException {
        ProductRequestDTO product = new ObjectMapper().readValue(productRequest, ProductRequestDTO.class);
        return productService.createProduct(product, file);
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
    public Product update(@PathVariable Long productId, @RequestParam String productRequest, @RequestParam MultipartFile file) throws JsonProcessingException {
        ProductRequestDTO product = new ObjectMapper().readValue(productRequest, ProductRequestDTO.class);
        return productService.updateProduct(productId, product, file);
    }

    @DeleteMapping("/product/{productId}")
    public void deleteProductById(@PathVariable Long productId)
    {
        productService.deleteProductById(productId);
    }
}
