package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Payment;
import java.util.List;

public interface PaymentService {
    List<Payment> getAllPayments();
    Payment getPaymentById(Long id);
    Payment savePayment(Payment payment);
    Payment updatePayment(Long id, Payment paymentDetails);
    void deletePayment(Long id);
}
