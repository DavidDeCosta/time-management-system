import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DayDetailModal from '../components/DayDetailModal';
import EventForm from '../components/EventForm';
import { getAllEvents } from '../services/eventService'; 

const localizer = momentLocalizer(moment);

const MonthPage = ({ user }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventFormOpen, setIsEventFormOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await getAllEvents();
                const formattedEvents = fetchedEvents.map(event => ({
                    ...event,
                    start: new Date(event.startTime),
                    end: new Date(event.endTime),
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };

        fetchEvents();
    }, []);

    const handleDayClick = (date) => {
        setSelectedDate(date);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEventFormOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedDate(null);
        setSelectedEvent(null);
        setIsEventFormOpen(false);
    };

    const handleEventUpdated = (updatedEvent) => {
        // Update the event
        setEvents(prevEvents =>
            prevEvents.map(ev => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
        setIsEventFormOpen(false);
    };

    const handleEventDeleted = (deletedEvent) => {
        // Remove the event
        setEvents(prevEvents => prevEvents.filter(ev => ev.id !== deletedEvent.id));
        setIsEventFormOpen(false);
    };

    return (
        <div style={{ height: '500px' }} className="p-4 border rounded-lg shadow-lg">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view="month"
                toolbar={false}
                onSelectEvent={handleEventClick}
                onSelectSlot={(slotInfo) => handleDayClick(slotInfo.start)}
                selectable
            />
            {selectedDate && (
                <DayDetailModal 
                    date={selectedDate} 
                    user={user} 
                    onClose={handleCloseModal} 
                />
            )}
            {isEventFormOpen && selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                        <h2 className="mb-4 text-2xl font-bold">Edit Event</h2>
                        <EventForm
                            event={selectedEvent}
                            user={user}
                            onClose={handleCloseModal}
                            onEventUpdated={handleEventUpdated}
                            onEventDeleted={handleEventDeleted}
                        />
                        <button
                            className="mt-4 text-sm text-gray-600 underline"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthPage;
