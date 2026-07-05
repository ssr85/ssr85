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
  location: "Pune, India & Global",
  email: "sarabjit.rattan@gmail.com",
  phone: "+91-866-898-4323",
  linkedin: "https://www.linkedin.com/in/sarabjeetrattan/",
  github: "https://github.com/ssr85",
  website: "https://www.sarabjeetrattan.com",
  meta: {
    title: "Sarabjeet Rattan | B2B AI Strategy & Agentic Systems Consultant | Pune",
    description: "B2B AI Specialist & Agentic Systems Consultant. Expert in AI strategy, intelligent automation, and scalable operations for SMEs and entrepreneurs.",
    keywords: ["B2B AI Specialist India", "Agentic Systems", "B2B AI Solutions", "Agentic AI Consulting", "AI Strategy Consultant", "Pune AI Consultant", "Intelligent Automation", "B2B AI Strategy"]
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

export interface CaseStudySection {
  title: string;
  content: string[];
  highlights?: string[];
}

export interface CaseStudy {
  id: string;
  name: string;
  category: string;
  audience: string;
  painPoints: string[];
  description: string;
  stats: string[];
  techStack: string[];
  hasDetailPage?: boolean;
  slug?: string;
  heroImage?: string;
  duration?: string;
  role?: string;
  sections?: CaseStudySection[];
  keyMetrics?: { label: string; value: string }[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
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
    techStack: ["React", "Supabase", "Tavily API", "Custom Session Engine", "Freshsales API"],
    hasDetailPage: true,
    slug: "lead-og",
    sections: [
      { title: "The Problem", content: ["Placeholder — full narrative to be written."] },
      { title: "The Approach", content: ["Placeholder — full narrative to be written."] },
      { title: "Architecture Deep-Dive", content: ["Placeholder — full narrative to be written."] },
      { title: "Results & Impact", content: ["Placeholder — full narrative to be written."] },
    ],
    seo: {
      metaTitle: "Lead OG Case Study | Agentic B2B Lead Research Engine — Sarabjeet Rattan",
      metaDescription: "How I architected a high-velocity B2B AI solution for automated lead research and CRM synchronization using Supabase, Tavily API, and Freshsales.",
      keywords: ["Lead OG", "B2B AI", "CRM Automation", "Agentic Research", "Freshsales API"],
    },
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
    techStack: ["Python / CrewAI", "Trello API", "LinkedIn API", "APScheduler"],
    hasDetailPage: true,
    slug: "linked-in",
    sections: [
      { title: "The Problem", content: ["Placeholder — full narrative to be written."] },
      { title: "The Approach", content: ["Placeholder — full narrative to be written."] },
      { title: "Architecture Deep-Dive", content: ["Placeholder — full narrative to be written."] },
      { title: "Results & Impact", content: ["Placeholder — full narrative to be written."] },
    ],
    seo: {
      metaTitle: "Linked-In Case Study | CrewAI Content Automation Engine — Sarabjeet Rattan",
      metaDescription: "How I engineered a Trello-driven LinkedIn automation system using CrewAI for intelligent content drafting with human-in-the-loop publishing.",
      keywords: ["LinkedIn Automation", "CrewAI", "Content Automation", "Trello Integration", "HITL"],
    },
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
    id: "content-og",
    name: "ContentOG",
    category: "SEO Intelligence / Content Strategy",
    audience: "Content teams, SEO agencies, and publishers needing data-driven content strategies at scale",
    painPoints: [
      "Manual SERP research takes hours and misses competitors",
      "No systematic way to identify content gaps and topic clusters",
      "Content strategies rely on intuition rather than data",
      "Disconnected research-to-publishing workflows",
    ],
    description: "An autonomous SEO intelligence system that discovers ranking opportunities, extracts People Also Ask questions, crawls content, generates embeddings, detects topic clusters, and produces data-driven content strategies — all without manual intervention.",
    stats: [
      "End-to-end automation from SERP discovery to strategy generation",
      "Multi-agent pipeline: Discovery → PAA → Crawl → Embed → Cluster → Strategize",
      "Vector embeddings for semantic topic clustering",
    ],
    techStack: ["Python", "CrewAI", "Supabase", "pgvector", "OpenAI", "SERP API"],
  },
  {
    id: "linkedin-leadgen",
    name: "LinkedIn LeadGen",
    category: "B2B Outreach / Agentic Automation",
    audience: "B2B sales teams and agencies needing compliant, automated LinkedIn outreach at scale",
    painPoints: [
      "Manual LinkedIn outreach doesn't scale beyond a handful of prospects",
      "Automated outreach risks account bans without proper rate limiting",
      "No way to orchestrate multi-step sequences with human oversight",
      "Browser automation is fragile without proper fingerprint masking",
    ],
    description: "A hybrid B2B LinkedIn outreach system combining headless browser automation (Playwright/OpenOutreach) with LangGraph orchestration, LinkedIn's enterprise-grade rate limiting (iris, luminol, detext, gdmix), and VPN-isolated worker topology for compliant, large-scale prospect engagement.",
    stats: [
      "9-layer architecture: browser automation to VPN isolation to rate limiting",
      "LangGraph supervisor handles state machine, retries, and agent routing",
      "Enterprise rate limiting via LinkedIn's open-source infrastructure stack",
      "Full OpenTelemetry tracing across every agent and proxy request",
    ],
    techStack: ["LangGraph", "Playwright", "OpenOutreach", "Docker", "Gluetun VPN", "OpenTelemetry"],
  },
  {
    id: "multimodal-rag",
    name: "Multimodal RAG Framework",
    category: "Enterprise Document AI / Knowledge Retrieval",
    audience: "Enterprises needing to index and query multimodal content (PDFs, images, video) from cloud storage",
    painPoints: [
      "Traditional RAG systems can't handle images and video alongside text",
      "Google Drive content is siloed and unsearchable across formats",
      "No unified pipeline for multimodal indexing and agentic retrieval",
      "Embedding models lack support for mixed-media document understanding",
    ],
    description: "A production-ready agentic RAG framework that indexes multimodal content (PDFs, images, video) from Google Drive using Google ADK orchestration. Features two-pass indexing with dense multimodal summaries, 768-dimension Gemini embeddings, and agentic retrieval with Gemini 3 Flash reasoning.",
    stats: [
      "Multimodal indexing: PDF, images, and video from Google Drive",
      "Two-pass indexing with high-density multimodal summaries",
      "768-dimension Gemini Embedding 2 vectors with MRL support",
      "Agentic orchestration via Google ADK with Gemini 3 Flash reasoning",
    ],
    techStack: ["Google ADK", "Gemini 3 Flash", "Gemini Embedding 2", "Supabase", "pgvector", "Google Drive API"],
  },
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
      "Architected the comprehensive go-to-market strategy for premium hemp-products, focusing on hemp paper pulp, composite packaging, and moulded hemp products. As an industrial hemp packaging consultant, engineered a resilient Hemp Paper Supply Chain model to optimize domestic and international niche distribution.",
    highlights: ["Revenue Strategy", "Hemp Paper Pulp & Composites", "Moulded Product Packaging"],
    images: [
      "/images/projects/og-hemp-1.webp", 
      "/images/projects/og-hemp-cover.webp",
      "/images/projects/og-hemp-2.webp"
    ],
  },
  {
    id: "skaizen-water",
    name: "Skaizen Water",
    category: "Operations Optimization",
    description: "Optimized water purification operations via end-to-end automation logistics, successfully accelerating total B2B customer acquisition and retention.",
    highlights: ["Workflow Automation", "B2B Expansion", "Quality Assurance"],
    images: ["/images/projects/skaizen-cover.webp"],
  },
  {
    id: "tech-automation",
    name: "Internal Automation Suite",
    category: "Technical Implementation",
    description: "Developed and deployed custom web applications and deep automation pipelines to bypass operational bottlenecks and surface real-time executive metrics.",
    highlights: ["Full-Stack Development", "Process Automation", "Executive Analytics"],
    images: ["/images/projects/automation-cover.webp"],
  },
  {
    id: "international-bd",
    name: "Global Market Entry",
    category: "Strategic Growth",
    description: "Spearheaded complex market-entry efforts, navigating international compliance frameworks to secure pivotal partner relationships for multi-continent exports.",
    highlights: ["Global Strategy", "Alliance Building", "Export Compliance"],
    images: ["/images/projects/global-market-cover.webp"],
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
