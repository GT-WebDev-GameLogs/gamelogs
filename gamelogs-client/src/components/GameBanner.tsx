const GameBanner = ({ name, coverImage }: { name: string, coverImage: string }) => {
  const sampleSource = "https://example.com/zelda-banner.jpg"
  const imgsrc = `https://images.igdb.com/igdb/image/upload/t_720p/${coverImage}.jpg`
    return (
      <div className="relative w-full">
        <img 
          src={imgsrc}
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