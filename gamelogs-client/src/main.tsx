import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createRootRoute, createRouter, RootRoute, RouterProvider } from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => <App/>
});

const routeTree: RootRoute = rootRoute;
const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
