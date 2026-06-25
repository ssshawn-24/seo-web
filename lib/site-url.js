const DEFAULT_SITE_URL = "https://seo-web-sepia-phi.vercel.app";

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;

  return rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;
}
