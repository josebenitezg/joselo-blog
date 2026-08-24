import Link from "next/link";

const navigation = [
  { href: "/writing", label: "Writing" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" href="/" aria-label="joselo.blog home">
          joselo<span aria-hidden="true">.</span>blog
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
