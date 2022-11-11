/** @type {import('next').NextConfig} */

const { i18n } = require("./i18n.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "nextauth.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "nextauth.nextauth.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
