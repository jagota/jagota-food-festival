/** @type {import('next').NextConfig} */

import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts', // where the service worker src is
  swDest: 'public/sw.js', // where the service worker code will end up
});
const nextConfig = {};
// export default nextConfig;

export default withSerwist(nextConfig);
