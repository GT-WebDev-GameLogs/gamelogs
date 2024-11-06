import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import './index.css'
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router'
import Login from './Login.tsx'

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
  path: '*'
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

const navbarRouteTree = navbarRoute.addChildren([ indexRoute ]);
const routeTree = rootRoute.addChildren([ navbarRouteTree, loginRoute ]);
const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)