import React from 'react';

const MainContent = () => {
  const categories = [
    { icon: '🖼️', label: 'Pictures', files: '480 files', color: 'bg-purple-500' },
    { icon: '📄', label: 'Documents', files: '50 files', color: 'bg-teal-500' },
    { icon: '🎥', label: 'Videos', files: '30 files', color: 'bg-pink-500' },
    { icon: '🎵', label: 'Audio', files: '80 files', color: 'bg-blue-500' },
  ];

  const folders = [
    { label: 'Work', files: '820 files' },
    { label: 'Personal', files: '115 files' },
    { label: 'School', files: '65 files' },
    { label: 'Archive', files: '21 files' },
  ];

  const recentFiles = [
    { name: 'IMG_100000', type: 'PNG file', size: '5 MB', icon: '🖼️' },
    { name: 'Startup pitch', type: 'AU file', size: '105 MB', icon: '🎵' },
    { name: 'Freestyle beat', type: 'MP3 file', size: '21 MB', icon: '🎵' },
    { name: 'Work proposal', type: 'DOCX file', size: '500 kb', icon: '📄' },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.color} rounded-xl p-4 text-white transition-transform hover:scale-105`}
            >
              <span className="text-2xl">{category.icon}</span>
              <h3 className="mt-2 font-medium">{category.label}</h3>
              <p className="text-sm opacity-80">{category.files}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Files</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-medium">{folder.label}</h3>
              <p className="text-sm text-gray-500">{folder.files}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Recent files</h2>
        <div className="bg-white rounded-xl divide-y">
          {recentFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <span className="text-xl">{file.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-gray-500">{file.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="text-sm">{file.size}</span>
                <span className="cursor-pointer hover:text-gray-600">↗️</span>
                <span className="cursor-pointer hover:text-gray-600">⋮</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;