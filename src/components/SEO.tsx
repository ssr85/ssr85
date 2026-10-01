import { Head } from "vite-react-ssg";
import { siteConfig, services } from "@/data/content";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  breadcrumbs?: BreadcrumbItem[];
  showFaq?: boolean;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url = "https://sarabjeetrattan.com", 
  type = "website",
  breadcrumbs,
  showFaq = false,
  robots = "index, follow",
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const canonicalUrl = url.endsWith("/") && url !== "https://sarabjeetrattan.com/" ? url.slice(0, -1) : url;
  const isHome = canonicalUrl === "https://sarabjeetrattan.com" || canonicalUrl === "https://sarabjeetrattan.com/";
  
  const seoTitle = title || siteConfig.meta.title;
  const seoDescription = description || siteConfig.meta.description;
  const seoKeywords = keywords || siteConfig.meta.keywords;
  const seoImage = image || "https://sarabjeetrattan.com/images/og-default.webp";

  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://sarabjeetrattan.com/#website",
    "url": "https://sarabjeetrattan.com",
    "name": "Sarabjeet Rattan | B2B AI Strategy & Agentic Systems Consultant",
    "description": siteConfig.meta.description,
    "publisher": { "@id": "https://sarabjeetrattan.com/#person" }
  };

  const personSchema = {
    "@type": "Person",
    "@id": "https://sarabjeetrattan.com/#person",
    "name": siteConfig.name,
    "jobTitle": "B2B AI Specialist & Agentic Systems Consultant",
    "url": "https://sarabjeetrattan.com",
    "email": siteConfig.email,
    "telephone": "+918668984323",
    "sameAs": [siteConfig.linkedin, siteConfig.github],
    "description": siteConfig.meta.description,
    "image": "https://sarabjeetrattan.com/images/og-default.webp",
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
      "Intelligent Process Automation (IPA)", "Autonomous Agents", "WordPress AI Engineering"
    ],
    "worksFor": [
      { "@type": "Organization", "name": "Lead OG" }
    ]
  };

  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": "https://sarabjeetrattan.com/#business",
    "name": `${siteConfig.name} Consulting`,
    "image": seoImage,
    "url": "https://sarabjeetrattan.com",
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
    "description": "Expert B2B AI strategy and agentic systems consulting. Building intelligent automation for SMEs and enterprises.",
    "provider": { "@id": "https://sarabjeetrattan.com/#person" },
    "areaServed": "Global"
  };

  // FAQPage Schema: STRICTLY injected only when showFaq is true (or homepage) to avoid Google rich snippet violations
  const faqSchema = (showFaq || isHome) ? {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}/#faq`,
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
        "name": "What's the difference between AI automation and agentic AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional automation follows fixed, predefined rules. Agentic AI uses LLM-driven agents that reason, make decisions, and adapt their actions based on context, enabling more resilient workflows that handle exceptions without constant human intervention."
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
  } : null;

  // Breadcrumbs schema calculation
  const getAutoBreadcrumbs = (): BreadcrumbItem[] => {
    if (isHome) {
      return [{ name: "Home", url: "https://sarabjeetrattan.com" }];
    }
    const path = canonicalUrl.replace("https://sarabjeetrattan.com", "");
    const segments = path.split("/").filter(Boolean);
    
    if (segments.length === 1) {
      const name = segments[0]
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return [
        { name: "Home", url: "https://sarabjeetrattan.com" },
        { name, url: canonicalUrl }
      ];
    }
    
    if (segments.length >= 2) {
      const parentName = segments[0]
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const childName = segments[1]
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return [
        { name: "Home", url: "https://sarabjeetrattan.com" },
        { name: parentName, url: `https://sarabjeetrattan.com/#${segments[0]}` },
        { name: childName, url: canonicalUrl }
      ];
    }
    return [{ name: "Home", url: "https://sarabjeetrattan.com" }];
  };

  const activeBreadcrumbs = breadcrumbs || getAutoBreadcrumbs();

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": activeBreadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  // Article / TechArticle schema for insight and case study pages
  const articleSchema = type === "article" ? {
    "@type": "TechArticle",
    "@id": `${canonicalUrl}/#article`,
    "headline": seoTitle,
    "description": seoDescription,
    "image": seoImage,
    "url": canonicalUrl,
    "datePublished": publishedTime || "2026-09-01",
    "dateModified": modifiedTime || "2026-10-01",
    "author": { "@id": "https://sarabjeetrattan.com/#person" },
    "publisher": { "@id": "https://sarabjeetrattan.com/#person" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;

  // Services schema (included on homepage & pillar pages)
  const servicesSchema = isHome ? services.map(service => ({
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": { "@id": "https://sarabjeetrattan.com/#person" }
  })) : [];

  const jsonLdGraph = [
    websiteSchema,
    personSchema,
    businessSchema,
    breadcrumbSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(articleSchema ? [articleSchema] : []),
    ...servicesSchema
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph
  };

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join(", ")} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

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
