package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Payment;
import com.daviddecosta.time_management.repository.PaymentRepo;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepo paymentRepo;

    //@Autowired
    public PaymentServiceImpl(PaymentRepo paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Payment not found"));
    }

    @Override
    public Payment savePayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    @Override
    public Payment updatePayment(Long id, Payment paymentDetails){
        Payment existingPayment = paymentRepo.findById(id)
                            .orElseThrow(() -> new EntityNotFoundException("Payment not found with id " + id));
        
        //Update the properties of the existing Payment
        existingPayment.setAmount(paymentDetails.getAmount());
        existingPayment.setPaymentDate((paymentDetails.getPaymentDate()));

        return paymentRepo.save(existingPayment);
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepo.deleteById(id);
    }
}
