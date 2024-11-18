import Filters from "./components/Filters";
import RecommendedGame from "./components/RecommendedGame";
import TopRatedGrid from "./components/TopRatedGrid";

export default function Search() {
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <div className="w-screen text-white mt-24 px-10">
                <Filters />
                <h2 className="text-2xl font-semibold text-left text-white mt-4">Recommended Game</h2>
                <div className="hover:outline hover:outline-white hover:rounded-lg hover:outline-3">
                    <RecommendedGame />
                </div>
                <h2 className="text-2xl font-semibold my-4 text-left text-white">Top Rated</h2>
                <TopRatedGrid />
            </div>
        </div>
    );
};