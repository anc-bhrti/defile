// Home.js
import React, { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { getContract } from '../services/contractService';
import { ethers } from 'ethers';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const contract = getContract();
        if (!contract) return;

        // Listen for new file uploads
        contract.on('FileUploaded', (fileId, owner, ipfsHash, fileName) => {
          setFiles(prev => [...prev, {
            id: fileId.toString(),
            owner,
            ipfsHash,
            fileName
          }]);
        });

        // TODO: Add function in contract to get all files
        // For now, we'll just listen for new uploads

        setLoading(false);
        
        return () => {
          contract.removeAllListeners('FileUploaded');
        };
      } catch (error) {
        console.error('Error loading files:', error);
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search files"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Explore Files</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                <div className="h-32 w-full bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                  {/* You can add file type icons here based on file extension */}
                  <span className="text-4xl">📄</span>
                </div>
                <h3 className="font-medium truncate">{file.fileName}</h3>
                <p className="text-sm text-gray-500 truncate">
                  Owner: {file.owner.slice(0, 6)}...{file.owner.slice(-4)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;