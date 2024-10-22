import React from 'react';

const RightSidebar = () => {
  const sharedFolders = [
    { name: 'Keynote files', users: 2 },
    { name: 'Vacation photos', users: 1 },
    { name: 'Project report', users: 1 },
  ];

  return (
    <div className="w-72 p-8 border-l border-gray-200">
      <div className="mb-8">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-colors duration-200">
          <span>⬆️</span>
          <span>Add new files</span>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-600 mb-2">Your storage</h2>
        <div className="mb-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 w-3/4 bg-blue-500 rounded-full transition-all duration-300"></div>
          </div>
        </div>
        <p className="text-sm text-gray-600">75 GB of 100 GB are used</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-600">Your shared folders</h2>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
            + Add more
          </a>
        </div>
        <div className="space-y-3">
          {sharedFolders.map((folder, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg p-3 flex items-center justify-between hover:bg-blue-100 transition-colors duration-200"
            >
              <span className="text-sm font-medium">{folder.name}</span>
              <div className="flex -space-x-2">
                {[...Array(folder.users)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;