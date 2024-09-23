package com.daviddecosta.time_management.controller;

import com.daviddecosta.time_management.service.EventService;
import com.daviddecosta.time_management.model.Event;
import com.daviddecosta.time_management.model.User;
import com.daviddecosta.time_management.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id){
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        if (event.getUser() != null && event.getUser().getId() != null) {
            Long userId = event.getUser().getId();
            User user = userService.getUserById(userId);
            event.setUser(user);
        } else {
            throw new IllegalArgumentException("User ID is required");
        }
        return eventService.saveEvent(event);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event existingEvent = eventService.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        // Update fields
        existingEvent.setTitle(event.getTitle());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setStartTime(event.getStartTime());
        existingEvent.setEndTime(event.getEndTime());
        existingEvent.setLocation(event.getLocation());

        // Update user if provided
        if (event.getUser() != null && event.getUser().getId() != null) {
            User user = userService.getUserById(event.getUser().getId());
            existingEvent.setUser(user);
        }

        Event updatedEvent = eventService.saveEvent(existingEvent);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
