/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Augmentez selon vos besoins
    },
  },
};

export default nextConfig;
