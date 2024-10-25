import React, { useState } from 'react';
import { CloudUploadIcon, XIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { pinata } from '../utils/config';

const Upload = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    await uploadFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    await uploadFiles(selectedFiles);
  };

  const uploadFiles = async (filesToUpload) => {
    const newFiles = filesToUpload.map((file) => ({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
      loaded: '0 MB',
    }));
    
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    for (const file of filesToUpload) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await pinata.pinFileToIPFS(formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.name === file.name ? { ...f, progress, loaded: `${(progressEvent.loaded / 1024 / 1024).toFixed(2)} MB` } : f
              )
            );
          },
        });

        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.name === file.name ? { ...f, status: 'completed', progress: 100 } : f
          )
        );
        console.log('File uploaded:', response);
      } catch (error) {
        console.error('Error uploading file:', error);
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.name === file.name ? { ...f, status: 'error' } : f
          )
        );
      }
    }
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-8 rounded-lg shadow-md">
      {/* Upload Section */}
      <div className="w-full max-w-md">
        <div 
          className="bg-blue-100 border-4 border-dashed border-blue-400 rounded-lg p-8 flex flex-col items-center justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CloudUploadIcon className="h-16 w-16 text-blue-400 mb-4" />
          <p className="text-gray-600 text-lg mb-4">Drag & drop your files here</p>
          <label className="cursor-pointer">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
              Choose files from your computer
            </span>
            <input type="file" className="hidden" multiple onChange={handleFileChange} />
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      <div className="mt-8 w-full max-w-md">
        {files.map(file => (
          <div key={file.name} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {file.status === 'completed' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
                ) : (
                  <CloudUploadIcon className="h-6 w-6 text-blue-400 mr-2" />
                )}
                <p className="text-gray-800">{file.name}</p>
              </div>
              {file.status === 'uploading' && (
                <button onClick={() => removeFile(file.name)}>
                  <XIcon className="h-6 w-6 text-red-400 cursor-pointer" />
                </button>
              )}
            </div>

            {file.status === 'uploading' && (
              <>
                <div className="relative w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="absolute top-0 left-0 h-2.5 bg-blue-500 rounded-full transition-all duration-300" 
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                  <p>{file.progress}%</p>
                  <p>{file.loaded} / {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </>
            )}

            {file.status === 'completed' && (
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
