/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    appDir: false,
  },
  // Development server configuration
  images: {
    unoptimized: true,
  },
}

export default nextConfig
