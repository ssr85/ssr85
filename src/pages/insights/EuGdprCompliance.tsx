import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  ShieldCheck,
  Scale,
  Globe2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  ArrowRight,
  Zap,
  Sliders,
  Database,
  FileText,
  Activity,
  Check,
  X,
  RefreshCw,
  Terminal,
  Layers,
} from "lucide-react";

export const EuGdprCompliance = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Interactive Risk Assessment State
  const [checklist, setChecklist] = useState({
    shipsToEu: true,
    firesBeforeConsent: true,
    consentModeV2: false,
    oneClickReject: false,
    dsarAutomated: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate Risk Score
  const calculateRisk = () => {
    let risks = 0;
    if (checklist.shipsToEu) risks += 1;
    if (checklist.firesBeforeConsent) risks += 2;
    if (!checklist.consentModeV2) risks += 2;
    if (!checklist.oneClickReject) risks += 1;
    if (!checklist.dsarAutomated) risks += 1;

    if (risks >= 4) {
      return {
        level: "CRITICAL RISK",
        color: "text-red-500",
        bg: "bg-red-500/10 border-red-500/30",
        message: "Your site is actively exposed to EU supervisory fines (€20M / 4% global turnover) and ad conversion tracking degradation.",
      };
    } else if (risks >= 2) {
      return {
        level: "MODERATE RISK",
        color: "text-amber-500",
        bg: "bg-amber-500/10 border-amber-500/30",
        message: "Partial compliance detected. Missing Consent Mode v2 or zero-leak blocking is hurting both legal standing and Google Ads attribution.",
      };
    } else {
      return {
        level: "AUDIT PROOF",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10 border-emerald-500/30",
        message: "Your architecture enforces zero-leak script blocking and full Consent Mode v2 telemetry.",
      };
    }
  };

  const risk = calculateRisk();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="EU GDPR Compliance Architecture for Web Apps & Analytics"
        description="Technical guide to engineering EU GDPR compliance: consent mode v2 implementation, zero-cookie analytics, automated data erasure, and audit logging."
        keywords={[
          "eu gdpr compliance architecture",
          "google consent mode v2 implementation",
          "gdpr compliance for woocommerce",
          "zero leak cookie blocking",
          "selling in eu gdpr requirements",
          "gdpr article 3 2 extraterritorial",
          "ecommerce gdpr audit developer",
        ]}
        url="https://sarabjeetrattan.com/insights/eu-gdpr-compliance-ecommerce-websites"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl space-y-16">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/ai-wordpress-development" className="text-primary hover:underline">
              AI WordPress Development
            </Link>
            <span>/</span>
            <span>Privacy & Infrastructure</span>
          </div>

          {/* Hero Section */}
          <header className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              GDPR Article 3(2) • Google Consent Mode v2 • Zero-Leak Architecture
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              EU GDPR Compliance for International Websites Selling in Europe
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              If your eCommerce store or SaaS platform accepts payments from European customers, displays prices in EUR, or drops analytics cookies on EU visitors, you are legally bound by the General Data Protection Regulation (GDPR)—<strong className="text-foreground">even if your company is incorporated in the US, UK, India, or Australia</strong>. 
            </p>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/80 text-sm flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500 font-mono font-bold text-xs">
                  MAX PENALTY
                </div>
                <span className="text-muted-foreground text-xs md:text-sm">
                  Up to <strong className="text-foreground font-mono">€20,000,000</strong> or <strong className="text-foreground font-mono">4% of global annual turnover</strong> (Art. 83)
                </span>
              </div>

              <Button
                size="sm"
                onClick={() => setIsLeadModalOpen(true)}
                className="font-semibold group"
              >
                Request Technical Compliance Audit
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* Interactive Compliance & Risk Analyzer */}
          <section className="p-6 md:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur space-y-6 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
                <Activity className="w-4 h-4" /> Live Interactive Diagnostic
              </div>
              <span className="text-xs text-muted-foreground font-mono">Click to toggle your store's setup</span>
            </div>

            <h2 className="text-2xl font-bold text-foreground">
              Are You At Risk of EU Regulatory Fines or Tracking Drops?
            </h2>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => toggleCheck("shipsToEu")}
                className="w-full p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-muted/30 transition-colors flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  1. Do you ship goods to EU/EEA countries or accept EUR / European currencies?
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 ${checklist.shipsToEu ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"}`}>
                  {checklist.shipsToEu ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {checklist.shipsToEu ? "YES (Art 3.2 In Scope)" : "NO"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck("firesBeforeConsent")}
                className="w-full p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-muted/30 transition-colors flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  2. Do Meta Pixel, TikTok, or GA4 tags fire BEFORE the visitor clicks "Accept"?
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 ${checklist.firesBeforeConsent ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                  {checklist.firesBeforeConsent ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />} {checklist.firesBeforeConsent ? "YES (Illegal Tag Leak)" : "NO (Clean Prior Consent)"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck("consentModeV2")}
                className="w-full p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-muted/30 transition-colors flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  3. Is Google Consent Mode v2 actively transmitting <code className="text-xs bg-muted px-1 py-0.5 rounded">ad_user_data</code> & <code className="text-xs bg-muted px-1 py-0.5 rounded">ad_personalization</code>?
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 ${checklist.consentModeV2 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                  {checklist.consentModeV2 ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {checklist.consentModeV2 ? "ACTIVE" : "MISSING (Ad Conversions Lost)"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck("oneClickReject")}
                className="w-full p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-muted/30 transition-colors flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  4. Can visitors reject non-essential cookies with equal prominence in ONE click?
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 ${checklist.oneClickReject ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                  {checklist.oneClickReject ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {checklist.oneClickReject ? "COMPLIANT" : "DARK PATTERN DETECTED"}
                </span>
              </button>
            </div>

            {/* Assessment Result Card */}
            <div className={`p-5 rounded-xl border ${risk.bg} flex items-start gap-4 transition-all duration-300`}>
              <div className="p-2.5 rounded-lg bg-background shadow-xs">
                {risk.level === "CRITICAL RISK" ? (
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                ) : risk.level === "MODERATE RISK" ? (
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                )}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-extrabold uppercase tracking-wider ${risk.color}`}>
                    Compliance Diagnosis: {risk.level}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsLeadModalOpen(true)}
                    className="text-xs h-8 border-current"
                  >
                    Fix In 48 Hours
                  </Button>
                </div>
                <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
                  {risk.message}
                </p>
              </div>
            </div>
          </section>

          {/* Visual Architecture Diagram 1: Zero-Leak Interception Flow */}
          <section className="p-6 md:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur space-y-6 shadow-sm">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Layers className="w-4 h-4" /> Visual Architecture Blueprint
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              How Zero-Leak Tag Interception Works vs. Flawed Plugins
            </h2>

            {/* Diagram Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Leaky Flow */}
              <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> ❌ Flawed Plugin Flow (95% of stores)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-500">Illegal Leak</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-background border border-red-500/20 flex items-center justify-between">
                    <span>1. User Lands on Store</span>
                    <span className="text-muted-foreground font-mono">0ms</span>
                  </div>
                  <div className="text-center text-red-500 font-bold text-xs">↓</div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-semibold flex items-center justify-between">
                    <span>2. GTM / Meta Pixel / TikTok Fire Unchecked</span>
                    <span className="font-mono text-[10px]">🚨 IP & Cookies Transmitted</span>
                  </div>
                  <div className="text-center text-red-500 font-bold text-xs">↓</div>
                  <div className="p-3 rounded-lg bg-background border border-border/80 flex items-center justify-between">
                    <span>3. Cosmetic Banner Renders</span>
                    <span className="text-muted-foreground font-mono">1200ms</span>
                  </div>
                  <div className="p-2 rounded bg-red-500/5 text-[11px] text-red-500 font-mono text-center">
                    Audit Result: FAILED — Consent was not obtained prior to tracking.
                  </div>
                </div>
              </div>

              {/* Zero-Leak Flow */}
              <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> ✅ Zero-Leak Engineering Flow
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">Audit-Proof</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-background border border-emerald-500/20 flex items-center justify-between">
                    <span>1. User Lands on Store</span>
                    <span className="text-muted-foreground font-mono">0ms</span>
                  </div>
                  <div className="text-center text-emerald-500 font-bold text-xs">↓</div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                    <span>2. Consent Mode v2 Default 'Denied' + Script Trap</span>
                    <span className="font-mono text-[10px]">🛡️ 0 Beacons Fired</span>
                  </div>
                  <div className="text-center text-emerald-500 font-bold text-xs">↓</div>
                  <div className="p-3 rounded-lg bg-background border border-border/80 flex items-center justify-between">
                    <span>3. User Opts-In → Dynamic Event Released</span>
                    <span className="text-emerald-500 font-mono font-bold">100% Compliant</span>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/5 text-[11px] text-emerald-500 font-mono text-center">
                    Audit Result: PASSED — AI Modeling recovers up to 70% lost data legally.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: The Extraterritorial Reality */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
              <Globe2 className="w-4 h-4" /> 1. The Legal Reality (Article 3(2))
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Why Non-EU Websites Are Legally Bound by GDPR
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              A common misconception among US, UK, and Asian eCommerce businesses is that GDPR only applies to companies incorporated inside the European Union. Article 3(2) of the GDPR explicitly defines the <strong className="text-foreground">"Extraterritorial Scope"</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-mono font-bold">
                  01
                </div>
                <h3 className="font-bold text-foreground text-base">Offering Goods or Services</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If your site lists EUR pricing, mentions EU shipping destinations, translates into European languages, or accepts European payment methods, European Data Protection Authorities (DPAs) have full legal jurisdiction.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-mono font-bold">
                  02
                </div>
                <h3 className="font-bold text-foreground text-base">Monitoring Visitor Behavior</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dropping tracking cookies, collecting IP addresses, profiling shopping carts, or running retargeting pixels on users located in the EU triggers strict prior-consent requirements under the ePrivacy Directive.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Fatal Flaws of Generic Plugins */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> 2. The Fatal Flaws in 95% of Cookie Banners
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Why Superficial Cookie Plugins Don't Protect You
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Most store owners install a free WordPress or Shopify banner and assume they are compliant. In regulatory audits, over 95% of these setups fail immediately due to architectural flaws:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  The Banner Illusion
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The banner appears visually, but Google Tag Manager, Meta Pixel, and TikTok scripts have already fired before the user clicks anything.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  Dark Pattern Banners
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Providing a prominent "Accept All" button while hiding the "Reject" option behind 3 nested setting menus is illegal under EU court rulings.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  Broken Ads Tracking
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Without Google Consent Mode v2 signals, Google Ads drops conversion attribution for EU audiences, inflating your customer acquisition cost (CAC).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Engineering-Grade Comparison Table */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
              <Sliders className="w-4 h-4" /> 3. Architectural Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Generic Banners vs. Engineering-Grade GDPR Architecture
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/50 text-muted-foreground font-mono uppercase tracking-wider border-b border-border/80">
                  <tr>
                    <th className="p-4">Compliance Dimension</th>
                    <th className="p-4 text-red-500">Typical Off-The-Shelf Plugin</th>
                    <th className="p-4 text-emerald-500">Our Engineering-Grade Setup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-4 font-bold text-foreground">Tag Execution Timing</td>
                    <td className="p-4">Fires immediately upon DOM load (Non-compliant)</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Zero-leak interception; blocked until explicit opt-in</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-foreground">Google Consent Mode v2</td>
                    <td className="p-4">Missing or improperly mapped variables</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Native default-denied dataLayer state + modeling recovery</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-foreground">Third-Party Fonts & Iframes</td>
                    <td className="p-4">Unshielded Google Fonts & YouTube IP leaks</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Locally hosted fonts & click-to-load 2-click iframe guards</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-foreground">Consent Audit Trails</td>
                    <td className="p-4">Ephemeral browser cookie only</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Cryptographically verifiable consent logs with timestamp & version</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-foreground">Page Load Speed Impact</td>
                    <td className="p-4">Adds 200–400ms TTFB and layout shifts (CLS)</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Zero-dependency async script (sub-12kB bundle)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Google Consent Mode v2 Deep Dive */}
          <section className="p-8 rounded-2xl border border-primary/20 bg-primary/[0.02] space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Zap className="w-4 h-4" /> 4. Google Consent Mode v2 Explained
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Maintain Google Ads Performance Without Violating Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Since March 2024, Google enforces Consent Mode v2 for all traffic originating in the European Economic Area (EEA). Without these 4 core telemetry flags configured in your Google Tag Manager dataLayer, your Google Ads cannot build audience remarketing lists or track Smart Bidding conversions accurately:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-background border border-border/80 flex items-center justify-between">
                <span><code>ad_storage</code></span>
                <span className="text-muted-foreground">Controls advertising cookie storage</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border/80 flex items-center justify-between">
                <span><code>analytics_storage</code></span>
                <span className="text-muted-foreground">Controls GA4 usage data</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border/80 flex items-center justify-between">
                <span><code>ad_user_data</code></span>
                <span className="text-primary font-bold">Required for Google Ads Attribution</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border/80 flex items-center justify-between">
                <span><code>ad_personalization</code></span>
                <span className="text-primary font-bold">Required for Remarketing Audiences</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/70 border border-border/70 font-mono text-xs text-muted-foreground overflow-x-auto space-y-1">
              <div className="text-primary font-bold">// Standard Default-Denied Consent State</div>
              <div>window.dataLayer = window.dataLayer || [];</div>
              <div>function gtag()&#123;dataLayer.push(arguments);&#125;</div>
              <div>gtag('consent', 'default', &#123;</div>
              <div>&nbsp;&nbsp;'ad_storage': 'denied',</div>
              <div>&nbsp;&nbsp;'analytics_storage': 'denied',</div>
              <div>&nbsp;&nbsp;'ad_user_data': 'denied',</div>
              <div>&nbsp;&nbsp;'ad_personalization': 'denied',</div>
              <div>&nbsp;&nbsp;'wait_for_update': 500</div>
              <div>&#125;);</div>
            </div>
          </section>

          {/* Section 5: 48-Hour Technical Remediation Blueprint */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" /> 5. The 48-Hour Engineering Remediation Blueprint
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              How We Bulletproof Your Store in 3 Steps
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-base">Step 1: Zero-Leak Script Interception & Tag Audit</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">Hours 0–12</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We crawl your frontend to catalog every tracking beacon (GTM, Meta, Klaviyo, Hotjar, TikTok, Google Fonts). We rewire tag firing rules so no data is transmitted without explicit user consent.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-base">Step 2: Google Consent Mode v2 & Behavioral Modeling</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">Hours 12–24</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We implement native Consent Mode v2 via GTM with server-side cookieless ping modeling, allowing Google Ads and GA4 to recover up to 70% of lost conversion data through AI modeling while maintaining 100% legal compliance.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-base">Step 3: Automated DSAR & Cryptographic Audit Trails</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">Hours 24–48</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We configure self-service Data Subject Access Request (DSAR) pipelines for customer data export/deletion and deploy immutable consent logging to guarantee audit defense against European regulators.
                </p>
              </div>
            </div>
          </section>

          {/* Consultation Banner */}
          <LeadCaptureBanner
            title="Need Bulletproof EU GDPR & Consent Mode v2 Implementation?"
            description="Protect your WooCommerce, Shopify, or Headless React store from EU regulatory fines while preserving maximum ad tracking accuracy."
            ctaText="Schedule Technical Compliance Audit"
            onCtaClick={() => setIsLeadModalOpen(true)}
          />
        </article>
      </main>

      <Footer />
      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialService="EU GDPR Compliance & Consent Mode v2 Setup"
        initialRequirement="We are looking for an EU GDPR technical compliance audit and Google Consent Mode v2 / zero-leak cookie architecture setup for our store."
      />
    </div>
  );
};

export default EuGdprCompliance;
