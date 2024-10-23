import React from 'react';
import { PhotographIcon, DocumentTextIcon, VideoCameraIcon, MusicNoteIcon, SearchIcon, ExternalLinkIcon, DotsVerticalIcon } from '@heroicons/react/outline';

const MyFiles = () => {

  const recentFiles = [
    { name: 'IMG_100000', type: 'PNG file', size: '5 MB', icon: <PhotographIcon className="h-6 w-6" /> },
    { name: 'Startup pitch', type: 'AU file', size: '105 MB', icon: <MusicNoteIcon className="h-6 w-6" /> },
    { name: 'Freestyle beat', type: 'MP3 file', size: '21 MB', icon: <MusicNoteIcon className="h-6 w-6" /> },
    { name: 'Work proposal', type: 'DOCX file', size: '500 kb', icon: <DocumentTextIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">My files</h2>
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
                <ExternalLinkIcon className="h-5 w-5 cursor-pointer hover:text-gray-600" />
                <DotsVerticalIcon className="h-5 w-5 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyFiles;
