import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Workflow,
  FileSpreadsheet,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Database,
  Building2,
  Sliders,
} from "lucide-react";

export const CustomBusinessAutomation = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("custom-business-automation");

  // ROI Calculator state
  const [teamSize, setTeamSize] = useState(5);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(40);

  const annualHoursSaved = Math.round(teamSize * manualHoursPerWeek * 50 * 0.75); // 75% automated
  const annualDollarSavings = Math.round(annualHoursSaved * hourlyRate);

  const handleOpenModal = (serviceName = "custom-business-automation") => {
    setSelectedService(serviceName);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Bespoke Business Automation & Custom CRM Engineering | Sarabjeet Rattan"
        description="Custom operational software built from scratch: Advanced Google Apps Script ecosystems, robust two-way CRM sync engines (Freshsales, HubSpot), and automated quotation/invoicing pipelines."
        keywords={[
          "custom business automation",
          "google apps script development",
          "custom crm integration services",
          "google sheets automated workflows",
          "two way crm sync without zapier",
          "automated quoting and invoicing sheets",
        ]}
        url="https://sarabjeetrattan.com/custom-business-automation"
      />

      <Header onOpenEnquiry={() => handleOpenModal("custom-business-automation")} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Pillar • Operational Systems
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Bespoke Business Automation <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-blue-600">
              Without No-Code Limits.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
            When no-code tools like Zapier or Make hit payload timeouts, rate limits, and massive monthly bills, we build custom, stateful sync engines, enterprise Google Apps Script pipelines, and automated quoting machines.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => handleOpenModal("custom-automation-consultation")}
              className="px-8 py-6 text-base font-semibold shadow-xl shadow-primary/20 group"
            >
              Discuss Operations Automation
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <a
              href="#roi-calculator"
              className="px-6 py-3 rounded-lg border border-border/80 hover:bg-muted/50 text-sm font-medium transition-colors"
            >
              Calculate Operational ROI ↓
            </a>
          </div>
        </section>

        {/* Infographic: Custom Code vs Fragile No-Code */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="p-8 md:p-10 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Custom Engineering vs. Fragile No-Code
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Why growing operations transition from patchwork webhooks to dedicated, stateful sync pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-semibold">
                  <XCircle className="w-4 h-4" /> Fragile No-Code (Zapier / Make)
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span><strong>Silent Data Loss:</strong> Webhooks fail during API downtime with zero automatic rollback or replay logging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span><strong>Runaway Task Costs:</strong> Tiered pricing scales aggressively with every automated step and loop.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span><strong>Payload Bottlenecks:</strong> Inability to process multi-megabyte CSVs, batch exports, or complex nested JSON payloads.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] space-y-4">
                <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Bespoke Engineering (Sarabjeet Rattan)
                </div>
                <ul className="space-y-3 text-sm text-foreground/90">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span><strong>Stateful Two-Way Sync:</strong> Atomic database transactions, automatic retries, and deduplication queues.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span><strong>Zero Per-Task Tax:</strong> Runs on your own lightweight serverless infrastructure with flat hosting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span><strong>High-Velocity Bulk Processing:</strong> Effortlessly transforms 100,000+ row datasets and complex ERP schemas.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Cluster Silos */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-2">
                Operational Blueprints & Guides
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Deep Business Automation Guides
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/insights/custom-crm-sync-engines"
              className="group p-8 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Two-Way CRM Synchronization Without No-Code Limits
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  How to build resilient sync engines between Freshsales, HubSpot, Pipedrive, and custom databases with atomic conflict resolution and zero data loss.
                </p>
              </div>
              <div className="pt-6 flex items-center text-sm font-semibold text-primary">
                Read Blueprint <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/insights/google-sheets-apps-script-enterprise"
              className="group p-8 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Enterprise Google Apps Script & Sheets ERP Systems
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Transforming standard Google Sheets into automated internal quoting, invoicing, and PDF generation engines with multi-stage approval workflows.
                </p>
              </div>
              <div className="pt-6 flex items-center text-sm font-semibold text-primary">
                Read Blueprint <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section id="roi-calculator" className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="p-8 md:p-10 rounded-2xl border border-border/80 bg-gradient-to-br from-card to-background shadow-xl">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-2">
                <Calculator className="w-3.5 h-3.5" />
                Interactive ROI Calculator
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Estimate Your Team's Automation Savings
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Calculate the measurable hours and financial cost saved by replacing manual spreadsheets and repetitive data entry with custom software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Team Members Affected: <span className="text-foreground font-bold">{teamSize}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Manual Hours / Person / Wk: <span className="text-foreground font-bold">{manualHoursPerWeek} hrs</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(parseInt(e.target.value, 10))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Blended Hourly Cost: <span className="text-foreground font-bold">${hourlyRate}/hr</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-xl bg-background border border-border/70 mb-6">
              <div className="text-center sm:text-left">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Estimated Annual Hours Saved</div>
                <div className="text-3xl font-extrabold text-primary mt-1">
                  {annualHoursSaved.toLocaleString()} hrs / yr
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Estimated Annual Operational Savings</div>
                <div className="text-3xl font-extrabold text-emerald-500 mt-1">
                  ${annualDollarSavings.toLocaleString()} / yr
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleOpenModal("custom-automation-calculator")}
              className="w-full sm:w-auto px-8 py-6 font-medium shadow-md shadow-primary/20"
            >
              Discuss How to Automate These Hours
            </Button>
          </div>
        </section>

        {/* Lead Capture Banner */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <LeadCaptureBanner
            title="Have an Operational Bottleneck in Your CRM or Spreadsheets?"
            subtitle="Let's engineer a custom, self-healing automation pipeline that saves hundreds of manual hours every month."
            buttonText="Schedule Operations Assessment"
            onOpenLeadModal={() => handleOpenModal("custom-automation-banner")}
          />
        </section>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService={selectedService}
        serviceTitle="Business Automation & CRM Integration Consultation"
      />
    </div>
  );
};

export default CustomBusinessAutomation;
