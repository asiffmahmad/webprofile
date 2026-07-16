import { MetadataRoute } from 'next';
import seoConfig from '@config/seo.json';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.global.applicationName,
    short_name: "Asiff",
    description: seoConfig.global.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/images/Subject.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/Subject.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/Subject.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  }
}
