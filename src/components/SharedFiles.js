// SharedFiles.js
import React, { useState, useEffect } from 'react';
import contractIntegration from './ContractIntegration';
import { CloudDownloadIcon } from '@heroicons/react/outline';

const SharedFiles = () => {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFileDetails = async (fileId) => {
    try {
      const details = await contractIntegration.getFileDetails(fileId);
      setSharedFiles(prev => [...prev, { id: fileId, ...details }]);
    } catch (err) {
      console.error(`Failed to load details for file ${fileId}:`, err);
    }
  };

  useEffect(() => {
    // Listen for new access grants
    contractIntegration.onAccessGranted(async ({ fileId }) => {
      await loadFileDetails(fileId);
    });

    // Load initial shared files
    loadSharedFiles();
  }, []);

  const loadSharedFiles = async () => {
    try {
      setLoading(true);
      // Note: You'll need to implement a way to track file IDs,
      // either through events or storing them in a separate contract mapping
      const fileIds = []; // Replace with actual file IDs retrieval logic
      
      const filesPromises = fileIds.map(async (fileId) => {
        const hasAccess = await contractIntegration.checkAccess(fileId);
        if (hasAccess) {
          const details = await contractIntegration.getFileDetails(fileId);
          return {
            id: fileId,
            ...details
          };
        }
        return null;
      });

      const files = (await Promise.all(filesPromises)).filter(file => file !== null);
      setSharedFiles(files);
    } catch (err) {
      setError('Failed to load shared files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (ipfsHash) => {
    try {
      window.open(`https://ipfs.io/ipfs/${ipfsHash}`, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-semibold mb-6">Shared Files</h1>
      
      {sharedFiles.length === 0 ? (
        <div className="text-center text-gray-500">
          No shared files found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{file.fileName}</h3>
                <button
                  onClick={() => handleDownload(file.ipfsHash)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  <CloudDownloadIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                IPFS Hash: {file.ipfsHash.substring(0, 15)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedFiles;