import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router'

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

const routeTree = rootRoute.addChildren([ indexRoute ]);
const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
