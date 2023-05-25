package com.psk.eshop.config;

import com.psk.eshop.repository.ProductRepository;
import com.psk.eshop.service.ProductDateServiceImpl;
import com.psk.eshop.service.ProductService;
import com.psk.eshop.service.ProductServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class DecoratorConfig {
    ProductRepository productRepository;
    @Bean
    public ProductService productService(){
        return new ProductDateServiceImpl(new ProductServiceImpl(productRepository), productRepository);
    }
}
