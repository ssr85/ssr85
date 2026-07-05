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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EnquiryModal = lazy(() =>
  import("@/components/EnquiryModal").then((m) => ({
    default: m.EnquiryModal,
  }))
);

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
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
            {study.sections.map((section, i) => (
              <section key={i} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
                </div>

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
            ))}
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
