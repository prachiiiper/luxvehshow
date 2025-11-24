/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/us4g3mjub/**',
      },
    ],
    unoptimized: false,
  },
  reactStrictMode: true,
}

module.exports = nextConfig

