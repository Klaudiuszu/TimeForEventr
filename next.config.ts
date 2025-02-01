import type { NextConfig } from "next";

const withNextIntl = require("next-intl/plugin")("./i18n.ts");
const nextConfig: NextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      }
    ]
  }
});

export default nextConfig;
