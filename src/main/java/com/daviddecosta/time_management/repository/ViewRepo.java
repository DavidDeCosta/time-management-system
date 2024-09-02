package com.daviddecosta.time_management.repository;

import com.daviddecosta.time_management.model.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewRepo extends JpaRepository<View, Long> {
    // Additional custom methods
}
