import { groq, PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanity/client";
import type { UseCaseItem } from "@/lib/sanity/types";
import Link from "next/link";

const useCaseQuery = groq`
  *[_type == "useCase"][0] {
    heading,
    subHeading,
    description,
    "useCases": useCases[buttonLink == "/use-cases/" + $slug][0] {
      _key,
      title,
      hook,
      buttonText,
      buttonLink,
      objective[]{..., markDefs[]{...}},
      painPoints[]{..., markDefs[]{...}},
      solution[]{..., markDefs[]{...}},
      benefits[]{..., markDefs[]{...}},
      korefocusRole[]{..., markDefs[]{...}}
    }
  }
`;

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await sanityClient.fetch<{ useCases: UseCaseItem | null }>(
    useCaseQuery,
    { slug }
  );

  const { useCases: useCaseItem } = data;

  if (!useCaseItem) {
    return <p className="prose mx-auto py-16">Use case not found.</p>;
  }

  return (
    <article className="prose prose-lg mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold">{useCaseItem.title}</h1>
      <p className="text-gray-600 mb-8">{useCaseItem.hook}</p>
      <PortableText value={useCaseItem.objective || []} />

      <PortableText value={useCaseItem.painPoints || []} />
      <PortableText value={useCaseItem.solution || []} />
      <PortableText value={useCaseItem.benefits || []} />
      <PortableText value={useCaseItem.korefocusRole || []} />

      <Button asChild variant="outline">
        <Link href="/">← Back to all use cases</Link>
      </Button>
    </article>
  );
}
