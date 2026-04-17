/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal server bundle for docker; see apps/web/Dockerfile.
  output: 'standalone',
  // Styled-Components needs the SWC transform enabled for consistent display
  // names across the monorepo. See app/registry.tsx for the SSR bridge.
  compiler: {
    styledComponents: true,
  },
  // Local-only dashboard — allow any IG CDN host for thumbnails.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
  // Transpile the workspace packages so Next handles their .ts/.tsx directly.
  transpilePackages: ['@app/ui', '@app/ui-tokens', '@app/form', '@app/shared-types'],
  // Resolve .js/.jsx imports to .ts/.tsx files in the monorepo.
  webpack(config) {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
      '.jsx': ['.tsx', '.jsx'],
    };
    return config;
  },
};

export default nextConfig;
