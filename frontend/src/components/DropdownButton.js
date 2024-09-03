import { FaCog } from 'react-icons/fa';

const DropdownButton = ({ title, options, onSelect, onEdit, showCogwheel, isOpen, setIsOpen }) => {
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const handleEdit = (e, option) => {
        e.stopPropagation(); // Prevent dropdown from closing when clicking cogwheel
        onEdit(option);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={handleToggle}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
                {title}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <button onClick={() => handleSelect(option)} className="flex-1 text-left">
                                    {option.username || option} {/* cogwheel next to usernames, not next to "Add User" */}
                                </button>
                                {showCogwheel && option.username && (
                                    <FaCog
                                        className="ml-2 text-gray-600 cursor-pointer hover:text-gray-800"
                                        onClick={(e) => handleEdit(e, option)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
