import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode, headers } from "next/headers";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { siteConfig } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const preview = (await draftMode()).isEnabled;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");
  const serverURL = host ? `${protocol}://${host}` : siteConfig.url;

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="wrap">{children}</main>
        <SiteFooter />
        {preview ? <LivePreviewListener serverURL={serverURL} /> : null}
      </body>
    </html>
  );
}
