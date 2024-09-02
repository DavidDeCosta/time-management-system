package com.daviddecosta.time_management.repository;

import com.daviddecosta.time_management.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
    // Additional custom methods
}
