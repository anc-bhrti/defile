import { CloudUploadIcon, CheckCircleIcon, XIcon } from '@heroicons/react/solid';

const Upload = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-8 rounded-lg shadow-md">
      {/* Upload Section */}
      <div className="w-full max-w-md">
        <div className="bg-blue-100 border-4 border-dashed border-blue-400 rounded-lg p-8 flex flex-col items-center justify-center">
          <CloudUploadIcon className="h-16 w-16 text-blue-400 mb-4" />
          <p className="text-gray-600 text-lg mb-4">Drag & drop your files here</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Choose files from your computer
          </button>
        </div>
      </div>

      {/* Upload Progress */}
      <div className="mt-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CloudUploadIcon className="h-6 w-6 text-blue-400 mr-2" />
            <p className="text-gray-800">Summer-vibes.mp3</p>
          </div>
          <XIcon className="h-6 w-6 text-red-400 cursor-pointer" />
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-2.5">
          <div className="absolute top-0 left-0 h-2.5 bg-blue-500 rounded-full" style={{ width: '69%' }}></div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <p>69%</p>
          <p>3.5 MB / 5 MB</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
            <p className="text-gray-800">Summer-vibes.jpeg</p>
          </div>
          <p className="text-sm text-gray-500">500 kb</p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
