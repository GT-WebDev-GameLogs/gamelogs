import { useState } from 'react';

const AddReview = ({ onAddReview }: { onAddReview: (newReview: string) => void }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review.trim()) {
      onAddReview(review);
      setReview('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
          placeholder="Write your review..."
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          rows={4}
        />
        <button 
          type="submit" 
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;