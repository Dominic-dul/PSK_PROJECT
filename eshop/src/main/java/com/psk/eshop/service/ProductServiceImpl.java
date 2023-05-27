package com.psk.eshop.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.psk.eshop.dto.ProductRequestDTO;
import com.psk.eshop.enums.OrderStatus;
import com.psk.eshop.interceptors.Loggable;
import com.psk.eshop.model.Order;
import com.psk.eshop.model.Product;
import com.psk.eshop.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{
    private ProductRepository productRepository;
    @Override
    @Loggable
    public Product createProduct(ProductRequestDTO productRequest, MultipartFile file) {
        var newProduct = Product.builder()
                .userEmail(productRequest.getUserEmail())
                .discountId(productRequest.getDiscountId())
                .price(productRequest.getPrice())
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .picturePath(getCloudinaryPicture(file))
                .quantity(productRequest.getQuantity())
                .build();
        return productRepository.save(newProduct);
    }

    @Override
    @Loggable
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
    @Override
    @Loggable
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %d not found", productId))
        );
    }
    @Override
    @Loggable
    public Product updateProduct(Long productId, ProductRequestDTO productRequest, MultipartFile file) {
        String email = productRequest.getUserEmail();
        Long discountId = productRequest.getDiscountId();
        BigDecimal price = productRequest.getPrice();
        String name = productRequest.getName();
        String description = productRequest.getDescription();
        Long quantity = productRequest.getQuantity();
        return productRepository.findById(productId)
                .map(product -> {
                    if (email != null){
                        product.setUserEmail(email);
                    }
                    if (discountId != null){
                        product.setDiscountId(discountId);
                    }
                    if (price != null){
                        product.setPrice(price);
                    }
                    if (name != null){
                        product.setName(name);
                    }
                    if(description != null){
                        product.setDescription(description);
                    }
                    if (file != null && !file.isEmpty()){
                        product.setPicturePath(getCloudinaryPicture(file));
                    }
                    if (quantity != null){
                        product.setQuantity(quantity);
                    }
                    return productRepository.save(product);
                })
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %d not found", productId))
                );
    }

    @Override
    @Loggable
    public void deleteProductById(Long productId) {
        Product product = getProductById(productId);

        if (hasActiveOrdersWithProduct(product)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("Cannot delete product. There are active orders with this product (productId = %d).", productId));
        }

        productRepository.deleteById(productId);
    }
    @Override
    @Loggable
    public Long getProductQuantityById(Long productId){
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %d not found", productId))
        );
        return product.getQuantity();
    }

    private boolean hasActiveOrdersWithProduct(Product product) {
        for (Order order : product.getOrders()) {
            OrderStatus orderStatus = order.getOrderStatus();
            if (orderStatus != OrderStatus.REJECTED) {
                return true;
            }
        }
        return false;
    }

    private String getCloudinaryPicture(MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            Map config = new HashMap();
            config.put("cloud_name", "drlkduluz");
            config.put("api_key", "138657524274591");
            config.put("api_secret", "ov27viA2NibOXi9eAZHXh05IiSI");
            Cloudinary cloudinary = new Cloudinary(config);
            try {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                return (String) uploadResult.get("secure_url");
            } catch (IOException e) {
                return null;
            }
        }
        return null;
    }
}
