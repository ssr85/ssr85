import React, { useEffect } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Bot,
  Code2,
  Zap,
  Layers,
  FileText,
  Search,
  Sparkles,
  PhoneCall,
  Laptop,
  Database,
  ArrowRight,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { useTheme } from "next-themes";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenLeadModal?: () => void;
}

export const CommandMenu = ({
  open,
  onOpenChange,
  onOpenLeadModal,
}: CommandMenuProps) => {
  const { setTheme, theme } = useTheme();

  // Listen for Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = (callback: () => void) => {
    onOpenChange(false);
    callback();
  };

  const navigateTo = (url: string) => {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command, search services, insights, or architecture..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Core Pillars */}
        <CommandGroup heading="Engineering Pillars">
          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/custom-ai-solutions"))}
            className="flex items-center gap-2.5"
          >
            <Bot className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">Custom AI Solutions</span>
              <span className="text-[10px] text-muted-foreground">Multi-agent systems, local LLMs & scrapers</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/ai-wordpress-development"))}
            className="flex items-center gap-2.5"
          >
            <Code2 className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">AI WordPress Engineering</span>
              <span className="text-[10px] text-muted-foreground">Bespoke plugins from scratch & headless React</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/n8n-workflows"))}
            className="flex items-center gap-2.5"
          >
            <Workflow className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">n8n Workflow Automation</span>
              <span className="text-[10px] text-muted-foreground">Top 10 startup workflows & self-hosted setups</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/custom-business-automation"))}
            className="flex items-center gap-2.5"
          >
            <Zap className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">Custom Business Automation</span>
              <span className="text-[10px] text-muted-foreground">Stateful CRM sync & Google Apps Script</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Commercial Insights & Architecture Services */}
        <CommandGroup heading="Technical Insights & Solutions">
          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/multi-agent-orchestration-from-scratch"))}
            className="flex items-center gap-2.5"
          >
            <Layers className="w-4 h-4 text-blue-500" />
            <span>Multi-Agent Orchestration from Scratch</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/local-llm-lm-studio-workflow"))}
            className="flex items-center gap-2.5"
          >
            <Laptop className="w-4 h-4 text-success" />
            <span>Local LLMs & LM Studio (Zero Token Costs)</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/custom-session-storage-engines"))}
            className="flex items-center gap-2.5"
          >
            <Database className="w-4 h-4 text-purple-500" />
            <span>High-Velocity Scraping & Custom Session Engines</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/ai-wordpress-plugin-development"))}
            className="flex items-center gap-2.5"
          >
            <Code2 className="w-4 h-4 text-primary" />
            <span>Custom AI WordPress Plugin Development</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/headless-wordpress-vite-architecture"))}
            className="flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Headless WordPress + Vite Architecture</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/automated-search-analytics-reporting"))}
            className="flex items-center gap-2.5"
          >
            <TrendingUp className="w-4 h-4 text-cyan-500" />
            <span>Automated Search Console Analytics & Alerts</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/custom-crm-sync-engines"))}
            className="flex items-center gap-2.5"
          >
            <Zap className="w-4 h-4 text-rose-500" />
            <span>Two-Way CRM Synchronization Engines</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/insights/google-sheets-apps-script-enterprise"))}
            className="flex items-center gap-2.5"
          >
            <FileText className="w-4 h-4 text-success" />
            <span>Enterprise Google Sheets & Apps Script ERP</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Case Studies */}
        <CommandGroup heading="Case Studies">
          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/case-studies/lead-og"))}
            className="flex items-center gap-2.5"
          >
            <Database className="w-4 h-4 text-primary" />
            <span>Lead OG: High-Speed B2B Data & Caching Engine</span>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/case-studies/linked-in"))}
            className="flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>LinkedIn Viral Growth & Content Pipeline</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Actions">
          {onOpenLeadModal && (
            <CommandItem
              onSelect={() => handleSelect(onOpenLeadModal)}
              className="flex items-center gap-2.5 text-primary font-bold"
            >
              <PhoneCall className="w-4 h-4 text-primary" />
              <span>Book Strategy Consultation / Request Scope</span>
            </CommandItem>
          )}

          <CommandItem
            onSelect={() => handleSelect(() => navigateTo("/resume"))}
            className="flex items-center gap-2.5"
          >
            <FileText className="w-4 h-4" />
            <span>View Executive Interactive Resume</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => setTheme(theme === "dark" ? "light" : "dark"))
            }
            className="flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Toggle Dark / Light Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
