import { MetadataRoute } from 'next';
import seoConfig from '@config/seo.json';
import productsData from '@/data/products.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.global.metadataBase;

  // The main homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];

  productsData.forEach((product) => {
    routes.push({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}
