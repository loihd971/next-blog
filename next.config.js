/** @type {import('next').NextConfig} */

const { i18n } = require("./i18n.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
};

module.exports = nextConfig;
