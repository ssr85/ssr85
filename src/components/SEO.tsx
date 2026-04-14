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
    "jobTitle": "B2B AI Specialist & Industrial Hemp Consultant",
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
      "Agentic AI & Workflows", "B2B Automation", "Industrial Hemp Supply Chain", 
      "Sustainable Packaging Solutions", "Supply Chain Optimization",
      "B2B AI Strategy & Roadmap", "LLM Orchestration", "RAG (Retrieval-Augmented Generation)",
      "Intelligent Process Automation (IPA)", "Autonomous Agents", "Circular Economy",
      "Hemp Paper Pulp", "Bio-composites", "Regenerative Agriculture", "Carbon Neutrality"
    ],
    "worksFor": [
      "Lead OG", "Sustainable Packaging", "Hemp Paper", 
      "Hemp Plastic", "Hemp Compostables", "Hemp Pulp Moulded", 
      "Biodegradable Composite Solutions"
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
    "description": "Expert high-end B2B AI consulting focusing on Agentic Workflows, LLM Orchestration, and Intelligent Process Automation. Specializing in Industrial Hemp supply chains, Circular Economy models, and Sustainable Packaging Solutions.",
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
          "text": "I specialize in high-growth B2B sectors, specifically focusing on AI-driven enterprise automation and the global Industrial Hemp supply chain, including sustainable packaging and bio-composite manufacturing."
        }
      },
      {
        "@type": "Question",
        "name": "How do you bridge the gap between business logic and agentic systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I translate abstract operational vision into executable technical roadmaps. By engineering custom LLM orchestration and RAG pipelines, I ensure that AI systems respect complex B2B business rules while delivering scalable impact."
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

      {/* reCAPTCHA v3 script */}
      {import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
        <script src={`https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`} async defer />
      )}

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Head>
  );
};
