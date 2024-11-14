import { useState } from 'react';

interface Review {
    title: string;
    date: string;
    description: string;
}

interface User {
    pfp: string;
    name: string;
    username: string;
    reviews: Review[];
    followers: number;
    following: number;
    description: string;
}

const reviews: Review[] = [
    { title: 'Game One', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Two', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Three', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Four', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Five', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Six', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Seven', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Eight', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Nine', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Game Ten', date: 'XX days/months/weeks ago', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
];

const user: User = {
    pfp: 'https://yt3.googleusercontent.com/xjLBdnHzQcr5SQyxwjAPJD6r6Z-pANaqnWJCJQ9sT9rY48hOv0F3EjmH9rQHJ392jC8QCbkU=s900-c-k-c0x00ffffff-no-rj',
    name: 'Zechariah Frierson',
    username: 'techolon',
    reviews: reviews,
    followers: 200,
    following: 132,
    description: 'descriptions are cool. if they get too long they start to disappear.',
};

export default function UserProfile() {
    const [isDescExpanded, setDescExpanded] = useState(false);

    const toggleDescExpand = () => {
        setDescExpanded(!isDescExpanded);
    }

    const [expandedReviews, setExpandedReviews] = useState<boolean[]>(Array(reviews.length).fill(false));

    const toggleIndexExpand = (index: number) => {
        setExpandedReviews(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className="">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mt-24 mb-16 mx-16">
                <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden">
                    <img src={user.pfp} alt="Profile Pic" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">Zechariah Frierson</h1>
                    <p className="text-gray-400">@{user.username} | {user.reviews.length} reviews | {user.followers} followers | {user.following} following</p>
                    <p>
                        {isDescExpanded ? user.description : user.description.slice(0, 60) + '...'}
                        <span className='items-baseline inline-flex ml-1'>
                            <button
                                onClick={toggleDescExpand}
                                className="show-more-button text-sm"
                            >
                                {isDescExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        </span>
                    </p>
                    <button className="mt-2 px-4 py-1 bg-[#2B1E5A] text-white rounded-md">Edit Profile</button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className='mx-16'>
                <h2 className="text-xl font-semibold mb-4 text-left text-white">All Reviews</h2>
                <hr className="border-t border-[#7C7C7C]" />
                <div>
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4 border-b border-[#7C7C7C]">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-red-500"></div>
                                <div>
                                    <h3 className="font-semibold">{review.title}</h3>
                                    <p className="text-gray-400 text-sm">{review.date}</p>
                                </div>
                            </div>
                            <p className="text-gray-300">
                                {expandedReviews[index] ? review.description : review.description.slice(0, 200) + '...'}
                            </p>
                            <button
                                onClick={() => toggleIndexExpand(index)}
                                className="show-more-button text-sm"
                            >
                                {expandedReviews[index] ? 'Show Less' : 'Show More'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
