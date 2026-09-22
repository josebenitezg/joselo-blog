import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="/rss.xml">RSS</a>
      <a href={siteConfig.links.professional}>josebenitez.ai</a>
    </footer>
  );
}
