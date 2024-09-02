package com.daviddecosta.time_management;

import com.daviddecosta.time_management.model.Event;
import com.daviddecosta.time_management.repository.EventRepo;
import com.daviddecosta.time_management.service.EventServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceImplTest {

    @Mock
    private EventRepo eventRepo;

    @InjectMocks
    private EventServiceImpl eventService;

    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event();
        event.setId(1L);
        event.setTitle("Test Event");
        // Set other properties as needed
    }

    @Test
    void getAllEvents_ShouldReturnEvents() {
        when(eventRepo.findAll()).thenReturn(Collections.singletonList(event));
        List<Event> result = eventService.getAllEvents();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Test Event");
    }

    @Test
    void getEventById_ShouldReturnEvent() {
        when(eventRepo.findById(1L)).thenReturn(java.util.Optional.of(event));
        Event found = eventService.getEventById(1L);
        assertThat(found.getTitle()).isEqualTo("Test Event");
    }

    @Test
    void saveEvent_ShouldReturnSavedEvent() {
        when(eventRepo.save(any(Event.class))).thenReturn(event);
        Event saved = eventService.saveEvent(event);
        assertThat(saved.getTitle()).isEqualTo("Test Event");
    }

    @Test
    void deleteEvent_ShouldVerifyDeletion() {
        doNothing().when(eventRepo).deleteById(1L);
        eventService.deleteEvent(1L);
        verify(eventRepo, times(1)).deleteById(1L);
    }
}
