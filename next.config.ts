import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'numaragroup.com',
          },
        ],
        destination: 'https://www.numaragroup.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;