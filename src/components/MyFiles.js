import React, { useState } from 'react';
import contractIntegration from './ContractIntegration';

const MyFiles = () => {
  const [fileId, setFileId] = useState('');
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  const fetchFile = async () => {
    try {
      setError(null);
      const file = await contractIntegration.getFile(fileId);
      setFileData(file);
    } catch (err) {
      setError(err.message);
      setFileData(null);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold mb-4">Fetch File by ID</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter File ID"
          className="border p-2 rounded-lg"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
        />
        <button onClick={fetchFile} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Fetch File
        </button>
      </div>
      
      {error && (
        <div className="text-red-500">
          <p>{error}</p>
        </div>
      )}
      
      {fileData && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <p><strong>File ID:</strong> {fileData.id}</p>
          <p><strong>File Name:</strong> {fileData.fileName}</p>
          <p>
            <strong>IPFS Hash:</strong> 
            <a 
              href={`https://ipfs.io/ipfs/${fileData.ipfsHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {fileData.ipfsHash}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default MyFiles;
