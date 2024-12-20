import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar.tsx'
import './index.css'
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router'
import App from './App.tsx'
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
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
  id: 'navbarlayout',
});

const indexRoute = createRoute({
  getParentRoute: () => navbarRoute,
  component: () => <App />,
  path: '/',
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => <Login />,
  path: '/login'
});

const gameRoute = createRoute({
  getParentRoute: () => navbarRoute,
  component: () => <GamePage />,
  path: '/name_game'
});

const userRoute = createRoute({
  getParentRoute: () => navbarRoute,
  component: () => <UserProfile />,
  path: '/profile'
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