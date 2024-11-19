import React, { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  date: string;
  thumbnail: string;
}
interface Game {
  id: number;
  title: string;
  logo: string;
  coverUrl?: string;
}
interface GameCategory {
  title: string;
  games: Game[];
}

const news: NewsItem[] = [
  { title: "News One", date: "xx/xx/xxxx", thumbnail: "#8D6ED7" },
  { title: "News Two", date: "xx/xx/xxxx", thumbnail: "#D76E6E" },
  { title: "News Three", date: "xx/xx/xxxx", thumbnail: "#6ED771" },
  { title: "News Four", date: "xx/xx/xxxx", thumbnail: "#D3D76E" },
  { title: "News Five", date: "xx/xx/xxxx", thumbnail: "#6EC7D7" },
  { title: "News Six", date: "xx/xx/xxxx", thumbnail: "#8D6ED7" },
];

const categories: GameCategory[] = [
  { title: "Top Rated", games: [] },
  { title: "Your List", games: [] },
  { title: "Relevant Genre 1", games: [] },
  { title: "Relevant Genre 2", games: [] },
  { title: "Relevant Genre 3", games: [] },
];

const cardHeight = "15vh";
const numRows = 4;

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:7776/api/games");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const fetchedGames: Game[] = await response.json();

        const validGames = fetchedGames.filter(
          (game) => game.coverUrl && game.coverUrl.trim() !== ""
        );

        if (validGames.length === 0) {
          setError("No valid game covers found.");
        } else {
          setGames(validGames);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to fetch games. Please try again later.");
      }
    };
    fetchGames();
  }, []);

  // Distribute games for each category
  const categoryGames = categories.map((category, index) => ({
    ...category,
    games: games.slice(index * 5, (index + 1) * 5).concat(games), // Repeat to allow sliding
  }));

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-black">
      <main className="h-full">
        {/* Hero Section */}
        <section className="relative h-3/5 my-16">
          <div
            className="absolute inset-0 bg-black opacity-50 z-30 w-full -mt-4"
            style={{ height: "120%" }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-50">
            <h1 className="text-9xl font-black text-white">GameLogs</h1>
          </div>

          {/* Moving Rows of Games */}
          <div className="relative w-full h-full flex flex-col gap-4 z-0 justify-start">
            {error ? (
              <p className="text-center text-white">{error}</p>
            ) : (
              Array.from({ length: numRows }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex gap-4 ${
                    rowIndex % 2 === 0
                      ? "animate-scroll-right"
                      : "animate-scroll-left"
                  }`}
                  style={{ width: "200%" }}
                >
                  {games
                    .concat(...games)
                    .slice(rowIndex * 10, rowIndex * 10 + 10) // Unique games per row
                    .map((game, idx) => (
                      <div
                        key={game.id || idx}
                        className="py-2 px-4 rounded-lg"
                        style={{
                          minWidth: `calc(3/2 * ${cardHeight})`,
                          height: cardHeight,
                          backgroundImage: `url(${game.coverUrl || "https://via.placeholder.com/200"})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="flex flex-col justify-end h-full">
                          <h3 className="text-xs font-regular flex justify-between items-end text-white">
                            <span>{game.title}</span>
                            <span>{game.logo}</span>
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>
        </section>

        {/* News Section */}
        <section className="p-4">
          <div>
            <h2 className="text-2xl font-semibold my-4">Latest News</h2>
            <div className="flex gap-4 overflow-x-auto w-full">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="h-64 py-3 px-5 rounded-lg mr-4"
                  style={{ minWidth: "25rem", backgroundColor: item.thumbnail }}
                >
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

        {/* Recommended Games Section */}
        <section className="mb-8 p-4">
          <div>
            <h2 className="text-2xl font-semibold my-4 text-left text-white">
              Recommended Games
            </h2>
            {categoryGames.map((category, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <div className="flex gap-4 overflow-x-auto w-full">
                  {category.games.map((game, idx) => (
                    <div
                      key={game.id || idx}
                      className="h-36 py-2 px-4 rounded-lg"
                      style={{
                        minWidth: "14rem",
                        backgroundImage: `url(${game.coverUrl || "https://via.placeholder.com/200"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="flex flex-col justify-end h-full text-white">
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
  );
}

export default App;
