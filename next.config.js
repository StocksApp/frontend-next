/** @type {import('next').NextConfig} */

const config = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  reactStrictMode: true,
};

module.exports = config;
