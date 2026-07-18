import { useEffect } from "react";

export const SITE_URL = "https://www.luxmorai.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/luxmoraipvtltd/";
const LOGO_URL = `${SITE_URL}/luxmorai-logo.jpeg`;

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
      name: "Luxmorai Technologies",
      legalName: "Luxmorai Technologies Pvt Ltd",
      alternateName: ["Luxmorai Technologies Pvt Ltd", "Luxmor AI", "Luxmorai AI Technologies", "luxmorai.com"],
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 1600,
        height: 448,
        caption: "Luxmorai Technologies",
      },
      image: { "@id": `${SITE_URL}/#logo` },
      email: "info@luxmorai.com",
      telephone: "+919884050511",
      description:
        "Luxmorai Technologies Pvt Ltd builds AI solutions, custom software, CRM systems, mobile apps, web platforms, cloud systems, and workflow automation for businesses.",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500016",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Pritech Road, Bellandur",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560103",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Olympia Cyberspace, 21/22 Alandur Road, Arulayiammanpet, 2nd Street, Guindy",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          postalCode: "600032",
          addressCountry: "IN",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+919884050511",
        email: "info@luxmorai.com",
        contactType: "sales and customer support",
        availableLanguage: ["English"],
        areaServed: ["IN", "US"],
      },
      knowsAbout: [
        "Artificial intelligence",
        "Machine learning",
        "Custom software development",
        "CRM software",
        "Workflow automation",
        "Web application development",
        "Mobile application development",
        "Cloud computing",
      ],
      sameAs: [LINKEDIN_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Luxmorai Technologies",
      alternateName: ["Luxmor AI", "Luxmorai Technologies Pvt Ltd", "luxmorai.com"],
      description: "Official website of Luxmorai Technologies Pvt Ltd, an AI and software development company.",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Luxmorai Technologies",
      image: { "@id": `${SITE_URL}/#logo` },
      logo: { "@id": `${SITE_URL}/#logo` },
      url: `${SITE_URL}/`,
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
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      sameAs: [LINKEDIN_URL],
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
    inLanguage: "en-IN",
    about: { "@id": `${SITE_URL}/#organization` },
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
  image = "/luxmorai-logo.jpeg",
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
    upsertMeta("application-name", "Luxmorai Technologies");
    upsertMeta(
      "keywords",
      "Luxmorai Technologies, Luxmorai Technologies Pvt Ltd, Luxmorai AI Technologies, Luxmor AI, Luxmor, AI solutions, custom software development, CRM development, workflow automation, mobile app development, web development, cloud solutions, IT staffing",
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
    upsertPropertyMeta("og:locale", "en_IN");
    upsertCanonical(canonical);

    if (structuredData) {
      upsertJsonLd(structuredData);
    } else {
      upsertJsonLd(pageSchema(path, title, description));
    }
  }, [description, image, path, robots, structuredData, title, type]);
}
