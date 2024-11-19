import React, { useState } from 'react';

const Reviews = ({ reviews }: { reviews: Array<{ userId: string, userPfp: string, username: string, time: string, review: string }> }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Latest Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 mb-4 flex items-start">
          <div className="mr-4">
            <img src={review.userPfp} alt={`${review.username}'s avatar`} className="w-10 h-10 rounded-full" />
          </div>
          <div>
            <p><strong><a href={`/profile/${review.userId}`}>{review.username}</a></strong> - {review.time}</p>
            <p>{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;