import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Snapshot } from "@/components/Snapshot";
import { Strengths } from "@/components/Strengths";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { BeyondWork } from "@/components/BeyondWork";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const EnquiryModal = lazy(() => import("@/components/EnquiryModal").then(m => ({ default: m.EnquiryModal })));

const Index = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const openEnquiry = () => setIsEnquiryOpen(true);
  const closeEnquiry = () => setIsEnquiryOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenEnquiry={openEnquiry} />
      <main>
        <Hero onOpenEnquiry={openEnquiry} />
        <ScrollAnimationWrapper>
          <Stats />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <Snapshot />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <Strengths />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <Projects />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <Services onOpenEnquiry={openEnquiry} />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={100}>
          <BeyondWork />
        </ScrollAnimationWrapper>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <EnquiryModal isOpen={isEnquiryOpen} onClose={closeEnquiry} />
      </Suspense>
    </div>
  );
};

export default Index;
