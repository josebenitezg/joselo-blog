import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.tensorflow.org" },
      { protocol: "https", hostname: "miro.medium.com" },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      { protocol: "https", hostname: "preview.redd.it" },
      { protocol: "https", hostname: "cdn.openart.ai" },
    ],
  },
};

export default withPayload(nextConfig);
