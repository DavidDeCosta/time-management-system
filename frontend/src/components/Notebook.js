import React, { useState } from 'react';

const Notebook = () => {
    const [notes, setNotes] = useState('');

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    return (
        <div className="relative p-8 font-serif bg-white bg-center bg-cover border-l-4 border-r-4 border-gray-300 rounded-lg shadow-lg bg-notebook">
            <textarea
                value={notes}
                onChange={handleNotesChange}
                className="w-full h-64 p-4 text-lg leading-loose bg-gradient-to-b from-transparent via-gray-200 to-transparent bg-no-repeat bg-[length:100%_2em] border-none focus:outline-none resize-none"
                placeholder="Write your notes here..."
            />
        </div>
    );
};

export default Notebook;
