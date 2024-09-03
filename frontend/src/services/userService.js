import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

export const createUser = async (user) => {
    const response = await axios.post(API_URL, user, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update user', error);
        throw error;
    }
};


export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
    throw error;
  }
};
