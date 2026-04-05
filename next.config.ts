import type { NextConfig } from 'next';

const isGhPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGhPages ? '/la-trattoria' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isGhPages ? '/la-trattoria/' : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
