// UploadFiles.js
import React, { useState, useRef } from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import contractIntegration from './ContractIntegration';

const UploadFiles = () => {
  const [pricing, setPricing] = useState({
    oneWeek: '',
    oneMonth: '',
    threeMonths: '',
    lifetime: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricing({ ...pricing, [name]: value });
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      // Validate file
      const file = fileInputRef.current.files[0];
      if (!file) {
        setError('Please select a file to upload');
        return;
      }

      // Validate pricing
      if (!pricing.oneWeek && !pricing.oneMonth && !pricing.threeMonths && !pricing.lifetime) {
        setError('Please set at least one pricing option');
        return;
      }

      // Upload to IPFS
      let ipfsHash;
      try {
        ipfsHash = await contractIntegration.uploadFileToIPFS(file);
        console.log('IPFS upload successful:', ipfsHash);
      } catch (ipfsError) {
        console.error('IPFS upload failed:', ipfsError);
        setError(`IPFS upload failed: ${ipfsError.message || 'Unknown error'}`);
        return;
      }

      // Upload to smart contract
      try {
        await contractIntegration.uploadFileToContract(ipfsHash, file.name, pricing);
        console.log('Contract upload successful');
      } catch (contractError) {
        console.error('Contract upload failed:', contractError);
        setError(`Smart contract upload failed: ${contractError.message || 'Unknown error'}`);
        return;
      }

      // Reset form on success
      setPricing({
        oneWeek: '',
        oneMonth: '',
        threeMonths: '',
        lifetime: ''
      });
      fileInputRef.current.value = '';
      alert('Upload successful!');
      
    } catch (error) {
      console.error('Upload failed:', error);
      setError(`Upload failed: ${error.message || 'Please try again'}`);
    } finally {
      setUploading(false);
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-8 rounded-lg shadow-md">
      {error && (
        <div className="w-full max-w-md mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Upload Section */}
      <div className="w-full max-w-md mb-8">
        <div className="border-4 border-dashed border-gray-400 p-8 flex flex-col items-center justify-center">
          <CloudUploadIcon className="h-16 w-16 text-blue-400 mb-4" />
          <p className="text-gray-600 text-lg mb-4">Drag & drop your files here</p>
          <button
            type="button"
            onClick={handleFileSelect}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={uploading}
          >
            Choose files from your computer
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={() => setError(null)}
          />
        </div>
      </div>

      {/* Pricing Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Pricing</h2>
        <div className="mb-4">
          <label className="block text-gray-700">1 Week</label>
          <input
            type="number"
            name="oneWeek"
            value={pricing.oneWeek}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            step="0.00000001"
            min="0"
            disabled={uploading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">1 Month</label>
          <input
            type="number"
            name="oneMonth"
            value={pricing.oneMonth}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            step="0.00000001"
            min="0"
            disabled={uploading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">3 Months</label>
          <input
            type="number"
            name="threeMonths"
            value={pricing.threeMonths}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            step="0.00000001"
            min="0"
            disabled={uploading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lifetime</label>
          <input
            type="number"
            name="lifetime"
            value={pricing.lifetime}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            step="0.00000001"
            min="0"
            disabled={uploading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Done'}
        </button>
      </form>
    </div>
  );
};

export default UploadFiles;