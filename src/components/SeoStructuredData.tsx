import { useEffect } from "react";

export default function SeoStructuredData() {
  useEffect(() => {
    // 1. Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Innovista Metal Fabriconix (PVT) Ltd",
      "alternateName": "Innovista Fabriconix",
      "url": "https://www.innovistametalfabriconix.com",
      "logo": "https://www.innovistametalfabriconix.com/src/assets/Images/logo/CompanyLogo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+94-76-081-8098",
        "contactType": "customer service",
        "areaServed": "LK",
        "availableLanguage": ["en", "si", "ta"]
      },
      "sameAs": [
        "https://www.facebook.com/share/1CN1SBPycg/",
        "https://www.instagram.com/innovista_fabriconx_aluminium?igsh=OXU0MndxZWMwNHo2"
      ]
    };

    // 2. LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.innovistametalfabriconix.com/#localbusiness",
      "name": "Innovista Metal Fabriconix",
      "image": "https://www.innovistametalfabriconix.com/src/assets/Images/logo/CompanyLogo.png",
      "telephone": "+94-76-081-8098",
      "email": "innovistametal@gmail.com",
      "url": "https://www.innovistametalfabriconix.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Colombo",
        "addressLocality": "Western Province",
        "addressRegion": "Western Province",
        "addressCountry": "LK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.9271,
        "longitude": 79.8612
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "priceRange": "$$"
    };

    // Inject Organization Schema
    const orgScriptId = "jsonld-organization";
    let orgScript = document.getElementById(orgScriptId);
    if (!orgScript) {
      orgScript = document.createElement("script");
      orgScript.id = orgScriptId;
      orgScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(orgScript);
    }
    orgScript.innerHTML = JSON.stringify(organizationSchema);

    // Inject Local Business Schema
    const businessScriptId = "jsonld-localbusiness";
    let businessScript = document.getElementById(businessScriptId);
    if (!businessScript) {
      businessScript = document.createElement("script");
      businessScript.id = businessScriptId;
      businessScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(businessScript);
    }
    businessScript.innerHTML = JSON.stringify(localBusinessSchema);

    return () => {
      // Clean up injected tags on unmount if necessary, but generally ok to leave.
    };
  }, []);

  return null;
}
