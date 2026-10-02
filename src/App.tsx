import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React, { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { Analytics } from "@vercel/analytics/react";

import { UnifiedActionDock } from "@/components/UnifiedActionDock";

const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const ScopeEstimator = lazy(() => import("./pages/ScopeEstimator"));

// Core Pillars
const AiWordPressDevelopment = lazy(() => import("./pages/AiWordPressDevelopment"));
const CustomAiSolutions = lazy(() => import("./pages/CustomAiSolutions"));
const CustomBusinessAutomation = lazy(() => import("./pages/CustomBusinessAutomation"));
const N8nWorkflows = lazy(() => import("./pages/N8nWorkflows"));

// Deep Cluster Insight Guides
const AiWordPressPlugins = lazy(() => import("./pages/insights/AiWordPressPlugins"));
const AutomatedSearchAnalytics = lazy(() => import("./pages/insights/AutomatedSearchAnalytics"));
const LocalLlmStudio = lazy(() => import("./pages/insights/LocalLlmStudio"));
const MultiAgentSystems = lazy(() => import("./pages/insights/MultiAgentSystems"));
const CustomSessionEngines = lazy(() => import("./pages/insights/CustomSessionEngines"));
const CustomCrmSync = lazy(() => import("./pages/insights/CustomCrmSync"));
const SheetsAppsScript = lazy(() => import("./pages/insights/SheetsAppsScript"));
const HeadlessWordPressVite = lazy(() => import("./pages/insights/HeadlessWordPressVite"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

import { ScrollRestoration } from "@/components/ScrollRestoration";

import { caseStudies } from "./data/content";

// Expand case study routes for SSG pre-rendering (only those with full pages)
const caseStudyRoutes = caseStudies
  .filter((cs) => cs.hasDetailPage && cs.slug)
  .map((cs) => ({
    path: `/case-studies/${cs.slug}`,
    element: <CaseStudyDetail slug={cs.slug} />,
  }));

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  // Pillars & High-Intent Services
  {
    path: "/ai-wordpress-development",
    element: <AiWordPressDevelopment />,
  },
  {
    path: "/custom-ai-solutions",
    element: <CustomAiSolutions />,
  },
  {
    path: "/custom-business-automation",
    element: <CustomBusinessAutomation />,
  },
  {
    path: "/n8n-workflows",
    element: <N8nWorkflows />,
  },
  // Insights / Cluster Guides
  {
    path: "/insights/ai-wordpress-plugin-development",
    element: <AiWordPressPlugins />,
  },
  {
    path: "/insights/automated-search-analytics-reporting",
    element: <AutomatedSearchAnalytics />,
  },
  {
    path: "/insights/local-llm-lm-studio-workflow",
    element: <LocalLlmStudio />,
  },
  {
    path: "/insights/multi-agent-orchestration-from-scratch",
    element: <MultiAgentSystems />,
  },
  {
    path: "/insights/custom-session-storage-engines",
    element: <CustomSessionEngines />,
  },
  {
    path: "/insights/custom-crm-sync-engines",
    element: <CustomCrmSync />,
  },
  {
    path: "/insights/google-sheets-apps-script-enterprise",
    element: <SheetsAppsScript />,
  },
  {
    path: "/insights/headless-wordpress-vite-architecture",
    element: <HeadlessWordPressVite />,
  },
  {
    path: "/tools/architecture-scope-estimator",
    element: <ScopeEstimator />,
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
          <ScrollRestoration />
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
          <UnifiedActionDock />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
