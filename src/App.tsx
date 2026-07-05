import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React, { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { Analytics } from "@vercel/analytics/react";

const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));

import { caseStudies } from "./data/content";

// Expand case study routes for SSG pre-rendering (only those with full pages)
const caseStudyRoutes = caseStudies
  .filter((cs) => cs.hasDetailPage && cs.slug)
  .map((cs) => ({
    path: `/case-studies/${cs.slug}`,
    element: <CaseStudyDetail />,
  }));

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  ...caseStudyRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="app-content">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Outlet />
            </Suspense>
          </div>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
