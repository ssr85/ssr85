import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import { EngineeringGrid } from "./EngineeringGrid";
import { Search, ArrowRight, HelpCircle, Sparkles } from "lucide-react";

interface FAQProps {
  onOpenEnquiry: () => void;
}

const faqs = [
  {
    question: "What is Agentic AI and how does it benefit B2B operations?",
    answer: "Agentic AI refers to autonomous systems capable of executing complex business logic with minimal human intervention. For B2B, this means faster lead processing, automated CRM synchronization, and self-correcting workflows that reduce operational overhead."
  },
  {
    question: "What's the difference between AI automation and agentic AI?",
    answer: "Traditional automation follows fixed, predefined rules. Agentic AI uses LLM-driven agents that reason, make decisions, and adapt their actions based on context, enabling more resilient workflows that handle exceptions without constant human intervention."
  },
  {
    question: "What industries do you serve with your consultancy?",
    answer: "I specialize in high-growth B2B sectors, focusing on AI-driven enterprise automation and agentic workflows that solve operational bottlenecks for SMEs and entrepreneurs."
  },
  {
    question: "How do you bridge the gap between business logic and agentic systems?",
    answer: "I translate abstract operational vision into executable technical roadmaps. By engineering custom LLM orchestration and RAG pipelines, I ensure that AI systems respect complex B2B business rules while delivering scalable impact."
  },
  {
    question: "What is agentic AI consulting and how does it work for B2B?",
    answer: "Agentic AI consulting means designing autonomous AI systems that execute complex business workflows — from lead enrichment and CRM sync to content scheduling — with human-in-the-loop oversight. I build custom agentic workflows using CrewAI, LangChain, and RAG pipelines tailored to each client's operational logic."
  },
  {
    question: "How does CrewAI automate LinkedIn content scheduling?",
    answer: "I engineered a Trello-driven LinkedIn automation system using CrewAI that orchestrates research and drafting agents. It enables a seamless approve-to-publish workflow: topics are queued in Trello, AI drafts the posts, and the user reviews and approves before publishing — eliminating manual overhead while maintaining full creative control."
  },
  {
    question: "Why hire an AI strategy consultant in Pune?",
    answer: "Based in Pune, I bring 16+ years of operational leadership spanning AI strategy, agentic systems, and intelligent automation. My approach bridges deep technical expertise with real-world B2B scaling experience across 250+ clients in 4 continents — combining local accessibility with global perspective."
  }
];

export const FAQ = ({ onOpenEnquiry }: FAQProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <section id="faq" className="py-24 md:py-36 bg-background relative overflow-hidden border-t border-white/[0.06]">
      <EngineeringGrid />
      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <ScrollAnimationWrapper>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="badge-eyebrow">
              <HelpCircle size={11} className="text-primary" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Direct Answers.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
              Clear insights into agentic workflows, custom B2B automation, and consultancy engagements.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={100}>
          <div className="double-bezel p-1.5 rounded-[2rem] shadow-2xl">
            <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-6 md:p-10 space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search topics (e.g. Agentic AI, CrewAI, CRM Sync)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all font-mono"
                />
              </div>

              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-white/[0.06] rounded-2xl px-5 py-1 bg-white/[0.02] data-[state=open]:bg-white/[0.04] data-[state=open]:border-primary/30 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left font-bold text-base md:text-lg text-foreground hover:no-underline hover:text-primary transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pt-1 border-t border-white/[0.04]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 text-muted-foreground space-y-2">
                  <p className="text-sm">No matching questions found for "{searchQuery}".</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-primary underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Bottom Quick Contact */}
              <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  Have a custom architectural question not listed here?
                </p>
                <button
                  onClick={onOpenEnquiry}
                  className="btn-icon-pod inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-foreground transition-all group"
                >
                  <span>Ask Directly</span>
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={12} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
