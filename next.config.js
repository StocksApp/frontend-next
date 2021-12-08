/** @type {import('next').NextConfig} */

const config = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    NEXT_AUTH_SECRET: process.env.SECRET,
  },
  reactStrictMode: true,
};

module.exports = config;
