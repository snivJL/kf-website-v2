import UseCaseContent from '@/components/use-case-content';
import { groq } from 'next-sanity';
import { sanityClient } from '@/lib/sanity/client';
import type { UseCaseItem } from '@/lib/sanity/types';
import type { SearchParams } from '@/types';
import type { Metadata } from 'next';

export const revalidate = 60;

const useCaseQuery = groq`
  *[_type == "useCase"][0] {
    "useCase": useCases[buttonLink == "/use-cases/" + $slug][0] {
      title,
      company,
      objective[]{..., markDefs[]{...}},
      painPoints[]{..., markDefs[]{...}},
      solution[]{..., markDefs[]{...}},
      benefits[]{..., markDefs[]{...}},
      korefocusRole[]{..., markDefs[]{...}},
      testimonial[]{..., markDefs[]{...}},
      shortTestimonial,
      shortTestimonialAuthor,
      shortTestimonialCompany
    }
  }
`;

const metaQuery = groq`
  *[_type == "useCase"][0] {
    "useCase": useCases[buttonLink == "/use-cases/" + $slug][0] {
      title,
      hook
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { useCase } = await sanityClient.fetch<{
    useCase: { title?: string; hook?: string } | null;
  }>(metaQuery, { slug });

  if (!useCase) {
    return { title: 'Use case not found' };
  }

  const title = `${useCase.title}`;
  const description = useCase.hook ?? 'Explore how Korefocus can help you';
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/use-cases/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/use-cases/${slug}` },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Korefocus',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { useCase } = await sanityClient.fetch<{ useCase: UseCaseItem | null }>(
    useCaseQuery,
    { slug }
  );

  if (!useCase) {
    return <p className="prose mx-auto py-16">Use case not found.</p>;
  }

  return (
    <div className="pt-16">
      <UseCaseContent useCase={useCase} />
    </div>
  );
}
