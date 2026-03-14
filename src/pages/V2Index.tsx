import { Suspense, lazy, useState } from "react";
import { V2Header } from "@/components/V2Header";
import { V2Hero } from "@/components/V2Hero";
import { V2AtAGlance } from "@/components/V2AtAGlance";
import { V2CaseStudies } from "@/components/V2CaseStudies";
import { V2Strengths } from "@/components/V2Strengths";
import { V2Footer } from "@/components/V2Footer";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { BeyondWork } from "@/components/BeyondWork";

const EnquiryModal = lazy(() => import("@/components/EnquiryModal").then(m => ({ default: m.EnquiryModal })));
const ResumeDownloadModal = lazy(() => import("@/components/ResumeDownloadModal").then(m => ({ default: m.ResumeDownloadModal })));

const V2Index = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="v2-theme min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <V2Header onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      
      <main>
        <V2Hero onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        
        <V2AtAGlance />
        
        <V2CaseStudies onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        
        <V2Strengths />

        <ScrollAnimationWrapper delay={100}>
           <div id="beyond-work">
             <BeyondWork />
           </div>
        </ScrollAnimationWrapper>
      </main>

      <V2Footer 
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <Suspense fallback={null}>
        <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
        <ResumeDownloadModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </Suspense>
    </div>
  );
};

export default V2Index;
