import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-users/:path*',
        destination: 'http://localhost:3001/:path*'
      },
      {
        source: '/api-police/:path*',
        destination: 'http://localhost:3000/:path*'
      }
    ]
  }
};

export default nextConfig;
