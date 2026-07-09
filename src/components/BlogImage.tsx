import { SyntheticEvent } from "react";

const FALLBACK_BLOG_IMAGE = "/images/india-office-cities.png";

type BlogImageProps = {
  className: string;
  src?: string;
  alt?: string;
};

export function BlogImage({ className, src, alt }: BlogImageProps) {
  function useFallback(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    if (image.src.endsWith(FALLBACK_BLOG_IMAGE)) return;
    image.src = FALLBACK_BLOG_IMAGE;
  }

  return (
    <img
      className={className}
      src={src || FALLBACK_BLOG_IMAGE}
      alt={alt || "Luxmorai technology blog"}
      onError={useFallback}
    />
  );
}
