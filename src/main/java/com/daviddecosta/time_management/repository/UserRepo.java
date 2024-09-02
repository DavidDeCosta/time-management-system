package com.daviddecosta.time_management.repository;

import com.daviddecosta.time_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    // Additional custom methods
}
