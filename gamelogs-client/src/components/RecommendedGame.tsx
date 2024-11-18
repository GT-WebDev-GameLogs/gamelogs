import botw from '../assets/images/botw-featured.jpg';

const FeaturedGame = () => {
  return (
    <a href="/name_game">
      <div className="relative">
        <img
          src={botw}
          alt="Recommended Game"
          className="rounded-lg w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-4xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
          The Legend of Zelda: Breath of the Wild
        </div>
      </div>
    </a>
  );
};

export default FeaturedGame;
