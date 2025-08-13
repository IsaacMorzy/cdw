import { webpack } from 'next/dist/compiled/webpack/webpack';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Fix: Moved serverExternalPackages to top-level (replaces experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['sharp', '@prisma/client'],
  
  experimental: {
    authInterrupts: true,
    nodeMiddleware: true,
    reactCompiler: true,
    optimizeCss: true,
    optimizeServerReact: true,
    optimizePackageImports: ["lucide-react", "date-fns"],
    // Removed deprecated serverComponentsExternalPackages
  },
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  
  // Added webpack configuration to handle Sharp dependencies
  webpack: (config: webpack.Configuration) => {
    // Ensure externals array exists
    config.externals = config.externals || [];
    
    // Add Sharp modules to externals
    config.externals.push(
      { sharp: 'commonjs sharp' },
      { '@img/sharp-libvips-dev': 'commonjs @img/sharp-libvips-dev' }
    );
    
    return config;
  },
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: `camera=(), microphone=(), geolocation=(), midi=(), sync-xhr=(), fullscreen=(self "${process.env.NEXT_PUBLIC_APP_URL}"), geolocation=("${process.env.NEXT_PUBLIC_APP_URL}")`,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;