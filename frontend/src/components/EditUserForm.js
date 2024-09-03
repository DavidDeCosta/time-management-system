import React, { useState } from 'react';
import { updateUser, deleteUser } from '../services/userService';

const EditUserForm = ({ user, onUserUpdated, onCancel }) => {
    const [username, setUsername] = useState(user.username);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { ...user, username };
            const result = await updateUser(user.id, updatedUser);
            alert('User updated successfully');
            onUserUpdated(result);
        } catch (error) {
            console.error('Failed to update user', error);
            alert('Failed to update user');
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId);  
                alert('User deleted successfully');
                onUserUpdated(null);
            } catch (error) {
                console.error('Failed to delete user', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <form onSubmit={handleUpdate} className="p-4 space-y-4 bg-white border rounded-lg shadow-lg">
            <div>
                <label className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">
                    Update User
                </button>
                <button
                    type="button"
                    onClick={() => handleDelete(user.id)}  
                    className="px-4 py-2 text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
                >
                    Delete User
                </button>
                <button type="button" onClick={onCancel} className="px-4 py-2 text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditUserForm;
