import { useEffect } from "react";

/**
 * A custom hook to dynamically update page-specific SEO meta tags.
 * 
 * @param title - The page title
 * @param description - The page meta description
 * @param canonical - Optional custom canonical URL. Defaults to the current hash route url.
 */
export function usePageSEO(title: string, description: string, canonical?: string) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to set or create a meta tag
    const setMetaTag = (attributeName: "name" | "property", attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper function to set or create a link tag
    const setLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", relValue);
        document.head.appendChild(element);
      }
      element.setAttribute("href", hrefValue);
    };

    // 2. Update Meta Description
    setMetaTag("name", "description", description);

    // 3. Update Open Graph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    
    const currentUrl = canonical || `https://www.innovistametalfabriconix.com${window.location.hash || "/#"}`;
    setMetaTag("property", "og:url", currentUrl);

    // 4. Update Twitter Card Tags
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    // 5. Update Canonical Tag
    setLinkTag("canonical", currentUrl);

  }, [title, description, canonical]);
}
