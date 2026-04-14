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
    "sameAs": [siteConfig.linkedin],
    "description": seoDescription,
    "image": seoImage,
    "knowsAbout": [
      "Agentic AI", "B2B Automation", "Industrial Hemp", 
      "Sustainable Packaging", "Supply Chain Optimization"
    ]
  };

  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": `${url}/#business`,
    "name": `${siteConfig.name} Consulting`,
    "image": seoImage,
    "url": url,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "IN"
    },
    "description": "Expert B2B AI & Agentic Systems Engineering and Industrial Hemp Supply Chain Consultancy.",
    "provider": { "@id": `${url}/#person` },
    "areaServed": "Global"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, personSchema, businessSchema]
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
