import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const Home = () => {
  const cardData = [
    { image: 'path/to/image1.jpg' },
    { image: 'path/to/image2.jpg' },
    { image: 'path/to/image3.jpg' },
    { image: 'path/to/image4.jpg' },
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

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardData.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <img src={card.image} alt={`Image ${index + 1}`} className="h-32 w-full object-cover rounded-lg mb-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
