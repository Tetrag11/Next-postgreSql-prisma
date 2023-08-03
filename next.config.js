/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prima/client", "bcrypt"],
  },
};

module.exports = nextConfig;
