import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Calculator,
  Mail,
} from "lucide-react";

export const SheetsAppsScript = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Google Sheets ERP Systems & Apps Script Automation Engine"
        description="Transform Google Sheets into a secure business ERP: automated PDF invoice generation, multi-tier approvals, and bi-directional CRM REST API webhooks."
        keywords={[
          "google sheets erp systems",
          "google apps script automation",
          "google sheets automated workflows",
          "google sheets invoice generator script",
          "apps script automation consultant",
          "automated quote generation sheets",
          "google sheets cr m api integration",
        ]}
        url="https://sarabjeetrattan.com/insights/google-sheets-apps-script-enterprise"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/custom-business-automation" className="text-primary hover:underline">
              Business Automation
            </Link>
            <span>/</span>
            <span>Commercial Solution</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Spreadsheet Engineering • Operational Systems
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Enterprise Google Apps Script & Sheets-as-an-ERP Systems
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Stop losing days to manual data entry and broken formulas. We transform standard Google Sheets into automated operational engines capable of generating PDF quotes, routing manager approvals, and synchronizing with external databases.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Spreadsheet Automation
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* 1. THE PROBLEM */}
          <section id="spreadsheet-operational-bottlenecks" className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> The Business Problem
            </div>
            <h2 id="hidden-costs-of-manual-spreadsheets" className="text-2xl font-bold text-foreground">
              The Hidden Costs of Manual Spreadsheet Operations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Human Calculation Errors
                </div>
                <p>Manual copy-pasting between sheets and CRM systems causes costly quotation errors and incorrect margin calculations.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Slow Deal Velocity
                </div>
                <p>Generating custom PDF proposals and chasing manager email approvals takes days instead of seconds, delaying close rates.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Siloed Data
                </div>
                <p>Order data remains trapped in isolated spreadsheets without automated sync to accounting or CRM databases.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & ARCHITECTURE */}
          <section id="sheets-erp-architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-4 h-4" /> The Engineered Solution
            </div>
            <h2 id="automated-spreadsheet-erp-systems" className="text-2xl sm:text-3xl font-bold text-foreground">
              Automated Spreadsheets-as-an-ERP Architecture
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We engineer custom Google Apps Script automation that validates input data, automatically builds branded PDF documents via Google Docs/Drive templates, and sends 1-click interactive approval emails to leadership. For complex webhook orchestration, these sheets can plug directly into <Link to="/n8n-workflows" className="text-primary font-semibold hover:underline">self-hosted n8n automation pipelines</Link> or our <Link to="/insights/custom-crm-sync-engines" className="text-primary font-semibold hover:underline">Custom CRM Two-Way Sync Engines</Link>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-primary font-bold">Automated PDF Generation</div>
                <div className="text-muted-foreground font-sans">
                  Merges spreadsheet rows into branded Google Docs templates and exports vector PDFs in seconds.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-blue-500 font-bold">1-Click Gmail Approvals</div>
                <div className="text-muted-foreground font-sans">
                  Interactive HTML email triggers allow executives to approve or decline discount tiers with 1 tap.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-success font-bold">Two-Way API Relays</div>
                <div className="text-muted-foreground font-sans">
                  Automatically syncs approved orders with Freshsales, QuickBooks, or <Link to="/insights/automated-search-analytics-reporting" className="text-foreground underline">automated search analytics dashboards</Link>.
                </div>
              </div>
            </div>
          </section>

          {/* 3. HOW WE HELP */}
          <section id="spreadsheet-automation-deliverables" className="p-8 rounded-2xl border border-border/80 bg-card/60 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Zap className="w-4 h-4" /> Engagement Deliverables
            </div>
            <h2 id="delivery-phases" className="text-2xl font-bold text-foreground">
              How We Deliver Your Spreadsheet Automation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-primary font-bold">Week 1: Template Audit</div>
                <h3 className="font-bold text-foreground text-sm">Workflow & Formula Design</h3>
                <p className="text-xs text-muted-foreground">
                  We audit your existing spreadsheet templates, structure clean schemas, and define approval logic as part of our <Link to="/custom-business-automation" className="text-primary hover:underline">business automation methodology</Link>.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-500 font-bold">Weeks 2-3: Script Build</div>
                <h3 className="font-bold text-foreground text-sm">Apps Script Engineering</h3>
                <p className="text-xs text-muted-foreground">
                  Custom script implementation for PDF merging, Drive storage, Gmail API triggers, and error recovery.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-success font-bold">Week 4: Team Handoff</div>
                <h3 className="font-bold text-foreground text-sm">Testing & Training</h3>
                <p className="text-xs text-muted-foreground">
                  Live team validation, end-to-end stress testing, and complete documented code handoff.
                </p>
              </div>
            </div>
          </section>

          {/* 4. CALL TO ACTION */}
          <section className="pt-4">
            <LeadCaptureBanner
              title="Want to Automate Your Manual Spreadsheet Workflows?"
              subtitle="Let's build a dedicated Google Apps Script automation that eliminates hours of manual data entry every day."
              buttonText="Request Spreadsheet Automation Scope"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="google-apps-script-automation"
        serviceTitle="Google Apps Script & Sheets Automation Consultation"
      />
    </div>
  );
};

export default SheetsAppsScript;
