import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const WeekPage = () => {
    return (
        <div style={{ height: '500px' }} className="p-4 border rounded-lg shadow-lg">
            <Calendar
                localizer={momentLocalizer(moment)}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                view="week"
                toolbar={false}
            />
        </div>
    );
};

export default WeekPage;
