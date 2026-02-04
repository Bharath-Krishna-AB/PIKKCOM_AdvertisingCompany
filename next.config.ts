import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // @ts-expect-error Turbopack root might not be fully typed yet
    turbopack: {
      root: __dirname,
    }
  }
};

export default nextConfig;
