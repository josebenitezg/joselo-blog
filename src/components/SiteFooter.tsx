import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>
          © {new Date().getUTCFullYear()} {siteConfig.author}
        </p>
        <div className="footer-links">
          <Link href="/rss.xml">RSS</Link>
          <a href={siteConfig.links.professional}>Physical AI work ↗</a>
        </div>
      </div>
    </footer>
  );
}
