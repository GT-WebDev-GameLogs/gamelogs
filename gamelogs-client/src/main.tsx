import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import './index.css'
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router'
import Login from './pages/login/Login.tsx'
import Game from './Game.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      {/* This is the main layout that applies to all pages,
        should contain globally common components, e.g. headers and footers,
        feel free to create a separate tsx file for the main layout
      */}
    </>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => <App />,
  path: '/'
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    component: () => <Login />,
    path: '/login'
});

const gameRoute = createRoute({
    getParentRoute: () => rootRoute,
    component: () => <Game />,
    path: '/game'
})

const routeTree = rootRoute.addChildren([ indexRoute, loginRoute, gameRoute ]);
const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
