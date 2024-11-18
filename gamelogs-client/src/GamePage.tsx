import { useState } from 'react';
import GameBanner from './components/GameBanner';
import GameDescription from './components/GameDescription';
import Reviews from './components/Reviews';
import AddReview from './components/AddReview';
import { useLoaderData } from '@tanstack/react-router';

interface GameInfo {
  name: string,
  description: string,
  rating: number,
}

interface Review {
  username: string,
  time: string,
  review: string,
  rating: number,
}

function App({ route }: { route: any }) {
  let gameInfo: GameInfo;
  let baseReviews: Review[];
  try {
    const gameData = useLoaderData({ from: route });
    const baseGameData = gameData['base'][0];
    console.log(gameData);
    gameInfo = {
      name: baseGameData['game_name'],
      description: baseGameData['game_description'],
      rating: baseGameData['rating'],
    };
    baseReviews = gameData['reviews'].map((review: any) => {
      return {
        username: review['user_name'],
        time: review['review_date'],
        review: review['review_description'],
        rating: review['rating'],
      }
    });
  } catch (e) {
    gameInfo = {
      name: 'The Legend of Zelda: Breath of the Wild',
      description: `The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U. Set at the end of the Zelda timeline, the player controls an amnesiac Link as he sets out to save Princess Zelda and prevent Calamity Ganon. The game offers an open world with a focus on exploration and freedom. Players can tackle objectives in any order, using a variety of weapons, abilities, and strategies. It's a groundbreaking title that redefined open-world gameplay and received critical acclaim for its innovation.`,
      rating: 5,
    }
    baseReviews = [
      { username: 'user1', time: '3 days ago', review: 'Loved the game!', rating: 5},
      { username: 'user2', time: '1 week ago', review: 'Amazing experience.', rating: 4 },
      { username: 'user3', time: '5 days ago', review: 'A must-play for any gamer.', rating: 5 }
    ]
    console.log(e);
  }
  const [reviews, setReviews] = useState<Review[]>(baseReviews);
  const addNewReview = (newReview: string) => {
    const newEntry = {
      username: 'newUser',
      time: 'just now',
      review: newReview,
      rating: 5,
    };
    setReviews([newEntry, ...reviews]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <GameBanner name={gameInfo.name} />
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <GameDescription {...gameInfo} />
        <Reviews reviews={reviews} />
        <AddReview onAddReview={addNewReview} />
      </div>
    </div>
  );
}

export default App;