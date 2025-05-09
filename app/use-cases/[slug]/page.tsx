import UseCaseContent from "@/components/use-case-content";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity/client";
import type { UseCaseItem } from "@/lib/sanity/types";
import type { SearchParams } from "@/types";

export const revalidate = 60;

const useCaseQuery = groq`
  *[_type == "useCase"][0] {
    "useCase": useCases[buttonLink == "/use-cases/" + $slug][0] {
      title,
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

  return <UseCaseContent useCase={useCase} />;
}
