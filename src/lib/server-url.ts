const withProtocol = (host: string) =>
  host.startsWith("http://") || host.startsWith("https://")
    ? host
    : `https://${host}`;

export function getServerURL() {
  const configuredURL = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelURL = process.env.VERCEL_URL;

  if (process.env.VERCEL_ENV === "preview" && vercelURL) {
    return withProtocol(vercelURL);
  }

  if (process.env.VERCEL_ENV === "production") {
    const productionURL =
      configuredURL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? vercelURL;
    if (productionURL) return withProtocol(productionURL);
  }

  if (vercelURL) return withProtocol(vercelURL);
  return configuredURL ?? "http://localhost:3000";
}
