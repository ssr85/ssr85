import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Link } from "react-router-dom";
import {
  HardDrive,
  Cpu,
  Terminal,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const LocalLlmStudio = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Running Local LLMs with LM Studio for Dev Workflows | Sarabjeet Rattan"
        description="Guide to running open-weight coding models (Qwen 2.5 Coder, DeepSeek-R1) locally via LM Studio with zero API costs and full data privacy."
        keywords={[
          "local llm coding",
          "lm studio local ai setup",
          "run local models for development",
          "run qwen 2.5 coder offline",
          "lm studio python api integration",
          "local coding assistant without api costs",
          "local openai compatible server",
          "qwen 2.5 coder local setup",
        ]}
        url="https://sarabjeetrattan.com/insights/local-llm-lm-studio-workflow"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
            <Link to="/custom-ai-solutions" className="text-primary hover:underline">
              Custom AI Solutions
            </Link>
            <span>/</span>
            <span>Local Inference Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
            Running Local LLMs with LM Studio for Autonomous Coding & Development
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            How to download quantized open-weight models, configure LM Studio as an OpenAI-compatible local API server (`http://localhost:1234/v1`), and connect your IDE or agentic pipelines with zero cloud API costs.
          </p>

          {/* Infographic: Local LLM vs Cloud API Architecture */}
          <div id="vram-flow" className="my-10 p-6 md:p-8 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-2xl">
            <h3 className="font-bold text-base text-foreground mb-4 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" /> Local LLM Inference & VRAM Allocation Flow
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-background/60 border border-border/70 space-y-2">
                <div className="text-primary font-bold">1. Model Quantization</div>
                <div className="text-muted-foreground font-sans">
                  GGUF Q4_K_M / Q8_0 weights loaded into workstation GPU VRAM (e.g. 16GB–64GB Unified Memory).
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-border/70 space-y-2">
                <div className="text-blue-500 font-bold">2. LM Studio Server</div>
                <div className="text-muted-foreground font-sans">
                  Exposes standard OpenAI REST endpoints at <code className="text-primary">http://127.0.0.1:1234/v1</code> with CORS & streaming.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-border/70 space-y-2">
                <div className="text-success font-bold">3. Local Agent Relays</div>
                <div className="text-muted-foreground font-sans">
                  IDEs, Cline, Aider, and custom agent scripts interact locally with 0ms network latency and 100% privacy.
                </div>
              </div>
            </div>
          </div>

          <section className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <div id="hardware-matrix">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Hardware Matrix & Recommended Local Coding Models
              </h2>
              <p>
                The sweet spot for local autonomous coding in 2026 is <strong>32B quantized models (Q4_K_M)</strong> for complex multi-file reasoning, and <strong>14B models (Q8_0)</strong> for high-speed inline edits and unit test generation.
              </p>
            </div>

            <div className="overflow-x-auto my-4 border border-border/70 rounded-xl bg-card">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-muted/50 border-b border-border/60">
                  <tr>
                    <th className="p-3">Model</th>
                    <th className="p-3">Parameters</th>
                    <th className="p-3">Min VRAM</th>
                    <th className="p-3">Best Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="p-3 font-semibold text-foreground">Qwen 2.5 Coder 32B (Q4_K_M)</td>
                    <td className="p-3">32B</td>
                    <td className="p-3 text-primary font-bold">20 GB</td>
                    <td className="p-3 text-muted-foreground">Complex full-repo refactoring & architectural design</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">DeepSeek-R1 Distill Qwen 14B</td>
                    <td className="p-3">14B</td>
                    <td className="p-3 text-primary font-bold">10 GB</td>
                    <td className="p-3 text-muted-foreground">Algorithmic debugging & step-by-step logic verification</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">Qwen 2.5 Coder 7B (Q8_0)</td>
                    <td className="p-3">7B</td>
                    <td className="p-3 text-primary font-bold">8 GB</td>
                    <td className="p-3 text-muted-foreground">High-speed autocomplete, scripts & unit tests</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="server-configuration" className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Step 1: Configuring LM Studio Local Server Settings
              </h3>
              <ul className="space-y-2.5 text-xs text-muted-foreground list-disc pl-4">
                <li><strong>GPU Offload:</strong> Set to <code className="text-primary font-mono font-bold">Max (-1)</code> to offload 100% of model layers to Apple Metal Unified Memory or NVIDIA CUDA VRAM.</li>
                <li><strong>Context Length:</strong> Allocate <code className="text-primary font-mono font-bold">32,768 tokens (32k)</code> to allow reading entire repositories and large JSON schema payloads.</li>
                <li><strong>Server Port & CORS:</strong> Enable local server at <code className="text-primary font-mono">http://127.0.0.1:1234</code> with CORS enabled for seamless browser and IDE socket access.</li>
              </ul>
            </div>

            <div id="connecting-custom-agents" className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Step 2: Connecting Custom Scripts & Coding Agents
              </h3>
              <p>
                Because LM Studio exposes a drop-in 100% compatible OpenAI API, you can point standard SDKs directly to your local workstation. In our{" "}
                <Link to="/insights/multi-agent-orchestration-from-scratch" className="text-primary font-semibold hover:underline">
                  deterministic multi-agent systems
                </Link>{" "}
                and{" "}
                <Link to="/insights/custom-session-storage-engines" className="text-primary font-semibold hover:underline">
                  bespoke session caching engines
                </Link>
                , this replaces external token costs with private, local inference. Explore our full{" "}
                <Link to="/custom-ai-solutions" className="text-primary font-semibold hover:underline">
                  Custom AI Solutions practice
                </Link>{" "}
                to engineer enterprise-grade offline agents.
              </p>

              <div className="p-4 rounded-xl bg-card border border-border/80 font-mono text-xs overflow-x-auto text-foreground">
                <pre>{`// In your Node.js, Python, or Agent script
import OpenAI from "openai";

const localClient = new OpenAI({
  baseURL: "http://127.0.0.1:1234/v1",
  apiKey: "not-needed", // LM Studio runs locally without auth
});

async function runLocalCodeAnalysis(codeSnippet) {
  const completion = await localClient.chat.completions.create({
    model: "qwen2.5-coder-32b-instruct",
    messages: [
      { role: "system", content: "You are an expert full-stack technical architect." },
      { role: "user", content: \`Audit this function for vulnerabilities:\\n\${codeSnippet}\` },
    ],
    temperature: 0.2,
  });

  return completion.choices[0].message.content;
}`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 space-y-2 my-6">
              <div className="font-bold text-foreground text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> The Strategic Advantage
              </div>
              <p className="text-xs text-muted-foreground">
                Running local inference via LM Studio provides <strong>zero cloud billing risk</strong>, <strong>zero data leaks</strong> for confidential IP, and <strong>offline autonomy</strong> when working on enterprise software.
              </p>
            </div>
          </section>

          <div className="mt-14">
            <LeadCaptureBanner
              title="Need Help Architecting a Local LLM or Private AI Infrastructure?"
              subtitle="Let's set up dedicated, private AI pipelines with zero recurring cloud API bills."
              buttonText="Request Private AI Consultation"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </div>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="local-llm-architecture"
        serviceTitle="Local LLM & LM Studio Architecture Consultation"
      />
    </div>
  );
};

export default LocalLlmStudio;
