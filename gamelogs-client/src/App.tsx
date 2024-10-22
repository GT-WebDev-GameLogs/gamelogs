interface NewsItem {
  title: string;
  date: string;
  thumbnail: string;
}
interface Game {
  title: string;
  logo: string;
  thumbnail: string;
}
interface GameCategory {
  title: string;
  games: Game[];
}

const news: NewsItem[] = [
  { title: 'News One', date: 'xx/xx/xxxx', thumbnail: '#8D6ED7'},
  { title: 'News Two', date: 'xx/xx/xxxx', thumbnail: '#D76E6E' },
  { title: 'News Three', date: 'xx/xx/xxxx', thumbnail: '#6ED771' },
  { title: 'News Four', date: 'xx/xx/xxxx', thumbnail: '#D3D76E' },
  { title: 'News Five', date: 'xx/xx/xxxx', thumbnail: '#6EC7D7' },
  { title: 'News Six', date: 'xx/xx/xxxx', thumbnail: '#8D6ED7' },
];

const games: Game[] = [
  { title: 'Game One', logo: 'logo', thumbnail: '#8D6ED7' },
  { title: 'Game Two', logo: 'logo', thumbnail: '#D3D76E' },
  { title: 'Game Three', logo: 'logo', thumbnail: '#6EC7D7' },
  { title: 'Game Four', logo: 'logo', thumbnail: '#6ED771' },
  { title: 'Game Five', logo: 'logo', thumbnail: '#D76E6E' },
  { title: 'Game Six', logo: 'logo', thumbnail: '#8D6ED7' },
  { title: 'Game Seven', logo: 'logo', thumbnail: '#D3D76E' },
  { title: 'Game Eight', logo: 'logo', thumbnail: '#6EC7D7' },
  { title: 'Game Nine', logo: 'logo', thumbnail: '#6ED771' },
  { title: 'Game Ten', logo: 'logo', thumbnail: '#D76E6E' },
];

const categories: GameCategory[] = [
  {
    title: 'Top Rated',
    games: games,
  },
  {
    title: 'Your List',
    games: games,
  },
  {
    title: 'Relevant Genre 1',
    games: games,
  },
  {
    title: 'Relevant Genre 2',
    games: games,
  },
  {
    title: 'Relevant Genre 3',
    games: games,
  },
];

function App() {
  return (  
    <div className="w-screen h-screen overflow-x-hidden">
      <main className="h-full">
        
        {/*Hero Section*/}
        <section className="relative h-4/5">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <h1 className="text-9xl font-black text-white">GameLogs</h1>
          </div>
            <div className="absolute top-0 w-full h-full flex flex-col gap-6 z-0 justify-center">
              <div className="flex gap-4 animate-scroll-right">
                {[...games, ...games].map((game, idx) => (
                  <div key={idx} className="h-36 py-2 px-4 rounded-lg" style={{ minWidth: '14rem', backgroundColor: game.thumbnail }}>
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-md font-regular flex justify-between">
                        <span>{game.title}</span>
                        <span>{game.logo}</span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 animate-scroll-left">
                {[...games, ...games].map((game, idx) => (
                  <div key={idx} className="h-36 py-2 px-4 rounded-lg" style={{ minWidth: '14rem', backgroundColor: game.thumbnail }}>
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-md font-regular flex justify-between">
                        <span>{game.title}</span>
                        <span>{game.logo}</span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 animate-scroll-right">
                {[...games, ...games].map((game, idx) => (
                  <div key={idx} className="h-36 py-2 px-4 rounded-lg" style={{ minWidth: '14rem', backgroundColor: game.thumbnail }}>
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-md font-regular flex justify-between">
                        <span>{game.title}</span>
                        <span>{game.logo}</span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 animate-scroll-left">
                {[...games, ...games].map((game, idx) => (
                  <div key={idx} className="h-36 py-2 px-4 rounded-lg" style={{ minWidth: '14rem', backgroundColor: game.thumbnail }}>
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-md font-regular flex justify-between">
                        <span>{game.title}</span>
                        <span>{game.logo}</span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>

        {/*News Section*/}
        <section className="mb-8 p-4">
          <div>
            <h2 className="text-2xl font-medium mb-4">Latest News</h2>
              <div className="flex gap-4 overflow-x-auto w-full">
                {news.map((item, index) => (
                  <div key={index} className="h-64 py-3 px-5 rounded-lg mr-4" style={{ minWidth: '25rem', backgroundColor: item.thumbnail }}>
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-xl font-regular flex justify-between">
                        <span>{item.title}</span>
                        <span>{item.date}</span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </section>

        {/*Recommended Games Section*/}
        <section className="mb-8 p-4">
          <div>
            <h2 className="text-2xl font-medium mb-4">Recommended Games</h2>
            {categories.map((category, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <div className="flex gap-4 overflow-x-auto w-full">
                  {category.games.map((game, idx) => (
                    <div key={idx} className="h-36 py-2 px-4 rounded-lg" style={{ minWidth: '14rem', backgroundColor: game.thumbnail }}>
                      <div className="flex flex-col justify-end h-full">
                        <h3 className="text-md font-regular flex justify-between">
                          <span>{game.title}</span>
                          <span>{game.logo}</span>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App;