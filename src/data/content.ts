// CMS-editable content file for Sarabjeet Rattan's portfolio

export const navLinks = [
  { label: "Expertise", href: "#snapshot", id: "snapshot" },
  { label: "Case Studies", href: "#case-studies", id: "case-studies" },
  { label: "Strengths", href: "#strengths", id: "strengths" },
  { label: "Services", href: "#services", id: "services" },
];

export const heroTags = [
  "B2B AI Solutions",
  "Agentic Systems",
  "Industry Logic",
  "Intelligent Workflows",
  "Hemp Supply Chains",
  "Resilient Intelligence",
];

export const stats = [
  { value: 16, suffix: "+", label: "Years Experience" },
  { value: 250, suffix: "+", label: "Clients" },
  { value: 80, suffix: "%", label: "Repeat Collab" },
  { value: 4, suffix: "", label: "Continents Served" },
];

export const siteConfig = {
  name: "Sarabjeet Rattan",
  initials: "SR",
  tagline: "B2B AI Specialist: Bridging Industry Logic & Agentic Systems",
  location: "India & Global",
  email: "sarabjit.rattan@gmail.com",
  phone: "+91-866-898-4323",
  linkedin: "https://www.linkedin.com/in/sarabjeetrattan/",
  github: "https://github.com/ssr85",
  website: "https://www.sarabjeetrattan.com",
  meta: {
    title: "Sarabjeet Rattan | B2B AI Specialist India | Agentic Systems",
    description: "B2B AI Specialist & Industrial Hemp Consultant. Expert in agentic engineering, sustainable supply chains (pulp, composites, moulded products), and scaling complex business logic.",
    keywords: ["B2B AI Specialist India", "Agentic Systems", "b2b ai solutions", "Hemp Paper Supply Chain", "hemp packaging", "hemp paper pulp", "composite packaging", "moulded hemp products", "industrial hemp consultancy"]
  }
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
    category: "B2B AI Solutions / CRM Automation",
    audience: "B2B Sales Teams & SDRs",
    painPoints: [
      "Fragmented lead research",
      "Manual LinkedIn scraping overhead",
      "Slow Freshsales CRM synchronization",
      "Disconnected session management",
      "Outdated prospect context",
      "Manual bulk lead updates"
    ],
    description: "Architected a high-velocity B2B AI solution for lead organization that automates deep prospect research and CRM synchronization. Implemented a custom storage engine for faster session caching and seamless bulk management for Freshsales.",
    stats: ["Agentic Research Engine", "Automated CRM Sync", "Real-time B2B Intelligence"],
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
      "Architected the comprehensive go-to-market strategy for premium hemp-products, focusing on hemp paper pulp, composite packaging, and moulded hemp products. Engineered a resilient Hemp Paper Supply Chain model to optimize domestic and international niche distribution.",
    highlights: ["Revenue Strategy", "Hemp Paper Pulp & Composites", "Moulded Product Packaging"],
    images: [
      "/images/projects/og-hemp-1.jpg", 
      "/images/projects/og-hemp-cover.png",
      "/images/projects/og-hemp-2.jpg"
    ],
  },
  {
    id: "skaizen-water",
    name: "Skaizen Water",
    category: "Operations Optimization",
    description: "Optimized water purification operations via end-to-end automation logistics, successfully accelerating total B2B customer acquisition and retention.",
    highlights: ["Workflow Automation", "B2B Expansion", "Quality Assurance"],
    images: ["/images/projects/skaizen-cover.png"],
  },
  {
    id: "tech-automation",
    name: "Internal Automation Suite",
    category: "Technical Implementation",
    description: "Developed and deployed custom web applications and deep automation pipelines to bypass operational bottlenecks and surface real-time executive metrics.",
    highlights: ["Full-Stack Development", "Process Automation", "Executive Analytics"],
    images: ["/images/projects/automation-cover.png"],
  },
  {
    id: "international-bd",
    name: "Global Market Entry",
    category: "Strategic Growth",
    description: "Spearheaded complex market-entry efforts, navigating international compliance frameworks to secure pivotal partner relationships for multi-continent exports.",
    highlights: ["Global Strategy", "Alliance Building", "Export Compliance"],
    images: ["/images/projects/global-market-cover.png"],
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
