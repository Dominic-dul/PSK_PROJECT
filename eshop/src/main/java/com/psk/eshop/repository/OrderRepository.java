package com.psk.eshop.repository;

import com.psk.eshop.enums.OrderStatus;
import com.psk.eshop.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.userEmail = ?1 AND (o.orderStatus = ?2 OR ?2 IS NULL)")
    List<Order> filterOrders(String userEmail, OrderStatus orderStatus);
}
