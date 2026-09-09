import type { NextConfig } from "next";

const repo = "reseller-hunt";
const pages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: pages ? `/${repo}` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: pages ? `/${repo}` : "",
  },
  experimental: {
    useOffline: true,
  },
};

export default nextConfig;
