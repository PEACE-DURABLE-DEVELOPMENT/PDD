import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/programs",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/programs/:slug",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
