import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const Snapshot = lazy(() => import("@/components/Snapshot").then((m) => ({ default: m.Snapshot })));
const CaseStudies = lazy(() => import("@/components/CaseStudies").then((m) => ({ default: m.CaseStudies })));
const Strengths = lazy(() => import("@/components/Strengths").then((m) => ({ default: m.Strengths })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Services = lazy(() => import("@/components/Services").then((m) => ({ default: m.Services })));
const FAQ = lazy(() => import("@/components/FAQ").then((m) => ({ default: m.FAQ })));
const BeyondWork = lazy(() => import("@/components/BeyondWork").then((m) => ({ default: m.BeyondWork })));

const EnquiryModal = lazy(() =>
  import("@/components/EnquiryModal").then((module) => ({ default: module.EnquiryModal }))
);

const Index = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const openEnquiry = () => setIsEnquiryOpen(true);
  const closeEnquiry = () => setIsEnquiryOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Header onOpenEnquiry={openEnquiry} />
      <main>
        <Hero onOpenEnquiry={openEnquiry} />
        <ScrollAnimationWrapper>
          <Stats />
        </ScrollAnimationWrapper>
        <Suspense fallback={<div className="h-[500px]" />}>
          <ScrollAnimationWrapper delay={100}>
            <Snapshot />
          </ScrollAnimationWrapper>
        </Suspense>
        <Suspense fallback={<div className="h-[500px]" />}>
          <ScrollAnimationWrapper delay={200}>
            <CaseStudies />
          </ScrollAnimationWrapper>
        </Suspense>
        <Suspense fallback={<div className="h-[400px]" />}>
          <ScrollAnimationWrapper delay={100}>
            <Strengths />
          </ScrollAnimationWrapper>
        </Suspense>
        <Suspense fallback={<div className="h-[500px]" />}>
          <ScrollAnimationWrapper delay={100}>
            <Projects />
          </ScrollAnimationWrapper>
        </Suspense>
        <Suspense fallback={<div className="h-[500px]" />}>
          <ScrollAnimationWrapper delay={100}>
            <Services onOpenEnquiry={openEnquiry} />
          </ScrollAnimationWrapper>
        </Suspense>
        <Suspense fallback={<div className="h-[500px]" />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<div className="h-[500px]" />}>
          <ScrollAnimationWrapper delay={100}>
            <BeyondWork />
          </ScrollAnimationWrapper>
        </Suspense>
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

export default Index;
