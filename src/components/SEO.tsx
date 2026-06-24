import { Head } from "vite-react-ssg";
import { siteConfig, caseStudies, projects, services } from "@/data/content";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url = "https://sarabjeetrattan.com", 
  type = "website" 
}: SEOProps) => {
  const seoTitle = title || siteConfig.meta.title;
  const seoDescription = description || siteConfig.meta.description;
  const seoKeywords = keywords || siteConfig.meta.keywords;
  const seoImage = image || "https://storage.googleapis.com/gpt-engineer-file-uploads/qp12k9i7O0TTT9ff1Ydv9shUvex1/social-images/social-1766337520027-Screenshot%202025-12-21%20at%2022.48.19.png";

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    "url": url,
    "name": seoTitle,
    "description": seoDescription,
    "publisher": { "@id": `${url}/#person` }
  };

  const personSchema = {
    "@type": "Person",
    "@id": `${url}/#person`,
    "name": siteConfig.name,
    "jobTitle": "B2B AI Specialist & Agentic Systems Consultant",
    "url": url,
    "email": siteConfig.email,
    "telephone": "+918668984323",
    "sameAs": [siteConfig.linkedin],
    "description": seoDescription,
    "image": seoImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411027",
      "addressCountry": "IN"
    },
    "knowsAbout": [
      "Agentic AI & Workflows", "B2B Automation", "Supply Chain Optimization",
      "B2B AI Strategy & Roadmap", "LLM Orchestration", "RAG (Retrieval-Augmented Generation)",
      "Intelligent Process Automation (IPA)", "Autonomous Agents"
    ],
    "worksFor": [
      "Lead OG"
    ]
  };

  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": `${url}/#business`,
    "name": `${siteConfig.name} Consulting`,
    "image": seoImage,
    "url": url,
    "email": siteConfig.email,
    "telephone": "+918668984323",
    "priceRange": "₹1100-1900 /HOUR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pune",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411027",
      "addressCountry": "IN"
    },
    "description": "Expert B2B AI strategy and agentic systems consulting. Building intelligent automation for SMEs and entrepreneurs scaling their operations.",
    "provider": { "@id": `${url}/#person` },
    "areaServed": "Global"
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Agentic AI and how does it benefit B2B operations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agentic AI refers to autonomous systems capable of executing complex business logic with minimal human intervention. For B2B, this means faster lead processing, automated CRM synchronization, and self-correcting workflows that reduce operational overhead."
        }
      },
      {
        "@type": "Question",
        "name": "Why choose Industrial Hemp for sustainable packaging solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Industrial Hemp is a carbon-negative crop that produces high-strength fibers. It is ideal for hemp paper pulp, bio-composites, and moulded products, offering a biodegradable and high-performance alternative to traditional plastic and paper."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you serve with your consultancy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I specialize in high-growth B2B sectors, focusing on AI-driven enterprise automation and agentic workflows that solve operational bottlenecks for SMEs and entrepreneurs."
        }
      },
      {
        "@type": "Question",
        "name": "How do you bridge the gap between business logic and agentic systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I translate abstract operational vision into executable technical roadmaps. By engineering custom LLM orchestration and RAG pipelines, I ensure that AI systems respect complex B2B business rules while delivering scalable impact."
        }
      },
      {
        "@type": "Question",
        "name": "What is agentic AI consulting and how does it work for B2B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agentic AI consulting means designing autonomous AI systems that execute complex business workflows with human-in-the-loop oversight using CrewAI, LangChain, and RAG pipelines."
        }
      },
      {
        "@type": "Question",
        "name": "How does CrewAI automate LinkedIn content scheduling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I engineered a Trello-driven LinkedIn automation system using CrewAI that orchestrates research and drafting agents with an approve-to-publish workflow."
        }
      },
      {
        "@type": "Question",
        "name": "Why hire an AI strategy consultant in Pune?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Based in Pune with 16+ years of operational leadership spanning AI strategy, agentic systems, and intelligent automation across 250+ clients in 4 continents."
        }
      }
    ]
  };

  const projectSchemas = projects?.map(project => ({
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description,
    "url": `${url}/#projects`,
    "keywords": project.highlights.join(", ")
  })) || [];

  const caseStudySchemas = caseStudies?.map(study => ({
    "@type": "CreativeWork",
    "name": study.name,
    "description": study.description,
    "url": `${url}/#case-studies`,
    "keywords": study.techStack.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${url}/#case-studies`
    }
  })) || [];

  const servicesSchema = services?.map(service => ({
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": { "@id": `${url}/#person` }
  })) || [];

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resume",
        "item": `${url}/resume`
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema, 
      personSchema, 
      businessSchema, 
      faqSchema, 
      breadcrumbSchema,
      ...projectSchemas,
      ...caseStudySchemas,
      ...servicesSchema
    ]
  };

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Head>
  );
};
