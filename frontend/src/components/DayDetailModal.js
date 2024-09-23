import React from 'react';
import { useState } from 'react';
import EventForm from './EventForm'; 

const DayDetailModal = ({ date, user, onClose }) => {
    const [showEventForm, setShowEventForm] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                <h2 className="mb-4 text-2xl font-bold">Events on {date.toLocaleDateString()}</h2>
                <div className="mb-4">No events scheduled</div>
                {!showEventForm && (
                    <button 
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                        onClick={() => setShowEventForm(true)}
                    >
                        Create Event
                    </button>
                )}
                {showEventForm && (
                    <EventForm date={date} user={user} onClose={onClose} />
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
