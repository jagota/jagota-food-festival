/** @type {import('next').NextConfig} */

import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts', // where the service worker src is
  swDest: 'public/sw.js', // where the service worker code will end up
});
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.jagota.com",
        port: "",
        pathname: "/uploadsimple/**",
      },
      {
        protocol: "https",
        hostname: "pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  }
};
// export default nextConfig;

export default withSerwist(nextConfig);
