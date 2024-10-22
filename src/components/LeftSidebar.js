import React from 'react';
import { HomeIcon, UserGroupIcon, StarIcon, CloudUploadIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';

const LeftSidebar = () => {
  const menuItems = [
    { icon: <HomeIcon className="h-6 w-6" />, label: 'My cloud', active: true },
    { icon: <UserGroupIcon className="h-6 w-6" />, label: 'Shared files' },
    { icon: <StarIcon className="h-6 w-6" />, label: 'Favorites' },
    { icon: <CloudUploadIcon className="h-6 w-6" />, label: 'Upload files' },
  ];

  const bottomItems = [
    { icon: <CogIcon className="h-6 w-6" />, label: 'Settings' },
    { icon: <LogoutIcon className="h-6 w-6" />, label: 'Log out' },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
      <div className="mb-8">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  item.active ? 'bg-blue-800' : 'hover:bg-blue-800'
                } transition-colors duration-200`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <ul className="space-y-4">
          {bottomItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
