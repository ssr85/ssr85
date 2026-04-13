import { Head } from "vite-react-ssg";
import { siteConfig } from "@/data/content";

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
  const seoImage = image || "https://storage.googleapis.com/gpt-engineer-file-uploads/qp12k9i7O0TTT9ff1Ydv9shUvex1/social-images/social-1766337520027-Screenshot 2025-12-21 at 22.48.19.png";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "jobTitle": "B2B AI Specialist & Industrial Hemp Consultant",
    "url": url,
    "sameAs": [
      siteConfig.linkedin
    ],
    "description": seoDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "Global"
    }
  };

  const aiServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "B2B AI & Agentic Systems Engineering",
    "provider": {
      "@type": "Person",
      "name": siteConfig.name
    },
    "description": "Custom agentic workflows, autonomous LLM orchestration, and B2B system integration."
  };

  const hempServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Industrial Hemp & Sustainable Packaging Consultancy",
    "provider": {
      "@type": "Person",
      "name": siteConfig.name
    },
    "description": "Expertise in hemp paper pulp, composite packaging, and moulded hemp products supply chain development."
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

      {/* Multiple Schemas JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify([personSchema, aiServiceSchema, hempServiceSchema])}
      </script>
    </Head>
  );
};
