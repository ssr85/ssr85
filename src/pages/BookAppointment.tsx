import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Calendar,
  CheckCircle2,
  Lock,
  Clock,
  ExternalLink,
  Code2,
} from "lucide-react";
import { siteConfig } from "@/data/content";

export const BookAppointment = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Schedule a 1-on-1 Architecture Discovery Call | Sarabjeet Rattan"
        description="Book a dedicated 20-minute technical consultation directly with Sarabjeet Rattan. Discuss AI agents, n8n automation, EU GDPR compliance, and custom WordPress architecture."
        canonicalUrl="https://sarabjeetrattan.com/book"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Engineering Consultation
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Book a 1-on-1 Architecture Discovery Session
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Lock in a dedicated 20-minute slot directly on my calendar. Zero junior sales reps—direct technical assessment of your stack, AI agents, or automation architecture.
            </p>

            {/* Credibility Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/80">
                <Clock className="w-3.5 h-3.5 text-primary" /> 20-Min Dedicated Call
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/80">
                <ShieldCheck className="w-3.5 h-3.5 text-success" /> NDA & Full Confidentiality
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/80">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Actionable 24h Roadmap
              </span>
            </div>
          </div>

          {/* Success Banner if Scheduled */}
          {isBooked && (
            <div className="p-6 rounded-2xl bg-success/10 border border-success/30 text-center space-y-2 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Appointment Successfully Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                A Google Meet / calendar invite has been sent to your email. Sarabjeet will review your background before our call.
              </p>
            </div>
          )}

          {/* Calendly Live Embedded Scheduler */}
          <div className="p-2 sm:p-4 rounded-3xl bg-card/60 border border-border/80 shadow-2xl backdrop-blur-xl">
            <CalendlyEmbed
              minHeight="720px"
              onBookingComplete={() => setIsBooked(true)}
            />
          </div>

          {/* Bottom Trust Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">What We Discuss</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Technical bottleneck analysis, database bloat fixes, API & webhook integrations, and multi-agent system specifications.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Strict Code Privacy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mutual NDAs respected. All code reviews and architectural blueprints remain 100% confidential and owned by you.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Instant Calendar Sync</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automated Google Calendar invite with integrated Google Meet video link provided immediately upon slot selection.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="general-consultation"
      />
    </div>
  );
};

export default BookAppointment;
