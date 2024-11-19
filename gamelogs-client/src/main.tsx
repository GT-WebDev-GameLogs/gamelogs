import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar.tsx'
import './index.css'
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router'
import App from './temp/App.tsx' // change back at some point
import Login from './Login.tsx'
import GamePage from './GamePage.tsx'
import UserProfile from './UserProfile.tsx'
import Search from './Search.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* This is the main layout that applies to all pages,
        should contain globally common components, e.g. headers and footers,
        feel free to create a separate tsx file for the main layout
      */}
    </>
  )
});

const navbarRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: ({ route }) => (
    <>
      <Navbar route={route}/>
      <Outlet />
    </>
  ),
  id: 'navbarlayout',
  loader: async () => {
    const userId = await fetch('http://localhost:7776/auth-api/get-logged-in-user-info', {
      method: 'POST',
      credentials: 'include',
    });
    if (!userId.ok) {
      console.log('Not logged in');
      return undefined;
    }
    return await userId.json();
  },
});

const indexRoute = createRoute({
  getParentRoute: () => navbarRoute,
  component: ({ route }) => <App route={route} />,
  path: '/',
  loader: async () => {
    const gameCoverInfo = await fetch('http://localhost:7776/get-games-with-cover?limit=100', {
      method: 'GET',
      credentials: 'include',
    });
    if (!gameCoverInfo.ok) {
      console.log('Error geting game cover info');
      return undefined;
    }
    return await gameCoverInfo.json();
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => <Login />,
  path: '/login'
});

const gameRoute = createRoute({
  path: '/game/$gameId',
  getParentRoute: () => navbarRoute,
  component: ({ route }) => <GamePage route={route} />,
  loader: async ({ params }) => {
    const res = await fetch(`http://localhost:7776/get-game-info/${params.gameId}`)
    if (!res.ok) {
      throw new Error(`Failed to load game data for game ${params.gameId}`)
    }
    return await res.json();
  },
});

const userRoute = createRoute({
  getParentRoute: () => navbarRoute,
  component: ({ route }) => <UserProfile route={route}/>,
  path: '/profile/$userId',
  loader: async ({ params }) => {
    const res = await fetch(`http://localhost:7776/get-user-info/${params.userId}`);
    if (!res.ok) {
      throw new Error(`Failed to load user data for user ${params.userId}`)
    }
    return await res.json();
  }
});

const searchRoute = createRoute({
  getParentRoute: () => navbarRoute,
  component: () => <Search />,
  path: '/search'
});

const navbarRouteTree = navbarRoute.addChildren([ indexRoute, gameRoute, userRoute, searchRoute ]);
const routeTree = rootRoute.addChildren([ navbarRouteTree, loginRoute ]);
const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)