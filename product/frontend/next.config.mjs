/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.aceternity.com"],
  },
  env: {
    API_URL: process.env.API_URL, // read from environment
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
