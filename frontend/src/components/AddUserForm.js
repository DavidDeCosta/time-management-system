import React, { useState } from 'react';
import { createUser } from '../services/userService';

const AddUserForm = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username };
      const createdUser = await createUser(newUser);
      alert('User created successfully: ' + JSON.stringify(createdUser));
    } catch (error) {
      console.error('Failed to create user', error);
      alert('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white border rounded-lg shadow-lg">
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
      <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">
        Create User
      </button>
    </form>
  );
};

export default AddUserForm;
