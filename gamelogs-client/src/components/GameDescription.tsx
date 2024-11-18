import React, { useState } from 'react';

const GameDescription = ({ description, rating }: { description: any, rating: any }) => {
  // const sampleDescription = `The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U. Set at the end of the Zelda timeline, the player controls an amnesiac Link as he sets out to save Princess Zelda and prevent Calamity Ganon. The game offers an open world with a focus on exploration and freedom. Players can tackle objectives in any order, using a variety of weapons, abilities, and strategies. It's a groundbreaking title that redefined open-world gameplay and received critical acclaim for its innovation.`;
  const fullDescription = description;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">The Legend of Zelda: Breath of the Wild</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="bg-gray-700 text-white py-1 px-3 rounded">❤️</button>
          <button className="bg-gray-700 text-white py-1 px-3 rounded">Add to List</button>
        </div>
        <div className="flex justify-end">

          <button className="bg-gray-700 text-white py-1 px-3 rounded">Add New Review +</button>
        </div>
      </div>
      <p className={`text-left ${isExpanded ? '' : 'max-h-24 overflow-hidden'}`}>
        {fullDescription}
      </p>
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="mt-4 bg-gray-800 hover:bg-purple-500 text-white px-1 rounded text-sm"
      >
        {isExpanded ? 'Show Less...' : 'Show More...'}
      </button>
    </div>
  );
};

export default GameDescription;