/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // disableStaticImages: true,
    domains: ["firebasestorage.googleapis.com"],
  },
}

module.exports = nextConfig
