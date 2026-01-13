/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // Ignore ESLint errors during builds (akan tetap menampilkan warnings)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during builds (optional)
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['api.alkapro.id', 'alkapro.id'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.alkapro.id',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'alkapro.id',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' }
        ]
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' }
        ]
      }
    ]
  },
  // Rewrite untuk production - tidak perlu karena kita pakai proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.alkapro.id/api/v1'}/:path*`
  //     }
  //   ]
  // },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_USE_PROXY: process.env.NEXT_PUBLIC_USE_PROXY,
  }
}

module.exports = nextConfig
