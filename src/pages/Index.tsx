import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Snapshot } from "@/components/Snapshot";
import { Strengths } from "@/components/Strengths";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { BeyondWork } from "@/components/BeyondWork";
import { Footer } from "@/components/Footer";
import { EnquiryModal } from "@/components/EnquiryModal";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

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
        <ScrollAnimationWrapper>
          <Snapshot />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <Strengths />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <Projects />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <Services onOpenEnquiry={openEnquiry} />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <BeyondWork />
        </ScrollAnimationWrapper>
      </main>
      <Footer />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={closeEnquiry} />
    </div>
  );
};

export default Index;
