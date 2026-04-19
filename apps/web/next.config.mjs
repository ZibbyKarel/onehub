import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal server bundle for docker; see apps/web/Dockerfile.
  output: 'standalone',
  // Styled-Components needs the SWC transform enabled for consistent display
  // names across the monorepo. See app/StyledComponentsRegistry.tsx for the SSR bridge.
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
  transpilePackages: ['@app/ui', '@app/form', '@app/shared-types'],
};

export default withNextIntl(nextConfig);
