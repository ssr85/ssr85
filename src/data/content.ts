// CMS-editable content file for Sarabjeet Rattan's portfolio

export const siteConfig = {
  name: "Sarabjeet Rattan",
  initials: "SR",
  tagline: "Engineering Agentic Systems for B2B Scale",
  location: "India & Global",
  email: "sarabjit.rattan@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarabjeetrattan/",
};

export const snapshotCards = [
  {
    title: "B2B Agentic Systems",
    focus: "Auto-ReAct / LLM Ops",
    description:
      "Designing self-correcting workflows and intelligent agents that navigate complex B2B business logic autonomously.",
    icon: "Briefcase",
  },
  {
    title: "Technical Leverage",
    focus: "System Integration",
    description:
      "Bridging the operations-technology gap by engineering custom solutions to the operational bottlenecks encountered while scaling international B2B enterprises.",
    icon: "Code",
  },
  {
    title: "Proven Impact",
    focus: "Scale & Efficiency",
    description: "Demonstrated success in driving exponential growth, optimizing unit economics, and establishing rigorous KPIs for scale.",
    icon: "TrendingUp",
  },
  {
    title: "Current Thesis",
    focus: "Agent-Led Enterprise",
    description: "Advising and building tech-enabled, forward-thinking enterprises backed by robust global distribution networks.",
    icon: "Target",
  },
];

export interface CaseStudy {
  id: string;
  name: string;
  category: string;
  audience: string;
  painPoints: string[];
  description: string;
  stats: string[];
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "lead-og",
    name: "Lead OG",
    category: "Agentic Engineering / CRM Automation",
    audience: "B2B Sales Teams & SDRs",
    painPoints: [
      "Fragmented lead research",
      "Manual LinkedIn scraping overhead",
      "Slow Freshsales CRM synchronization",
      "Disconnected session management",
      "Outdated prospect context",
      "Manual bulk lead updates"
    ],
    description: "Architected a high-velocity lead organizer that automates deep prospect research and CRM synchronization. Implemented a custom storage engine for faster session caching and seamless bulk management for Freshsales.",
    stats: ["Faster Session Caching", "Automated CRM Sync", "Real-time Research"],
    techStack: ["React", "Supabase", "Tavily API", "Custom Session Engine", "Freshsales API"]
  },
  {
    id: "linked-in",
    name: "Linked-In",
    category: "Agentic Engineering / Content Automation",
    audience: "Founders & Digital Publishers",
    painPoints: [
      "Inconsistent publishing schedules",
      "Manual research & drafting overhead",
      "Creative friction in content ideation",
      "Disconnected Trello-to-Social workflows",
      "Scaling personal brand authority"
    ],
    description: "Engineered a Trello-driven LinkedIn automation system using CrewAI. Orchestrates agents for deep topic research and high-fidelity content generation, enabling a seamless HITL 'Approve-to-Publish' workflow with absolute control.",
    stats: ["Intelligent Content Drafting", "Trello-Driven Orchestration", "Human-in-the-Loop Dispatch"],
    techStack: ["Python / CrewAI", "Trello API", "LinkedIn API", "APScheduler"]
  },
  {
    id: "prospect-iq",
    name: "Prospect IQ",
    category: "Agentic Engineering / Data Intelligence",
    audience: "Marketing & Web Design Agencies",
    painPoints: [
      "Incomplete 360° prospect audits",
      "Stalled background enrichment jobs",
      "Unreliable social signal tracking",
      "Manual marketing gap analysis",
      "Scaling audit throughput",
      "Generic sales signals"
    ],
    description: "Engineered a 360° 8-pillar lead audit platform using a resilient worker-based architecture. Built custom recovery services for long-running enrichment tasks and deep marketing signal extraction.",
    stats: ["8-Pillar Audit Engine", "Faster Audit Completion", "Resilient BullMQ Workers"],
    techStack: ["Next.js 14", "BullMQ / Redis", "Supabase", "Social Scraping Engine", "Tailwind CSS"]
  },
  {
    id: "compliance-iq",
    name: "Compliance IQ",
    category: "Agentic Engineering / Regulatory RAG",
    audience: "Medical Device Manufacturers & Pharma",
    painPoints: [
      "Complex CDSCO/MDR-2017 navigation",
      "Manual regulatory document search",
      "High legal consultation costs",
      "Delayed compliance verification",
      "Ever-changing health regulations"
    ],
    description: "Developed a specialized RAG (Retrieval-Augmented Generation) pipeline for Indian medical device regulations. Navigates thousands of pages of CDSCO and MDR-2017 documentation to provide instant, cited compliance answers.",
    stats: ["Regulatory RAG pipeline", "Cited Compliance Answers", "CDSCO/MDR-2017 Context"],
    techStack: ["Python / FastAPI", "LangChain", "Pinecone Vector DB", "OpenAI GPT-4", "Regulatory PDF Parser"]
  },
  {
    id: "lume",
    name: "Lume",
    category: "Agentic Engineering / Business OS",
    audience: "B2B Freelancers & Agencies",
    painPoints: [
      "Manual proposal & invoice friction",
      "Fragmented client communications",
      "Delayed follow-up sequences",
      "Operational overhead in small teams",
      "Non-proactive system management"
    ],
    description: "Engineered a proactive 'System Master' agent that manages business operations with human-in-the-loop (HITL) oversight. Automates the entire lifecycle from context-aware email responses to dynamic invoice generation and payment tracking.",
    stats: ["Proactive HITL Operations", "Context-Aware AI Ops", "End-to-End Automation"],
    techStack: ["Python / FastAPI", "OpenAI GPT-4o", "Gmail / Stripe API", "Agentic Workflows"]
  }
];

export const strengths = [
  {
    title: "Strategic Architecture",
    description: "Translating abstract vision into executable roadmaps: market entry, precise product positioning, and scaling milestones.",
    icon: "Compass",
  },
  {
    title: "Operational Rigor",
    description: "Engineering resilient process design, aggressive cost optimization, and systemic controls to maximize throughput.",
    icon: "Settings",
  },
  {
    title: "Executive Leadership",
    description: "Assembling, mentoring, and aligning high-performance cross-functional teams to deliver against ambitious multi-year targets.",
    icon: "Users",
  },
  {
    title: "Global Expansion",
    description: "Unlocking new revenue channels and securing strategic partnerships for aggressive domestic and international market expansion.",
    icon: "Rocket",
  },
  {
    title: "System Integration",
    description: "Replacing operational debt with highly repeatable systems, utilizing modern SaaS architectures and bespoke automation.",
    icon: "Cpu",
  },
  {
    title: "Sustainable Economics",
    description: "Designing modern business models that rigorously balance aggressive profitability with long-term environmental responsibility.",
    icon: "Leaf",
  },
];

export const projects = [
  {
    id: "og-hemp",
    name: "OG Hemp",
    category: "Sustainable Enterprise",
    description:
      "Architected the comprehensive go-to-market strategy and market expansion framework for a premium hemp-products business, establishing resilient distribution networks across India.",
    highlights: ["Revenue Strategy", "Brand Architecture", "Supply Chain Resilience"],
    images: ["/images/projects/og-hemp-1.jpg", "/images/projects/og-hemp-2.jpg", "/images/projects/og-hemp-3.jpg"],
  },
  {
    id: "skaizen-water",
    name: "Skaizen Water",
    category: "Operations Optimization",
    description: "Optimized water purification operations via end-to-end automation logistics, successfully accelerating total B2B customer acquisition and retention.",
    highlights: ["Workflow Automation", "B2B Expansion", "Quality Assurance"],
    images: [
      "/images/projects/skaizen-water-1.jpg",
      "/images/projects/skaizen-water-2.jpg",
      "/images/projects/skaizen-water-3.jpg",
    ],
  },
  {
    id: "tech-automation",
    name: "Internal Automation Suite",
    category: "Technical Implementation",
    description: "Developed and deployed custom web applications and deep automation pipelines to bypass operational bottlenecks and surface real-time executive metrics.",
    highlights: ["Full-Stack Development", "Process Automation", "Executive Analytics"],
    images: [
      "/images/projects/tech-automation-1.jpg",
      "/images/projects/tech-automation-2.jpg",
      "/images/projects/tech-automation-3.jpg",
    ],
  },
  {
    id: "international-bd",
    name: "Global Market Entry",
    category: "Strategic Growth",
    description: "Spearheaded complex market-entry efforts, navigating international compliance frameworks to secure pivotal partner relationships for multi-continent exports.",
    highlights: ["Global Strategy", "Alliance Building", "Export Compliance"],
    images: [
      "/images/projects/international-bd-1.jpg",
      "/images/projects/international-bd-2.jpg",
      "/images/projects/international-bd-3.jpg",
    ],
  },
];

export const services = [
  {
    title: "Operations Architecture",
    description: "Comprehensive operational audits yielding actionable blueprints to radically increase efficiency, lower COGS, and unblock scale.",
    icon: "Settings",
  },
  {
    title: "GTM Strategy & Positioning",
    description: "Go-to-market orchestration for novel sustainable products, optimizing for sharp positioning, high-margin channels, and unit economics.",
    icon: "Leaf",
  },
  {
    title: "Digital Transformation",
    description: "Designing bespoke internal web applications and automation flows that eliminate massive manual bottlenecks.",
    icon: "Code",
  },
  {
    title: "International Expansion",
    description: "Sourcing robust global partners, advising on complex compliance, and executing practical, risk-managed market-entry operations.",
    icon: "Globe",
  },
];

export const beyondWork = [
  {
    title: "Global Travel",
    description: "Extracting strategic insights from unfamiliar cross-cultural environments.",
    icon: "Plane",
    details: ["12+ Countries", "Multi-Cultural Environments", "Market Nuances"]
  },
  {
    title: "Continuous Learning",
    description: "Deep-diving into tech trends and macro business strategy.",
    icon: "BookOpen",
    details: ["Tech Trends", "System/Design Thinking", "Geopolitics"]
  },
  {
    title: "Physical Resilience",
    description: "Mind, Body, Work. Cultivating the stamina required for leadership.",
    icon: "Dumbbell",
    details: ["Mind-Body-Work Framework", "Strength Training", "High-Performance Habit"]
  },
  {
    title: "Mentorship",
    description: "Providing high-leverage strategic shortcuts to the next generation of operational leaders.",
    icon: "GraduationCap",
    details: ["Operational Scale", "Strategic Thinking", "Career Coaching", "Leadership"]
  },
];
