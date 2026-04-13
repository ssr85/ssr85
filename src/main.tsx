import { ViteReactSSG } from 'vite-react-ssg'
import App, { routes } from "./App.tsx";
import "./index.css";

// This will handle both client-side rendering and static site generation
export const createRoot = ViteReactSSG(
  {
    routes: [
      {
        path: '/',
        Component: App,
        children: routes
      }
    ],
  }
);
