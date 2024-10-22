import React from 'react';

const LeftSidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'My cloud', active: true },
    { icon: '👥', label: 'Shared files' },
    { icon: '⭐', label: 'Favorites' },
    { icon: '⬆️', label: 'Upload files' },
  ];

  const bottomItems = [
    { icon: '⚙️', label: 'Settings' },
    { icon: '📤', label: 'Log out' },
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
                <span className="text-xl">{item.icon}</span>
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
                <span className="text-xl">{item.icon}</span>
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