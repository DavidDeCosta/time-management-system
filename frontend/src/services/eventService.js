import axios from 'axios';

const API_URL = 'http://localhost:8080/events';

// Create a new event
export const createEvent = async (eventData) => {
    const response = await axios.post(API_URL, eventData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

// Get all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch events', error);
        throw error;
    }
};

// Get events for a specific date
export const getEventsByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/date/${date}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch events for date', error);
        throw error;
    }
};

// Get a single event by ID
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch event', error);
        throw error;
    }
};



// Update an event
export const updateEvent = async (eventData) => {
    try {
        const response = await axios.put(`${API_URL}/${eventData.id}`, eventData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update event', error);
        throw error;
    }
};

// Delete an event
export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete event', error);
        throw error;
    }
};
