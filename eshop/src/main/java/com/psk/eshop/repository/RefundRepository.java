package com.psk.eshop.repository;

import com.psk.eshop.model.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefundRepository extends JpaRepository<Refund, Long> {
}
