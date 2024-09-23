import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { createEvent, updateEvent, deleteEvent } from '../services/eventService';

const EventForm = ({ date, event, user, onClose, onEventUpdated, onEventDeleted }) => {
    // init state with event data if editing, or default values if creating
    const [title, setTitle] = useState(event ? event.title : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [startTime, setStartTime] = useState(event ? moment(event.startTime).format('HH:mm') : '');
    const [endTime, setEndTime] = useState(event ? moment(event.endTime).format('HH:mm') : '');
    const [location, setLocation] = useState(event ? event.location : '');

    useEffect(() => {
        if (event) {
            // update state when event prop changes
            setTitle(event.title);
            setDescription(event.description);
            setStartTime(moment(event.startTime).format('HH:mm'));
            setEndTime(moment(event.endTime).format('HH:mm'));
            setLocation(event.location);
        } else {
            // reset state when creating a new event
            setTitle('');
            setDescription('');
            setStartTime('');
            setEndTime('');
            setLocation('');
        }
    }, [event]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            alert("Please select a user.");
            return;
        }

        const eventDate = date ? moment(date).format('YYYY-MM-DD') : moment(event.startTime).format('YYYY-MM-DD');
        const formattedStartTime = `${eventDate}T${startTime}:00`;
        const formattedEndTime = `${eventDate}T${endTime}:00`;

        const eventData = {
            id: event ? event.id : undefined, // include id if editing
            title,
            description,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            location,
            user: { id: user.id },
        };

        try {
            if (event) {
                // Update existing event
                const updatedEvent = await updateEvent(eventData);
                console.log("Event Updated:", updatedEvent);
                if (onEventUpdated) {
                    onEventUpdated({
                        ...updatedEvent,
                        start: new Date(updatedEvent.startTime),
                        end: new Date(updatedEvent.endTime),
                    });
                }
            } else {
                // Create new event
                const savedEvent = await createEvent(eventData);
                console.log("Event Created:", savedEvent);
                if (onEventUpdated) {
                    onEventUpdated({
                        ...savedEvent,
                        start: new Date(savedEvent.startTime),
                        end: new Date(savedEvent.endTime),
                    });
                }
            }
            onClose();
        } catch (error) {
            console.error("Failed to save event", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(event.id);
                console.log("Event Deleted:", event.id);
                if (onEventDeleted) {
                    onEventDeleted(event);
                }
                onClose();
            } catch (error) {
                console.error('Failed to delete event', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            {/* Form Fields */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Event Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            {/* ... other form fields ... */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            {/* Start Time */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input 
                    type="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            {/* End Time */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input 
                    type="time" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            {/* Location */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
            >
                {event ? 'Update Event' : 'Save Event'}
            </button>
            {/* Delete Button */}
            {event && (
                <button
                    type="button"
                    className="w-full px-4 py-2 mt-2 text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
                    onClick={handleDelete}
                >
                    Delete Event
                </button>
            )}
        </form>
    );
};

export default EventForm;
