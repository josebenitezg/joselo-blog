const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joselo.blog";

export const siteConfig = {
  name: "joselo.blog",
  author: "José Benítez",
  title: "joselo.blog — Notes kept in public",
  description:
    "Essays on discipline, technology, meaning, and the experiments in between.",
  url: configuredUrl.replace(/\/$/, ""),
  links: {
    professional: "https://www.josebenitez.ai",
    github: "https://github.com/josebenitezg",
    linkedin: "https://www.linkedin.com/in/josebenitezg/",
  },
} as const;

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
