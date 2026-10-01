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
import { Search, ArrowRight } from "lucide-react";

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
    <section id="faq" className="py-24 bg-muted/30 relative overflow-hidden">
      <EngineeringGrid opacity={0.02} />
      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <ScrollAnimationWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Quick insights into B2B AI systems and agentic workflows for growing businesses.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={100}>
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Find an answer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0 py-2">
                    <AccordionTrigger className="text-left font-semibold text-base hover:no-underline hover:text-primary transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No matching questions found.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Still have questions?
              </p>
              <Button
                onClick={onOpenEnquiry}
                size="sm"
                className="rounded-full gap-2"
              >
                Let's Connect <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
