import { useEffect } from "react";

const SITE_URL = "https://www.luxmorai.com";

type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  robots?: string;
  image?: string;
  type?: "website" | "article";
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertPropertyMeta(property: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertCanonical(href: string) {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = href;
}

function upsertJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  const id = "page-structured-data";
  let script = document.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function buildCanonical(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Luxmorai Technologies Pvt Ltd",
      alternateName: ["Luxmor AI", "Luxmorai"],
      url: SITE_URL,
      logo: `${SITE_URL}/luxmorai-logo.png`,
      email: "info@luxmorai.com",
      telephone: "+919884050511",
      foundingDate: "2022",
      description:
        "Luxmorai Technologies Pvt Ltd builds AI solutions, custom software, CRM systems, mobile apps, web platforms, cloud systems, and workflow automation for businesses.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500016",
        addressCountry: "IN",
      },
      sameAs: [SITE_URL],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Luxmorai Technologies Pvt Ltd",
      image: `${SITE_URL}/luxmorai-logo.png`,
      url: SITE_URL,
      email: "info@luxmorai.com",
      telephone: "+919884050511",
      address: {
        "@type": "PostalAddress",
        streetAddress: "19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500016",
        addressCountry: "IN",
      },
      areaServed: ["Hyderabad", "Bengaluru", "Chennai", "India", "United States"],
      priceRange: "$$",
    },
  ],
};

export function pageSchema(path: string, name: string, description: string) {
  const url = buildCanonical(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Luxmorai Technologies",
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function useSeo({
  title,
  description,
  path = "/",
  robots = "index, follow",
  image = "/luxmorai-logo.png",
  type = "website",
  structuredData,
}: SeoConfig) {
  useEffect(() => {
    const canonical = buildCanonical(path);
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", robots);
    upsertMeta("author", "Luxmorai Technologies Pvt Ltd");
    upsertMeta(
      "keywords",
      "Luxmor AI, Luxmorai Technologies, AI solutions, custom software development, CRM development, workflow automation, mobile app development, web development, cloud solutions, IT staffing",
    );
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", imageUrl);
    upsertPropertyMeta("og:title", title);
    upsertPropertyMeta("og:description", description);
    upsertPropertyMeta("og:type", type);
    upsertPropertyMeta("og:url", canonical);
    upsertPropertyMeta("og:image", imageUrl);
    upsertPropertyMeta("og:site_name", "Luxmorai Technologies");
    upsertCanonical(canonical);

    if (structuredData) {
      upsertJsonLd(structuredData);
    } else {
      upsertJsonLd(pageSchema(path, title, description));
    }
  }, [description, image, path, robots, structuredData, title, type]);
}
