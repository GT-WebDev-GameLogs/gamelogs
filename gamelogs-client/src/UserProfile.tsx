export default function UserProfile() {
  return (  
    <div className="w-screen h-screen overflow-x-hidden">
          <div className="flex flex-col items-center">
              <div className="w-full h-64 flex justify-left items-center py-40 px-20">
                  <img
                      className="rounded-full h-32 w-32 object-cover"
                      src="https://via.placeholder.com/150"
                      alt="Profile"
                  />
              </div>
              <div className="mt-4 text-center">
                  <h2 className="text-2xl font-semibold">Username</h2>
                  <p className="text-gray-600">@username</p>
              </div>
              <div className="mt-4 flex justify-around w-full border-t border-b py-4">
                  <div className="text-center">
                      <span className="font-semibold">100</span>
                      <p className="text-gray-600">Posts</p>
                  </div>
                  <div className="text-center">
                      <span className="font-semibold">250</span>
                      <p className="text-gray-600">Followers</p>
                  </div>
                  <div className="text-center">
                      <span className="font-semibold">180</span>
                      <p className="text-gray-600">Following</p>
                  </div>
              </div>
          </div>
      </div>
  )
}