import { useState, lazy, Suspense, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { caseStudies } from "@/data/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  AlertCircle,
  Cpu,
  Clock,
  User,
  ChevronRight,
  Database,
  Globe,
  Sparkles,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EnquiryModal = lazy(() =>
  import("@/components/EnquiryModal").then((m) => ({
    default: m.EnquiryModal,
  }))
);

// Lead OG Case Study — Visual Sub-components

const LeadOGProblemVisual = () => (
  <div className="relative p-6 bg-card border border-border/40 rounded-2xl shadow-md space-y-4 overflow-hidden h-full flex flex-col justify-between">
    <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full blur-2xl pointer-events-none" />
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Scattered Sources</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-muted/50 border border-border/20 rounded-xl">
          <span className="text-xs font-medium text-foreground">LinkedIn Outbound</span>
          <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-mono">No Email</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-muted/50 border border-border/20 rounded-xl">
          <span className="text-xs font-medium text-foreground">AdWords Landing Page</span>
          <span className="text-[10px] bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded font-mono">Format Error</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-muted/50 border border-border/20 rounded-xl">
          <span className="text-xs font-medium text-foreground">Manual Spreadsheets</span>
          <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 px-2 py-0.5 rounded font-mono">Duplicate</span>
        </div>
      </div>
    </div>
    <div className="space-y-3 mt-4">
      <div className="flex justify-center">
        <div className="animate-bounce text-muted-foreground text-sm">↓</div>
      </div>
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
        <div className="text-xs font-bold text-destructive uppercase">Slow CRM Synchronization</div>
        <div className="text-[10px] text-muted-foreground mt-1">SDR Outreach Delayed by Hours/Days</div>
      </div>
    </div>
  </div>
);

const LeadOGApproachVisual = () => (
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
    {[
      { step: "01", name: "Parse Delimiters", desc: "Auto-detect commas, semicolons, or tabs." },
      { step: "02", name: "Warn Delimiter", desc: "Alert user on CSV format warning flags." },
      { step: "03", name: "Verify Types", desc: "Dynamic validations for numbers and dates." },
      { step: "04", name: "Apply Update", desc: "Push to Freshsales CRM cleanly." }
    ].map((item, idx) => (
      <div key={idx} className="p-4 bg-card border border-border/40 rounded-xl space-y-2 relative overflow-hidden group hover:border-primary/45 transition-colors duration-300">
        <div className="text-2xl font-black text-primary/10 absolute right-3 top-2 group-hover:text-primary/20 transition-colors">{item.step}</div>
        <div className="text-xs font-bold text-foreground pr-6">{item.name}</div>
        <div className="text-[11px] text-muted-foreground leading-snug">{item.desc}</div>
      </div>
    ))}
  </div>
);

const LeadOGPipelineVisual = () => (
  <div className="space-y-6 mt-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Apollo Card */}
      <div className="p-5 bg-card border border-border/40 rounded-2xl space-y-3 relative group hover:border-primary/30 transition-all duration-300">
        <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
          <Database size={18} />
        </div>
        <div className="text-xs font-bold text-foreground">1. Apollo Database Enriched</div>
        <ul className="text-[11px] text-muted-foreground space-y-1.5">
          <li>• Direct Business Email</li>
          <li>• Verified Cell/Work Phone</li>
          <li>• Full Job Title & Location</li>
          <li>• Organization size & revenue</li>
        </ul>
      </div>
      {/* Firecrawl Card */}
      <div className="p-5 bg-card border border-border/40 rounded-2xl space-y-3 relative group hover:border-secondary/30 transition-all duration-300">
        <div className="p-2 w-fit rounded-lg bg-secondary/10 text-secondary">
          <Globe size={18} />
        </div>
        <div className="text-xs font-bold text-foreground">2. Firecrawl Real-time Scrape</div>
        <ul className="text-[11px] text-muted-foreground space-y-1.5">
          <li>• Crawl official company sites</li>
          <li>• Extract recent brand initiatives</li>
          <li>• Identify current strategic pains</li>
          <li>• Scrape context-aware details</li>
        </ul>
      </div>
      {/* Gemini Card */}
      <div className="p-5 bg-card border border-border/40 rounded-2xl space-y-3 relative group hover:border-accent/30 transition-all duration-300">
        <div className="p-2 w-fit rounded-lg bg-accent/10 text-accent">
          <Sparkles size={18} />
        </div>
        <div className="text-xs font-bold text-foreground">3. Gemini AI Analysis</div>
        <ul className="text-[11px] text-muted-foreground space-y-1.5">
          <li>• Score Ideal Customer Profile fit</li>
          <li>• Pull matching tags dynamically</li>
          <li>• Summarize prospect pain points</li>
          <li>• Draft custom outbound templates</li>
        </ul>
      </div>
    </div>
    
    {/* Caching & Sync callout */}
    <div className="p-4 bg-muted/40 border border-border/20 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <Key size={14} className="text-primary shrink-0" />
        <div>
          <span className="font-semibold text-foreground mr-1.5">Local Caching Engine</span>
          <span className="text-muted-foreground">(readPersonCache / writePersonCache) prevents rate limit blocks</span>
        </div>
      </div>
      <Badge variant="outline" className="text-[9px] bg-background/50 w-fit shrink-0">Active</Badge>
    </div>
  </div>
);

const LeadOGArchitectureVisual = () => (
  <div className="p-6 bg-card border border-border/40 rounded-2xl space-y-6 mt-4">
    <div className="text-xs font-bold uppercase tracking-wider text-secondary">Match Scoring Engine</div>
    <div className="space-y-4">
      {/* Slider / Range bar */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
          {/* Unmatched marker */}
          <div className="absolute left-[30%] -top-1 h-5 w-1 bg-foreground dark:bg-muted rounded" />
          {/* Review marker */}
          <div className="absolute left-[70%] -top-1 h-5 w-1 bg-foreground dark:bg-muted rounded" />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>Unmatched (&lt;60)</span>
          <span>Review (60-84)</span>
          <span>Exact Match (&gt;=85)</span>
        </div>
      </div>
      {/* Score Bonuses list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-muted/40 rounded-lg flex justify-between items-center text-xs">
          <span className="font-medium text-foreground">Person + Company alignment</span>
          <Badge className="bg-green-600 text-white font-mono">+20 score</Badge>
        </div>
        <div className="p-3 bg-muted/40 rounded-lg flex justify-between items-center text-xs">
          <span className="font-medium text-foreground">Surname + Company match</span>
          <Badge className="bg-green-600 text-white font-mono">+15 score</Badge>
        </div>
      </div>
    </div>
  </div>
);

// LinkedIn Case Study — Visual Sub-components

const LinkedInProblemVisual = () => (
  <div className="relative p-6 bg-card border border-border/40 rounded-2xl shadow-md space-y-4 overflow-hidden h-full flex flex-col justify-between">
    <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full blur-2xl pointer-events-none" />
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Manual Content Friction</div>
      <div className="space-y-2">
        <div className="p-3 bg-muted/50 border border-border/20 rounded-xl text-xs space-y-1">
          <div className="font-bold text-foreground">1. Trend Research Time Drain</div>
          <div className="text-[10px] text-muted-foreground">Spending 2-3 hours parsing URLs and scrolling news feeds daily.</div>
        </div>
        <div className="p-3 bg-muted/50 border border-border/20 rounded-xl text-xs space-y-1">
          <div className="font-bold text-foreground">2. Creative Writer's Block</div>
          <div className="text-[10px] text-muted-foreground">Drafting engaging content under strict char limits from scratch.</div>
        </div>
        <div className="p-3 bg-muted/50 border border-border/20 rounded-xl text-xs space-y-1">
          <div className="font-bold text-foreground">3. Disjointed Workspace</div>
          <div className="text-[10px] text-muted-foreground">Managing drafts in documents, calendar tools, and social schedulers.</div>
        </div>
      </div>
    </div>
    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-center mt-4">
      <span className="text-[10px] font-bold text-destructive uppercase">Stale Outreach & Brand Stagnation</span>
    </div>
  </div>
);

const LinkedInApproachVisual = () => (
  <div className="space-y-4 mt-4">
    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Trello-Driven State Machine</div>
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
      {[
        { label: "Pending Topics", actor: "CrewAI Research", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
        { label: "Approved Topics", actor: "User Moves Card", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
        { label: "Pending Content", actor: "CrewAI Drafter", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
        { label: "Approved Content", actor: "User Moves Card", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
        { label: "Published", actor: "LinkedIn API Sync", color: "bg-primary/10 text-primary border-primary/20" },
      ].map((column, idx) => (
        <div key={idx} className={`p-3 bg-card border rounded-xl space-y-1.5 text-center ${column.color}`}>
          <div className="text-xs font-bold truncate">{column.label}</div>
          <div className="text-[9px] uppercase tracking-wider opacity-85 font-mono font-medium">{column.actor}</div>
        </div>
      ))}
    </div>
  </div>
);

const LinkedInAgentVisual = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div className="p-5 bg-card border border-border/40 rounded-2xl space-y-3 relative group hover:border-primary/30 transition-all duration-300">
      <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
        <Globe size={18} />
      </div>
      <div className="text-xs font-bold text-foreground">Research Agent (CrewAI)</div>
      <div className="text-[11px] text-muted-foreground space-y-1">
        <div><strong>Role:</strong> Industry Scanner & Outliner</div>
        <div><strong>Tools:</strong> SerperDev (Web Search), ScrapeWebsite (Scraper)</div>
        <div><strong>Output:</strong> Detailed structured outlines + target keywords</div>
      </div>
    </div>
    <div className="p-5 bg-card border border-border/40 rounded-2xl space-y-3 relative group hover:border-secondary/30 transition-all duration-300">
      <div className="p-2 w-fit rounded-lg bg-secondary/10 text-secondary">
        <Sparkles size={18} />
      </div>
      <div className="text-xs font-bold text-foreground">Content Agent (CrewAI)</div>
      <div className="text-[11px] text-muted-foreground space-y-1">
        <div><strong>Role:</strong> LinkedIn Copywriter</div>
        <div><strong>Constraints:</strong> 500-3000 characters, markdown, hashtags</div>
        <div><strong>Output:</strong> Draft post layout, hooks, and tag selections</div>
      </div>
    </div>
  </div>
);

const LinkedInArchitectureVisual = () => (
  <div className="p-6 bg-card border border-border/40 rounded-2xl space-y-4 mt-4">
    <div className="text-xs font-bold uppercase tracking-wider text-secondary">System Component Layers</div>
    <div className="space-y-3">
      {[
        { layer: "Scheduler Layer", tech: "APScheduler (Daily crons for research, polling checks)" },
        { layer: "Orchestration Layer", tech: "Python Orchestrator (State machine, error recovery, run validations)" },
        { layer: "Integration Layer", tech: "Trello Client API & LinkedIn ugcPost API" },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/40 rounded-xl gap-1 text-xs">
          <span className="font-semibold text-foreground shrink-0">{item.layer}</span>
          <span className="text-muted-foreground text-[11px] sm:text-right">{item.tech}</span>
        </div>
      ))}
    </div>
  </div>
);

interface CaseStudyDetailProps {
  slug?: string;
}

const CaseStudyDetail = ({ slug: propSlug }: CaseStudyDetailProps) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = propSlug || paramSlug;
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const openEnquiry = () => setIsEnquiryOpen(true);
  const closeEnquiry = () => setIsEnquiryOpen(false);

  // Find the case study and adjacent detail pages for prev/next nav
  const detailStudies = useMemo(
    () => caseStudies.filter((cs) => cs.hasDetailPage && cs.slug),
    []
  );
  const currentIndex = detailStudies.findIndex((cs) => cs.slug === slug);
  const study = currentIndex >= 0 ? detailStudies[currentIndex] : null;
  const prevStudy =
    currentIndex > 0 ? detailStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < detailStudies.length - 1
      ? detailStudies[currentIndex + 1]
      : null;

  // 404 fallback
  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="text-muted-foreground text-lg">
            Case study not found.
          </p>
          <Link
            to="/#case-studies"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={study.seo?.metaTitle}
        description={study.seo?.metaDescription}
        keywords={study.seo?.keywords}
        url={`https://sarabjeetrattan.com/case-studies/${study.slug}`}
        type="article"
        breadcrumbs={[
          { name: "Case Studies", url: "https://sarabjeetrattan.com/#case-studies" },
          { name: study.name, url: `https://sarabjeetrattan.com/case-studies/${study.slug}` },
        ]}
      />
      <Header onOpenEnquiry={openEnquiry} />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto max-w-4xl px-4 mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              to="/#case-studies"
              className="hover:text-foreground transition-colors"
            >
              Case Studies
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{study.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto max-w-4xl px-4 mb-16">
          <div className="space-y-6 animate-hero-fade">
            <Badge
              variant="secondary"
              className="uppercase tracking-widest text-[10px] py-1 px-3"
            >
              {study.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {study.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
              {study.description}
            </p>

            {/* Hero image */}
            {study.heroImage && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-border/40 shadow-xl">
                <img
                  src={study.heroImage}
                  alt={`${study.name} overview`}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </section>

        {/* Metadata Bar */}
        <section className="container mx-auto max-w-4xl px-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl">
            {study.duration && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
                  <Clock size={14} />
                  <span>Duration</span>
                </div>
                <p className="text-sm text-foreground font-medium">
                  {study.duration}
                </p>
              </div>
            )}
            {study.role && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-secondary font-bold text-[11px] uppercase tracking-wider">
                  <User size={14} />
                  <span>Role</span>
                </div>
                <p className="text-sm text-foreground font-medium">
                  {study.role}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
                <Target size={14} />
                <span>Audience</span>
              </div>
              <p className="text-sm text-foreground font-medium">
                {study.audience}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
                <Cpu size={14} />
                <span>Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {study.techStack.slice(0, 3).map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-background/40 border-border/40 text-[9px] py-0"
                  >
                    {tech}
                  </Badge>
                ))}
                {study.techStack.length > 3 && (
                  <Badge
                    variant="outline"
                    className="bg-background/40 border-border/40 text-[9px] py-0"
                  >
                    +{study.techStack.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Sections */}
        {study.sections && study.sections.length > 0 && (
          <div className="container mx-auto max-w-4xl px-4 space-y-16 mb-16">
            {study.sections.map((section, i) => {
              const isLeadOG = study.id === "lead-og";
              const isLinkedIn = study.id === "linked-in";

              return (
                <section key={i} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
                  </div>

                  {/* Section content and visuals */}
                  {isLeadOG && i === 0 ? (
                    /* Problem Section: 2-column split */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        {section.content.map((paragraph, j) => (
                          <p
                            key={j}
                            className="text-base md:text-lg text-muted-foreground leading-relaxed font-light"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <LeadOGProblemVisual />
                    </div>
                  ) : isLinkedIn && i === 0 ? (
                    /* Problem Section: 2-column split for LinkedIn */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        {section.content.map((paragraph, j) => (
                          <p
                            key={j}
                            className="text-base md:text-lg text-muted-foreground leading-relaxed font-light"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <LinkedInProblemVisual />
                    </div>
                  ) : (
                    /* Default Section Text Layout */
                    <div className="space-y-4">
                      {section.content.map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-base md:text-lg text-muted-foreground leading-relaxed font-light"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Context-aware inline visual builders */}
                  {isLeadOG && i === 1 && <LeadOGApproachVisual />}
                  {isLeadOG && i === 2 && <LeadOGPipelineVisual />}
                  {isLeadOG && i === 3 && <LeadOGArchitectureVisual />}

                  {isLinkedIn && i === 1 && <LinkedInApproachVisual />}
                  {isLinkedIn && i === 2 && <LinkedInAgentVisual />}
                  {isLinkedIn && i === 3 && <LinkedInArchitectureVisual />}

                  {/* Highlights Callouts */}
                  {section.highlights && section.highlights.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                      {section.highlights.map((highlight, k) => (
                        <div
                          key={k}
                          className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border/20"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-sm font-medium text-foreground/80">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {/* Pain Points */}
        <section className="container mx-auto max-w-4xl px-4 mb-16">
          <div className="p-8 bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl space-y-6">
            <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
              <AlertCircle size={16} />
              <span>Pain Points Solved</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {study.painPoints.map((pp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/20"
                >
                  <span className="text-accent mt-1 text-[10px] shrink-0">
                    ●
                  </span>
                  <span className="text-sm font-medium text-foreground/80">
                    {pp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact / Stats */}
        <section className="container mx-auto max-w-4xl px-4 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
              Impact & Outcomes
            </h2>

            {/* Key Metrics (if present) */}
            {study.keyMetrics && study.keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {study.keyMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="text-center p-6 bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl space-y-2"
                  >
                    <div className="text-3xl font-bold text-primary">
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {study.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border/20"
                >
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground/80">
                    {stat}
                  </span>
                </div>
              ))}
            </div>

            {/* Full Tech Stack */}
            <div className="p-6 bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-[11px] uppercase tracking-wider">
                <Cpu size={16} />
                <span>Full Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-background/40 border-border/40 text-xs py-1 px-3"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Previous / Next Navigation */}
        <section className="container mx-auto max-w-4xl px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevStudy ? (
              <Link
                to={`/case-studies/${prevStudy.slug}`}
                className="group flex items-center gap-4 p-6 bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft
                  size={20}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                />
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Previous
                  </div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {prevStudy.name}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextStudy ? (
              <Link
                to={`/case-studies/${nextStudy.slug}`}
                className="group flex items-center justify-end gap-4 p-6 bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Next
                  </div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {nextStudy.name}
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-4xl px-4 mb-8">
          <div className="text-center p-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border/40 rounded-2xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Interested in a similar solution?
            </h2>
            <p className="text-muted-foreground font-light max-w-md mx-auto">
              Let's discuss how agentic AI can solve your operational
              challenges.
            </p>
            <Button
              onClick={openEnquiry}
              size="lg"
              className="rounded-full px-8"
            >
              Start a Conversation
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Back to home */}
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Link
            to="/#case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all case studies
          </Link>
        </div>
      </main>

      <Footer />

      {isEnquiryOpen && (
        <Suspense fallback={null}>
          <EnquiryModal isOpen={isEnquiryOpen} onClose={closeEnquiry} />
        </Suspense>
      )}
    </div>
  );
};

export default CaseStudyDetail;
