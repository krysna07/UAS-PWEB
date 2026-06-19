import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.36.1'],
  serverExternalPackages: ['lightningcss'],
};

export default nextConfig;
