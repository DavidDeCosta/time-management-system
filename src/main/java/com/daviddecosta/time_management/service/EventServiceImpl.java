package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Event;
import com.daviddecosta.time_management.repository.EventRepo;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepo eventRepo;

    //@Autowired
    public EventServiceImpl(EventRepo eventRepo) {
        this.eventRepo = eventRepo;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Event not found"));
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepo.save(event);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepo.deleteById(id);
    }
}
