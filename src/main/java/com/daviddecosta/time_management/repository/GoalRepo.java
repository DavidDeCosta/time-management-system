package com.daviddecosta.time_management.repository;

import com.daviddecosta.time_management.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepo extends JpaRepository<Goal, Long> {
    // Additional custom methods
}
