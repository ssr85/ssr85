import { FileDown, Home, Loader2, Phone, Mail, Linkedin, Github, Globe, MapPin } from "lucide-react";
import { siteConfig } from "@/data/content";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { executeRecaptcha } from "@/lib/recaptcha";

// ─── Reusable section heading ────────────────────────────────────────────────
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontSize: "8.5pt",
      fontWeight: 700,
      textTransform: "uppercase" as const,
      letterSpacing: "0.13em",
      color: "#111",
      borderBottom: "1.5px solid #111",
      paddingBottom: "2px",
      marginBottom: "7px",
    }}
  >
    {children}
  </h2>
);

// ─── Bullet row ──────────────────────────────────────────────────────────────
const Bullet = ({ text }: { text: string }) => (
  <li style={{ display: "flex", gap: "6px", marginBottom: "2px", alignItems: "flex-start" }}>
    <span style={{ color: "#555", flexShrink: 0, marginTop: "1.5px", fontSize: "7pt" }}>●</span>
    <span style={{ fontSize: "9pt", color: "#333", lineHeight: "1.45" }}>{text}</span>
  </li>
);

// ─── Main component ──────────────────────────────────────────────────────────
const Resume = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePrint = async () => {
    setIsVerifying(true);
    try {
      const token = await executeRecaptcha("download_resume");
      if (!token) {
        toast.error("Verification failed. Please try again.");
        return;
      }
      window.print();
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 print:min-h-0 print:bg-transparent">
      <SEO 
        title="Resume | Sarabjeet Rattan" 
        description="Professional resume of Sarabjeet Rattan, B2B AI Specialist & Operations Leader. Expert in Agentic Systems and Industrial Hemp Consultancy."
        url="https://sarabjeetrattan.com/resume"
      />
      {/* ── Print Toolbar ─────────────────────────────────────────────────── */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Home size={15} />
            Back to Portfolio
          </Link>
          <Button
            onClick={handlePrint}
            disabled={isVerifying}
            className="gap-2 text-sm"
            size="sm"
          >
            {isVerifying ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <FileDown size={14} />
            )}
            {isVerifying ? "Verifying…" : "Print / Save as PDF"}
          </Button>
        </div>
      </div>

      {/* ── Resume Canvas ─────────────────────────────────────────────────── */}
      <div className="resume-wrapper py-8 print:py-0">
        <div className="resume-page bg-white mx-auto shadow-xl print:shadow-none">

          {/* ═══════════════════ HEADER ═══════════════════════════════════ */}
          <div
            style={{
              borderBottom: "2px solid #111",
              paddingBottom: "10px",
              marginBottom: "12px",
            }}
          >
            <h1
              style={{
                fontSize: "24pt",
                fontWeight: 800,
                color: "#0d0d0d",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                marginBottom: "3px",
              }}
            >
              Sarabjeet Rattan
            </h1>
            <p
              style={{
                fontSize: "9.5pt",
                color: "#444",
                letterSpacing: "0.02em",
                marginBottom: "6px",
              }}
            >
              AI Product &amp; Operations Leader &nbsp;·&nbsp; Agentic Systems &nbsp;·&nbsp; B2B Transformation &nbsp;·&nbsp; Industrial Hemp Products
            </p>
            {/* Contact row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0 14px",
                fontSize: "8.5pt",
                color: "#444",
                alignItems: "center"
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Phone size={10} style={{ color: "#111" }} />
                {siteConfig.phone}
              </span>
              <a 
                href={`mailto:${siteConfig.email}`} 
                style={{ color: "#1a56db", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Mail size={10} style={{ color: "#111" }} />
                {siteConfig.email}
              </a>
            
              <a 
                href={siteConfig.linkedin} 
                style={{ color: "#1a56db", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Linkedin size={10} style={{ color: "#111" }} />
                /sarabjeetrattan
              </a>
              <a 
                href={siteConfig.website} 
                style={{ color: "#1a56db", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Globe size={10} style={{ color: "#111" }} />
                sarabjeetrattan.com
              </a>
              <a 
                href={siteConfig.github} 
                style={{ color: "#1a56db", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Github size={10} style={{ color: "#111" }} />
                github.com/ssr85
              </a>
            </div>
          </div>

          {/* ═══════════════════ SUMMARY ══════════════════════════════════ */}
          <div style={{ marginBottom: "11px" }}>
            <SectionHeading>Professional Summary</SectionHeading>
            <p
              style={{
                fontSize: "9.5pt",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              Results-driven Operations Leader with 16+ years in sustainable B2B industries, combining a
              lifelong instinct for technology with hands-on automation experience — from scripting workflows
              in Sheets to engineering full multi-agent AI systems. Skilled in product strategy, international
              market expansion, and agentic system design.
            </p>
          </div>

          {/* ═══════════════════ EDUCATION ════════════════════════════════ */}
          <div style={{ marginBottom: "11px" }}>
            <SectionHeading>Education</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[
                {
                  degree: "Product Management with Generative & Agentic AI",
                  school: "BITS School of Management, Mumbai",
                  dates: "07/2025 – 03/2026",
                },
                {
                  degree: "Master in International Business",
                  school: "Grenoble Graduate School of Business, London",
                  dates: "09/2009 – 07/2011",
                },
                {
                  degree: "Bachelor of Engineering",
                  school: "RTM Nagpur University, Nagpur",
                  dates: "08/2004 – 07/2007",
                },
              ].map((e) => (
                <div
                  key={e.degree}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
                >
                  <div>
                    <span style={{ fontSize: "9.5pt", fontWeight: 600, color: "#111" }}>{e.degree}</span>
                    <span style={{ fontSize: "9pt", color: "#555" }}> · {e.school}</span>
                  </div>
                  <span style={{ fontSize: "8.5pt", color: "#666", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {e.dates}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════════ SKILLS ═══════════════════════════════════ */}
          <div style={{ marginBottom: "11px" }}>
            <SectionHeading>Skills</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {[
                {
                  label: "Product Execution",
                  value: "User Stories, Backlog Management, Product Roadmapping, PRD Writing, A/B Testing",
                },
                {
                  label: "Strategy & Research",
                  value: "Competitive Analysis, Market Research, User Research, GTM Strategy",
                },
                {
                  label: "AI & Agentic",
                  value: "LLM Ops, RAG Pipelines, Multi-Agent Orchestration, CrewAI, LangChain",
                },
                {
                  label: "Tools",
                  value:
                    "Notion, Figma, Miro, React, Next.js, Supabase, FastAPI, Python, BullMQ/Redis, OpenAI GPT-4, GitHub, Vercel",
                },
                {
                  label: "Soft Skills",
                  value:
                    "Cross-Cultural Intelligence (10+ regions), Strategic Negotiation, Narrative Building, & Adaptive Leadership",
                },
              ].map((s) => (
                <p key={s.label} style={{ fontSize: "9pt", color: "#333", lineHeight: "1.4" }}>
                  <strong style={{ fontWeight: 600, color: "#111" }}>{s.label}:</strong> {s.value}
                </p>
              ))}
            </div>
          </div>

          {/* ═══════════════════ PROJECTS ═════════════════════════════════ */}
          <div style={{ marginBottom: "11px" }}>
            <SectionHeading>Projects</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>

              {/* ── Project 1: Lead OG ────────────────────────────────── */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "1px",
                  }}
                >
                  <span style={{ fontSize: "9.5pt", fontWeight: 700, color: "#111" }}>
                    Lead OG &nbsp;|&nbsp;
                    <span style={{ fontWeight: 400, fontSize: "8.5pt", color: "#555" }}>
                      React · Supabase · Tavily API · Freshsales API
                    </span>
                  </span>
                  <span style={{ fontSize: "8pt", color: "#666", whiteSpace: "nowrap", marginLeft: "10px" }}>
                    CRM Automation · B2B Sales Teams
                  </span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Bullet text="A high-velocity lead enrichment & responder platform automating prospect research and CRM sync via Freshsales API." />
                  <Bullet text="Designed a custom session caching engine for data freshness, context based reponses with historic considerations" />
                  <Bullet text="End-to-end build from user research through live signal extraction, intent analysis, history, enrichment, and communication." />
                </ul>
              </div>

              {/* ── Project 2: Auto_LinkedIn ──────────────────────────── */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "1px",
                  }}
                >
                  <span style={{ fontSize: "9.5pt", fontWeight: 700, color: "#111" }}>
                    Auto-LinkedIn &nbsp;|&nbsp;
                    <span style={{ fontWeight: 400, fontSize: "8.5pt", color: "#555" }}>
                      Python · CrewAI · Trello API · LinkedIn API · APScheduler
                    </span>
                  </span>
                  <a
                    href="https://github.com/ssr85/Auto_LinkedIn"
                    style={{ fontSize: "8pt", color: "#1a56db", textDecoration: "none", whiteSpace: "nowrap", marginLeft: "10px" }}
                  >
                    github.com/ssr85/Auto_LinkedIn
                  </a>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Bullet text="Engineered a Trello-driven LinkedIn automation system using CrewAI, for topic research and high-fidelity content generation." />
                  <Bullet text="Human-in-the-Loop (HITL), Approve-to-Publish workflow enabling founders to maintain brand voice control at scale." />
                  <Bullet text="Orchestrated multi-agent research-to-dispatch pipelines with APScheduler, enabling publishing without manual overhead." />
                </ul>
              </div>

              {/* ── Project 3: Prospect IQ ────────────────────────────── */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "1px",
                  }}
                >
                  <span style={{ fontSize: "9.5pt", fontWeight: 700, color: "#111" }}>
                    Prospect IQ &nbsp;|&nbsp;
                    <span style={{ fontWeight: 400, fontSize: "8.5pt", color: "#555" }}>
                      Next.js 14 · BullMQ/Redis · Supabase · Tailwind CSS
                    </span>
                  </span>
                  <a
                    href="https://github.com/ssr85/ProspectIQ"
                    style={{ fontSize: "8pt", color: "#1a56db", textDecoration: "none", whiteSpace: "nowrap", marginLeft: "10px" }}
                  >
                    github.com/ssr85/ProspectIQ
                  </a>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Bullet text="Engineered an 8-pillar lead audit platform using resilient BullMQ worker architecture for high-throughput enrichment." />
                  <Bullet text="An end-to-end audit covering social signals, marketing gaps, and background intelligence extraction." />
                  <Bullet text="Built custom recovery services for long-running enrichment jobs, significantly improving audit completion rate and reliability." />
                </ul>
              </div>

            </div>
          </div>

          {/* ═══════════════════ WORK EXPERIENCE ══════════════════════════ */}
          <div style={{ marginBottom: "11px" }}>
            <SectionHeading>Work Experience</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

              {/* ── SkaizenTech ──────────────────────────────────────── */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px" }}>
                    <span style={{ fontSize: "9.5pt", fontWeight: 700, color: "#111" }}>Business Head</span>
                    <span style={{ fontSize: "9pt", color: "#555" }}> · Skaizen Technotrades · Pune</span>
                  </div>
                  <span style={{ fontSize: "8.5pt", color: "#666" }}>01/2020 – Present</span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Bullet text="Directing transformation & automation blueprints for 3+ SMEs, automating workflows via AI-driven architectures." />
                  <Bullet text="Leveraging industry experience to provision fully automated, last-mile potable water and testing services for SMEs." />
                </ul>
              </div>

              {/* ── OG Hemp ──────────────────────────────────────────── */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px" }}>
                    <span style={{ fontSize: "9.5pt", fontWeight: 700, color: "#111" }}>International Business</span>
                    <span style={{ fontSize: "9pt", color: "#555" }}> · OG Hemp Pvt. Ltd. · Kolkata</span>
                  </div>
                  <span style={{ fontSize: "8.5pt", color: "#666" }}>01/2017 – Present</span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Bullet text="International GTM and comliance strategy across 10+ countries for premium B2B sustainable brand placement" />
                  <Bullet text="Managing global partnerships & market-entry/development for newer regions with compliance considerations." />
                  <Bullet text="New Product Development for white-labelled solutions in all categories, paper, pulp, & composites." />
                </ul>
              </div>

              {/* ── Tech Mahindra (one-liner) ─────────────────────────── */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px" }}>
                    <span style={{ fontSize: "9.5pt", fontWeight: 700, color: "#111" }}>Technical Associate</span>
                    <span style={{ fontSize: "9pt", color: "#555" }}> · Tech Mahindra Ltd. · Pune</span>
                  </div>
                  <span style={{ fontSize: "8.5pt", color: "#666" }}>06/2007 – 09/2009</span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <Bullet text="Gained foundational exposure to software development, business analysis, and continuous deployment on live client projects." />
                </ul>
              </div>

            </div>
          </div>

          {/* ═══════════════════ CERTIFICATIONS ════════════════════════════ */}
          <div>
            <SectionHeading>Certifications</SectionHeading>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontSize: "9pt", color: "#333" }}>
                <strong style={{ fontWeight: 600 }}>Entrepreneurship with Design Thinking</strong>
                {" "}· Symbiosis (SCEI) · 09/2020 – 11/2020
              </p>
              <a
                href="https://drive.google.com/file/d/1h_I-TR28JG9ckbU7aP6K4nOz0iFU20jO/view?usp=sharing"
                style={{
                  fontSize: "8pt",
                  color: "#1a56db",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                View Certificate ↗
              </a>
            </div>
          </div>

          {/* ═══════════════════ FOOTER ═══════════════════════════════════ */}
          <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #eee", display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "7.5pt", color: "#666", display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={10} style={{ color: "#111" }} />
              Pune, India
            </p>
          </div>

        </div>
      </div>

      {/* ── Print + Layout CSS ──────────────────────────────────────────────── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .grecaptcha-badge { display: none !important; }

            .resume-wrapper {
              max-width: 210mm;
              margin: 0 auto;
            }

            .resume-page {
              width: 210mm;
              min-height: 297mm;
              padding: 11mm 14mm 10mm 14mm;
              box-sizing: border-box;
              font-family: 'Georgia', 'Times New Roman', serif;
              display: flex;
              flex-direction: column;
            }

            @media print {
              * { margin: 0; box-sizing: border-box; }
              @page { size: A4; margin: 0 !important; }
              html, body, #root {
                width: 210mm !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              .resume-wrapper {
                width: 210mm !important;
                max-width: 210mm !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .resume-page {
                width: 210mm !important;
                height: 297mm !important;
                min-height: 297mm !important;
                max-height: 297mm !important;
                margin: 0 !important;
                padding: 11mm 14mm 10mm 14mm !important;
                box-shadow: none !important;
                overflow: hidden !important;
                page-break-after: avoid;
              }
            }

            @media screen and (max-width: 900px) {
              .resume-wrapper { max-width: 100%; }
              .resume-page { width: 100%; min-height: auto; padding: 8vw; }
            }
          `,
        }}
      />
    </div>
  );
};

export default Resume;