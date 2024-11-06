import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router'
import GamePage from './GamePage.tsx'

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

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => <App />,
  path: '/'
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => <GamePage />,
  path: '/name_game'
});

const routeTree = rootRoute.addChildren([ indexRoute, gameRoute]);
const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
