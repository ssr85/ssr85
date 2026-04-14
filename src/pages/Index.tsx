import { useState } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { CaseStudies } from "@/components/CaseStudies";
import { Snapshot } from "@/components/Snapshot";
import { Strengths } from "@/components/Strengths";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { FAQ } from "@/components/FAQ";
import { BeyondWork } from "@/components/BeyondWork";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EnquiryModal } from "@/components/EnquiryModal";

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
        <ScrollAnimationWrapper delay={100}>
          <Snapshot />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={200}>
          <CaseStudies />
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
        <FAQ />
        <ScrollAnimationWrapper delay={100}>
          <BeyondWork />
        </ScrollAnimationWrapper>
      </main>
      <Footer />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={closeEnquiry} />
    </div>
  );
};

export default Index;
