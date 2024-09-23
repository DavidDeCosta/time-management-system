package com.daviddecosta.time_management.repository;

import com.daviddecosta.time_management.model.Event;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {
        List<Event> findByStartTimeBetweenOrderByStartTimeAsc(LocalDateTime start, LocalDateTime end);

}
