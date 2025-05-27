import { sanityClient } from '@/lib/sanity/client';
import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const slugs = await sanityClient.fetch<Array<{ slug: string }>>(groq`
    *[_type == "useCase"][0].useCases[] { "slug": buttonLink }
  `);

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...slugs.map(({ slug }) => ({
      url: `${baseUrl}${slug}`,
      lastModified: new Date(),
    })),
  ] satisfies MetadataRoute.Sitemap;

  return routes;
}
