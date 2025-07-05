import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-users/:path*',
        destination: 'http://localhost:3001/:path*'
      }
    ]
  }
};

export default nextConfig;
