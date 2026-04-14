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
    answer: "I specialize in high-growth B2B sectors, specifically focusing on AI-driven enterprise automation and the global Industrial Hemp supply chain, including sustainable packaging and bio-composite manufacturing."
  },
  {
    question: "How do you bridge the gap between business logic and agentic systems?",
    answer: "I translate abstract operational vision into executable technical roadmaps. By engineering custom LLM orchestration and RAG pipelines, I ensure that AI systems respect complex B2B business rules while delivering scalable impact."
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
              Quick insights into B2B AI systems and sustainable industrial hemp consultancy.
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
