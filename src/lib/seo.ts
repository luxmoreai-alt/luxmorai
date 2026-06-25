import { useEffect } from "react";

const SITE_URL = "https://www.luxmorai.com";

type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  robots?: string;
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

function upsertCanonical(href: string) {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = href;
}

export function buildCanonical(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function useSeo({ title, description, path = "/", robots = "index, follow" }: SeoConfig) {
  useEffect(() => {
    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", robots);
    upsertCanonical(buildCanonical(path));
  }, [description, path, robots, title]);
}
