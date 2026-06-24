import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

const faqs = [
  {
    question: "What is Agentic AI and how does it benefit B2B operations?",
    answer: "Agentic AI refers to autonomous systems capable of executing complex business logic with minimal human intervention. For B2B, this means faster lead processing, automated CRM synchronization, and self-correcting workflows that reduce operational overhead."
  },
  {
    question: "Why choose Industrial Hemp for sustainable packaging solutions?",
    answer: "Industrial Hemp is a carbon-negative crop that produces high-strength fibers. It is ideal for hemp paper pulp, bio-composites, and moulded products, offering a biodegradable and high-performance alternative to traditional plastic and paper."
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

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto max-w-4xl">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Quick insights into B2B AI systems and agentic workflows for growing businesses.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={100}>
          <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0 py-2">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
