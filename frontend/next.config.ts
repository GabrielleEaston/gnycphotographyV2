// next.config.js or next.config.mjs or next.config.ts (your file is .ts)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: "false",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}


export default nextConfig;
