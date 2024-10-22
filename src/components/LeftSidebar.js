import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-blue-900 p-4 flex flex-col">
      {/* Profile Section */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>

      {/* Navigation NavLinks */}
      <div className="flex-1 space-y-2">
        {/* Home NavLink */}
        <NavLink 
          to="/"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* Home Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v12a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink 
          to="/my-files"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* File Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6" />
          </svg>
          <span>My Files</span>
        </NavLink>

        <NavLink 
          to="/shared-files"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* Users Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Shared files</span>
        </NavLink>

        <NavLink 
          to="/favorites"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* Star Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <span>Favorites</span>
        </NavLink>

        <NavLink 
          to="/upload-files"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* Upload Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Upload files</span>
        </NavLink>
      </div>

      {/* Bottom Section */}
      <div className="space-y-2">
        <NavLink 
          to="/settings"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* Settings Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </NavLink>

        <NavLink 
          to="/logout"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? 'text-white bg-blue-800' : 'text-gray-300 hover:text-white hover:bg-blue-800'
            }`
          }
        >
          {/* Logout Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 16l4-4m0 0l-4-4m4 4H3" />
          </svg>
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default LeftSidebar;
