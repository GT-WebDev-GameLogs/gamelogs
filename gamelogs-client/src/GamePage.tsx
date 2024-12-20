import { useState } from 'react';
import GameBanner from './components/GameBanner';
import GameDescription from './components/GameDescription';
import Reviews from './components/Reviews';
import AddReview from './components/AddReview';

function App() {
  const [reviews, setReviews] = useState([
    { username: 'user1', time: '3 days ago', review: 'Loved the game!' },
    { username: 'user2', time: '1 week ago', review: 'Amazing experience.' },
    { username: 'user3', time: '5 days ago', review: 'A must-play for any gamer.' }
  ]);

  const addNewReview = (newReview: string) => {
    const newEntry = {
      username: 'newUser',
      time: 'just now',
      review: newReview
    };
    setReviews([newEntry, ...reviews]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <GameBanner />
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <GameDescription />
        <Reviews reviews={reviews} />
        <AddReview onAddReview={addNewReview} />
      </div>
    </div>
  );
}

export default App;