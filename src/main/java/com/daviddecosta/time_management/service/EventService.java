package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Event;
import java.util.List;
import java.time.LocalDateTime;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(Long id);
    Event saveEvent(Event event);
    void deleteEvent(Long id);
    List<Event> getEventsByDate(LocalDateTime startOfDay, LocalDateTime endOfDay);

}

