const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: ["user-images.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com"
      },
    ]
  }
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '/116287208/',
      },
    ],
  },
}

module.exports = nextConfig

