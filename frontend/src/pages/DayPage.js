import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Goals from '../components/Goals';
import Notebook from '../components/Notebook';

const DayPage = () => {
    const [view, setView] = useState('goals'); // 'goals' or 'notebook'

    const handleToggleView = () => {
        setView(view === 'goals' ? 'notebook' : 'goals');
    };

    return (
        <div className="flex" style={{ height: '500px' }}>
            <div className="w-1/2 p-4 border-r rounded-l-lg shadow-lg">
                <Calendar
                    localizer={momentLocalizer(moment)}
                    events={[]}
                    startAccessor="start"
                    endAccessor="end"
                    view="day"
                    toolbar={false}
                />
            </div>
            <div className="w-1/2 p-4 rounded-r-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        {view === 'goals' ? 'Goals' : 'Notebook'}
                    </h2>
                    <div
                        onClick={handleToggleView}
                        className={`relative inline-block w-16 h-8 cursor-pointer select-none bg-gray-300 rounded-full`}
                    >
                        <div
                            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                                view === 'goals' ? '' : 'transform translate-x-8'
                            }`}
                        ></div>
                    </div>
                </div>
                {view === 'goals' ? <Goals /> : <Notebook />}
            </div>
        </div>
    );
};

export default DayPage;
