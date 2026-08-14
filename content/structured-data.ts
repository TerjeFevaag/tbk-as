import { siteConfig } from "./site";

// Stable @id for the business entity, so Service/Article/WebSite schemas on
// other pages can reference the same organisation instead of duplicating it.
export const businessId = `${siteConfig.url}/#business`;
export const websiteId = `${siteConfig.url}/#website`;

export function localBusinessLd() {
  return {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    logo: `${siteConfig.url}/images/logo.png`,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    email: siteConfig.email,
    description: siteConfig.description,
    vatID: siteConfig.vatID,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
    },
    areaServed: { "@type": "Place", name: siteConfig.areaServed },
    founder: {
      "@type": "Person",
      name: "Olav L. Strøm",
      jobTitle: "Uavhengig kontrollør",
    },
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "nb-NO",
    publisher: { "@id": businessId },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

// Wraps one or more schema nodes in a single @graph document.
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
