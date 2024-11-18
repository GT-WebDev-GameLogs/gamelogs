const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full px-4 py-2 text-white z-50 bg-black">
            <div className="w-full flex justify-between items-center">
            <h1 className="pl-5 text-lg font-bold">
                <a href="/">GameLogs</a>
            </h1>
            <div className="relative pr-5 flex space-x-4">
                <div className="flex items-center">
                    <a href="/search">Search</a>
                </div>
                <div className="flex items-center">
                    <a href="/login">Log In</a>
                </div>
                <form action="/profile">
                  <button className="flex items-center space-x-2">
                    Sign Up
                  </button>
                </form>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;