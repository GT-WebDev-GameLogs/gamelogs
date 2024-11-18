interface Game {
    title: string;
    logo: string;
    thumbnail: string;
}

const games: Game[] = [
    { title: 'Game One', logo: 'logo', thumbnail: '#8D6ED7' },
    { title: 'Game Two', logo: 'logo', thumbnail: '#D3D76E' },
    { title: 'Game Three', logo: 'logo', thumbnail: '#6EC7D7' },
    { title: 'Game Four', logo: 'logo', thumbnail: '#6ED771' },
    { title: 'Game Five', logo: 'logo', thumbnail: '#D76E6E' },
];

const cardHeight = '165px';

const TopRatedGrid = () => {
    return (
        <div className="grid grid-cols-5 gap-4 w-full mb-24">
            {games.map((game, idx) => (
                <div key={idx} className="py-2 px-4 rounded-lg" style={{ minWidth: `calc(1.5 * ${cardHeight})`, height: cardHeight, backgroundColor: game.thumbnail }}>
                    <div className="flex flex-col justify-end h-full">
                        <h3 className="text-md font-regular flex justify-between items-end">
                        <span>{game.title}</span>
                        <span>{game.logo}</span>
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopRatedGrid;
