import React, { useState } from 'react';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [goalInput, setGoalInput] = useState('');

    const handleAddGoal = () => {
        if (goalInput.trim() !== '') {
            setGoals([...goals, goalInput]);
            setGoalInput('');
        }
    };

    return (
        <div>
            <ul className="mb-4">
                {goals.map((goal, index) => (
                    <li key={index} className="p-2 mb-2 border rounded-md">{goal}</li>
                ))}
            </ul>
            <input
                type="text"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter a goal"
            />
            <button
                onClick={handleAddGoal}
                className="w-full px-4 py-2 mt-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
            >
                Add Goal
            </button>
        </div>
    );
};

export default Goals;
