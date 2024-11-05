const ActionButtons = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="bg-gray-700 text-white py-1 px-3 rounded">❤️</button>
          <button className="bg-gray-700 text-white py-1 px-3 rounded">Add to List</button>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 text-white py-1 px-3 rounded">
          New Review +
        </button>
      </div>
    );
  };
  
  export default ActionButtons;