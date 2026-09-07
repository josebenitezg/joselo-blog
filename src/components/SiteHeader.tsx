"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { href: "/writing", label: "Writing" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" href="/" aria-label="joselo.blog home">
          <span className="site-mark" aria-hidden="true" />joselo
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
