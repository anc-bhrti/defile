import { CloudUploadIcon } from '@heroicons/react/outline';
import { useState, useRef } from 'react';

const Upload = () => {
  const [pricing, setPricing] = useState({
    oneWeek: '',
    oneMonth: '',
    threeMonths: '',
    lifetime: ''
  });

  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricing({ ...pricing, [name]: value });
  };

  const handleFileSelect = () => {
    fileInputRef.current.click(); // Programmatically click the file input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pricing submitted:', pricing);
    // Handle the form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-8 rounded-lg shadow-md">
      {/* Upload Section */}
      <div className="w-full max-w-md mb-8">
        <div className="border-4 border-black-400 p-8 flex flex-col items-center justify-center">
          <CloudUploadIcon className="h-16 w-16 text-blue-400 mb-4" />
          <p className="text-gray-600 text-lg mb-4">Drag & drop your files here</p>
          <button 
            type="button"
            onClick={handleFileSelect} // Trigger file selection on click
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Choose files from your computer
          </button>
          <input
            type="file"
            ref={fileInputRef} // Attach the reference to the input
            className="hidden"
            multiple // Allows multiple file selection
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
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default Upload;
