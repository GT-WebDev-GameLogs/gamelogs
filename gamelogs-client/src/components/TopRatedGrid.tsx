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

const TopRatedGrid = () => {
    return (
        <div className="grid grid-cols-5 gap-4 w-full mb-24">
            {games.map((game, idx) => (
                <div key={idx} className="relative pb-[66.67%] rounded-lg" style={{ backgroundColor: game.thumbnail }}>
                    <div className="absolute inset-0 flex flex-col justify-end px-4 py-2">
                        <h3 className="text-md font-regular flex justify-between">
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
