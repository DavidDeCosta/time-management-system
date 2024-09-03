import React, { useState, useEffect } from 'react';
import DropdownButton from '../components/DropdownButton';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import DayPage from '../pages/DayPage';
import WeekPage from '../pages/WeekPage';
import MonthPage from '../pages/MonthPage';
import { getAllUsers } from '../services/userService';

const MainPage = () => {
    const [view, setView] = useState('day');
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
                setUser(fetchedUsers[0]); 
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelect = (selectedUser) => {
        if (selectedUser.username === 'Add User') {
            setShowAddUserForm(true);
            setEditUser(null); 
        } else {
            setUser(selectedUser);
            setShowAddUserForm(false);
        }
        setIsViewDropdownOpen(false);
    };

    const handleViewSelect = (selectedView) => {
        setView(selectedView);
        setIsUserDropdownOpen(false);
    };

    const handleUserEdit = (selectedUser) => {
        setEditUser(selectedUser);
        setShowAddUserForm(false);
        setIsViewDropdownOpen(false);
    };

    const handleUserCreated = (createdUser) => {
        setUsers([...users, createdUser]); 
        setUser(createdUser); 
        setShowAddUserForm(false); 
    };

    const getFormattedDate = () =>{
        const today = new Date();
        return today.toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'});
    };

    const renderViewPage = () => {
        switch(view) {
            case 'day':
                return <DayPage />;
            case 'week':
                return <WeekPage />;
            case 'month':
                return <MonthPage />;
            default:
                return <DayPage />;
        }
    }

    const userOptions = [...users, { username: 'Add User' }];
    const viewOptions = ['day', 'week', 'month'];

    return (
        <div className="container mx-auto mt-10">
            <h1 className="mb-5 text-3xl font-bold">Time Management Application</h1>
            <div className="flex justify-end mb-5 space-x-4">
                <DropdownButton
                    title={`User: ${user?.username || ''}`}
                    options={userOptions}
                    onSelect={handleUserSelect}
                    onEdit={handleUserEdit}
                    showCogwheel={true}
                    isOpen={isUserDropdownOpen}
                    setIsOpen={(isOpen) => {
                        setIsUserDropdownOpen(isOpen);
                        setIsViewDropdownOpen(false); 
                    }}
                />
                <DropdownButton
                    title={`View: ${view}`}
                    options={viewOptions}
                    onSelect={handleViewSelect}
                    showCogwheel={false}
                    isOpen={isViewDropdownOpen}
                    setIsOpen={(isOpen) => {
                        setIsViewDropdownOpen(isOpen);
                        setIsUserDropdownOpen(false); 
                    }}
                />
            </div>
            
            <div className="mb-4 text-xl font-semibold text-center text-gray-700">
                {getFormattedDate()}
            </div>

            {showAddUserForm ? (
                <AddUserForm onUserCreated={handleUserCreated} />
            ) : editUser ? (
                <EditUserForm user={editUser} onUserUpdated={(updatedUser) => setEditUser(updatedUser)} onCancel={() => setEditUser(null)} />
            ) : (
                renderViewPage()
            )}
        </div>
    );
};

export default MainPage;
