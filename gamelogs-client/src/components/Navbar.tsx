const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full p-4 text-white z-10">
            <div className="w-full flex justify-between items-center">
                <h1 className="pl-5 text-lg font-bold">
                    <a href="/">GameLogs</a>
                </h1>
                <div className="relative pr-5">
                    <button className="flex items-center space-x-2 hover:underline">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;