import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { SectionNav } from "@/components/SectionNav";

import { Snapshot } from "@/components/Snapshot";
import { Work } from "@/components/Work";
import { Strengths } from "@/components/Strengths";
import { Services } from "@/components/Services";
import { FAQ } from "@/components/FAQ";
import { BeyondWork } from "@/components/BeyondWork";

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
      <SectionNav />
      <main>
        <Hero onOpenEnquiry={openEnquiry} />
        <ScrollAnimationWrapper>
          <Stats />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <Snapshot />
        </ScrollAnimationWrapper>
        <Work onOpenEnquiry={openEnquiry} />
        <ScrollAnimationWrapper delay={100}>
          <Strengths />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <Services onOpenEnquiry={openEnquiry} />
        </ScrollAnimationWrapper>
        <FAQ onOpenEnquiry={openEnquiry} />
        <ScrollAnimationWrapper delay={100}>
          <BeyondWork />
        </ScrollAnimationWrapper>
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
