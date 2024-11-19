import React, { useEffect, useState } from "react";
import axios from "axios";

const GameCovers = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    // Fetch game data from the backend
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:7776/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="game-covers">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img
            src={game.coverUrl || "https://via.placeholder.com/150"} // Placeholder for missing covers
            alt={game.name}
            className="game-cover"
          />
          <p>{game.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GameCovers;
