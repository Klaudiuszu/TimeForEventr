import type { NextConfig } from "next";
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig: NextConfig = withNextIntl({
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  experimental: {
    serverActions: true,
    appDir: true
  }
});

export default nextConfig;
