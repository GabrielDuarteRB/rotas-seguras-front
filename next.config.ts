import type { NextConfig } from "next";
const API_USERS = process.env.API_USERS_URL || 'http://localhost:3001';
const API_POLICE = process.env.API_POLICE_URL || 'http://localhost:3000';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-users/:path*',
        destination: `${API_USERS}/:path*`
      },
      {
        source: '/api-police/:path*',
        destination: `${API_POLICE}/:path*`
      }
    ]
  }
};

export default nextConfig;
