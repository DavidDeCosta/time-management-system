package com.daviddecosta.time_management.repository;

import com.daviddecosta.time_management.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepo extends JpaRepository<Note, Long> {
    // Additional custom methods
}
