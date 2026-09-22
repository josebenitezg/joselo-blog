"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/writing", label: "Writing" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="joselo.blog home">
        <span className="mark" aria-hidden="true" />
        joselo
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
