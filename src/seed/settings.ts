type SeedEnvironment = Record<string, string | undefined>;

export const helloWorldCoverSeedKey = "hello-world-cover";

export function getAdminSeedConfig(environment: SeedEnvironment = process.env) {
  if (environment.PAYLOAD_SEED_ADMIN !== "true") return null;

  const email = environment.PAYLOAD_ADMIN_EMAIL;
  const password = environment.PAYLOAD_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "PAYLOAD_SEED_ADMIN=true requires PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD.",
    );
  }

  return { email, password };
}
