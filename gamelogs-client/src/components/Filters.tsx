import React, { useState } from 'react';

const Filters = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handlePublisherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPublisher(e.target.value);
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex gap-4 flex-grow">
        <div className="relative flex-grow">
          <select
            className="w-full px-2 py-2 bg-gray-800 text-white rounded flex flex-col appearance-none pr-8"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">Genres</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>RPG</option>
            <option>Strategy</option>
            <option>Sports</option>
            <option>Simulation</option>
            <option>Racing</option>
            <option>MMORPG</option>
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
  
        <div className="relative flex-grow">
          <select
            className="w-full px-2 py-2 bg-gray-800 text-white rounded flex flex-col appearance-none pr-8"
            value={selectedPlatform}
            onChange={handlePlatformChange}
          >
            <option value="">Platforms</option>
            <option>PC</option>
            <option>PlayStation</option>
            <option>Xbox</option>
            <option>Switch</option>
            <option>Mobile</option>
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
  
        <div className="relative flex-grow">
          <select
            className="w-full px-2 py-2 bg-gray-800 text-white rounded flex flex-col appearance-none pr-8"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Year</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
  
        <div className="relative flex-grow">
          <select
            className="w-full px-2 py-2 bg-gray-800 text-white rounded flex flex-col appearance-none pr-8"
            value={selectedPublisher}
            onChange={handlePublisherChange}
          >
            <option value="">Publisher</option>
            <option>EA</option>
            <option>Ubisoft</option>
            <option>Activision</option>
            <option>Take-Two</option>
            <option>CD Projekt Red</option>
            <option>Bandai Namco</option>
            <option>Nintendo</option>
            <option>Sony</option>
            <option>Microsoft</option>
            <option>Sega</option>
            <option>Capcom</option>
            <option>Valve</option>
            <option>Rockstar</option>
            <option>Blizzard</option>
            <option>Square Enix</option>
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        <div className="relative flex-grow">
          <input
            type="text"
            className="px-3 py-2 pl-10 bg-gray-800 text-white rounded flex-col w-full"
            placeholder="Search..."
          />
          <span className="absolute mt-2.5 left-3 text-gray-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35" 
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex gap-2 justify-end ml-4">
        {selectedGenre && <span className="bg-red-500 text-white px-3 py-1 rounded whitespace-nowrap">{selectedGenre}</span>}
        {selectedPlatform && <span className="bg-green-500 text-white px-3 py-1 rounded whitespace-nowrap">{selectedPlatform}</span>}
        {selectedYear && <span className="bg-blue-500 text-white px-3 py-1 rounded whitespace-nowrap">{selectedYear}</span>}
        {selectedPublisher && <span className="bg-yellow-500 text-white px-3 py-1 rounded whitespace-nowrap">{selectedPublisher}</span>}
      </div>
    </div>
  );
};

export default Filters;