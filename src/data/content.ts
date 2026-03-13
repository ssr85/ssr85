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
    description:
      "Designing self-correcting workflows and intelligent agents that navigate complex B2B business logic autonomously.",
    icon: "Briefcase",
  },
  {
    title: "Technical Leverage",
    description:
      "Bridging the operations-technology gap by deploying custom automation, data pipelines, and internal tools that eliminate friction.",
    icon: "Code",
  },
  {
    title: "Proven Impact",
    description:
      "Demonstrated success in driving exponential growth, optimizing unit economics, and establishing rigorous KPIs for scale.",
    icon: "TrendingUp",
  },
  {
    title: "Current Thesis",
    description:
      "Advising and building tech-enabled, forward-thinking enterprises backed by robust global distribution networks.",
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
    id: "lume",
    name: "Lume",
    category: "Agentic Engineering / AI Automation",
    audience: "B2B Freelancers & Agencies",
    painPoints: ["Manual billing and proposal generation", "Delayed payment tracking", "Lead follow-up friction"],
    description:
      "Engineered a proactive, context-aware AI agent that automates complex business workflows. Lume acts as a 'System Master,' managing email communications and dynamic invoice generation autonomously.",
    stats: ["Context-Aware AI", "Automated Workflows", "Dynamic PDF Generation"],
    techStack: ["Python/FastAPI", "OpenAI GPT-4o", "Gmail API", "Prompt Engineering"],
  },
  {
    id: "lead-og",
    name: "Lead OG",
    category: "Agentic Engineering / Lead Gen",
    audience: "B2B Sales Teams & SDRs",
    painPoints: ["Shallow lead context", "Manual LinkedIn/Web research", "Generic B2B contact strategies"],
    description:
      "AI-powered CRM enrichment agent designed to transform raw leads into actionable enterprise opportunities through intelligent research and social scraping.",
    stats: ["Social Enrichment", "CRM Integration", "Real-time Dashboard"],
    techStack: ["React", "Supabase", "Tavily API", "LinkedIn Scraping", "Freshsales"],
  },
  {
    id: "prospect-iq",
    name: "Prospect IQ",
    category: "Agentic Engineering / Data Intelligence",
    audience: "Marketing & Web Design Agencies",
    painPoints: ["Analyzing prospect footprints at scale", "Generic sales outreach", "Manual audit overhead"],
    description:
      "Sophisticated lead intelligence platform with resilient background workers and recovery services for stalled audits. Provides deep gap analysis for B2B marketing.",
    stats: ["Data Enrichment", "Resilient Architecture", "Gap Analysis"],
    techStack: ["Next.js", "Supabase", "Social Scraping Engne", "Tailwind CSS"],
  },
];

export const strengths = [
  {
    title: "Strategic Architecture",
    description:
      "Translating abstract vision into executable roadmaps: market entry, precise product positioning, and scaling milestones.",
    icon: "Compass",
  },
  {
    title: "Operational Rigor",
    description:
      "Engineering resilient process design, aggressive cost optimization, and systemic controls to maximize throughput.",
    icon: "Settings",
  },
  {
    title: "Executive Leadership",
    description:
      "Assembling, mentoring, and aligning high-performance cross-functional teams to deliver against ambitious multi-year targets.",
    icon: "Users",
  },
  {
    title: "Global Expansion",
    description:
      "Unlocking new revenue channels and securing strategic partnerships for aggressive domestic and international market dominance.",
    icon: "Rocket",
  },
  {
    title: "System Integration",
    description:
      "Replacing operational debt with highly repeatable systems, utilizing modern SaaS architectures and bespoke automation.",
    icon: "Cpu",
  },
  {
    title: "Sustainable Economics",
    description:
      "Designing modern business models that rigorously balance aggressive profitability with long-term environmental responsibility.",
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
    description:
      "Radically transformed water purification operations via end-to-end automation logistics, successfully accelerating total B2B customer acquisition and retention.",
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
    description:
      "Developed and deployed custom web applications and deep automation pipelines to bypass operational bottlenecks and surface real-time executive metrics.",
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
    description:
      "Spearheaded complex market-entry efforts, navigating international compliance frameworks to secure pivotal partner relationships for multi-continent exports.",
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
    description:
      "Comprehensive operational audits yielding actionable blueprints to radically increase efficiency, lower COGS, and unblock scale.",
    icon: "Settings",
  },
  {
    title: "GTM Strategy & Positioning",
    description:
      "Go-to-market orchestration for novel sustainable products, optimizing for sharp positioning, high-margin channels, and unit economics.",
    icon: "Leaf",
  },
  {
    title: "Digital Transformation",
    description:
      "Designing bespoke internal web applications and automation flows that eliminate massive manual bottlenecks.",
    icon: "Code",
  },
  {
    title: "International Expansion",
    description:
      "Sourcing robust global partners, advising on complex compliance, and executing practical, risk-managed market-entry operations.",
    icon: "Globe",
  },
];

export const beyondWork = [
  {
    title: "Global Travel",
    description: "Extracting strategic insights from unfamiliar cross-cultural environments.",
    icon: "Plane",
  },
  {
    title: "Continuous Learning",
    description: "Deep-diving into bleeding-edge technology trends and macro business strategy.",
    icon: "BookOpen",
  },
  {
    title: "Physical Resilience",
    description: "Mind, Body, Work. Cultivating the stamina required for high-stakes leadership.",
    icon: "Dumbbell",
  },
  {
    title: "Mentorship",
    description: "Providing high-leverage strategic shortcuts to the next generation of operational leaders.",
    icon: "GraduationCap",
  },
];
