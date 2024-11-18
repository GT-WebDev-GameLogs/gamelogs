const GameBanner = ({ name }: { name: string }) => {
    return (
      <div className="relative w-full">
        <img 
          src="https://example.com/zelda-banner.jpg" 
          alt="Game Banner" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">
            { name }
          </h1>
        </div>
      </div>
    );
  };
  
  export default GameBanner;