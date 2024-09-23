import React, { useState, useEffect } from 'react';
import EventForm from './EventForm'; 
import { getEventsByDate } from '../services/eventService';
import moment from 'moment';

const DayDetailModal = ({ date, user, onClose }) => {
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventsOnDay, setEventsOnDay] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEventsOnDay = async () => {
            try {
                const formattedDate = moment(date).format('YYYY-MM-DD');
                const events = await getEventsByDate(formattedDate);
                // sort events
                const formattedEvents = events.map(event => ({
                    ...event,
                    startTime: moment(event.startTime).format('HH:mm'),
                    endTime: moment(event.endTime).format('HH:mm'),
                })).sort((a, b) => a.startTime.localeCompare(b.startTime));
                setEventsOnDay(formattedEvents);
            } catch (error) {
                console.error('Failed to fetch events for the day', error);
            }
        };

        fetchEventsOnDay();
    }, [date]);

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setShowEventForm(true);
    };

    const handleEventCreated = (newEvent) => {
        setEventsOnDay(prevEvents => {
            const formattedEvent = {
                ...newEvent,
                startTime: moment(newEvent.startTime).format('HH:mm'),
                endTime: moment(newEvent.endTime).format('HH:mm'),
            };
            return [...prevEvents, formattedEvent].sort((a, b) => a.startTime.localeCompare(b.startTime));
        });
        setShowEventForm(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                <h2 className="mb-4 text-2xl font-bold">Events on {date.toLocaleDateString()}</h2>
                {eventsOnDay.length > 0 ? (
                    <ul className="mb-4">
                        {eventsOnDay.map(event => (
                            <li key={event.id} className="mb-2">
                                <strong>{event.title}</strong> ({event.startTime} - {event.endTime})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mb-4">No events scheduled</div>
                )}
                {!showEventForm && (
                    <button 
                        className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                        onClick={handleCreateEvent}
                    >
                        Create Event
                    </button>
                )}
                {showEventForm && (
                    <EventForm 
                        date={date} 
                        user={user} 
                        onClose={() => setShowEventForm(false)}
                        onEventUpdated={handleEventCreated}
                    />
                )}
                <button
                    className="mt-4 text-sm text-gray-600 underline"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DayDetailModal;
