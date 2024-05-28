import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jagota Events',
    short_name: 'Jagota Events',
    description: 'Jagota Events',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/splash-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/splash-logo.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/splash-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}