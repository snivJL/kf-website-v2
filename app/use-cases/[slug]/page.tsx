// revalidate every minute
export const revalidate = 60;

import { groq, PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanity/client";
import type { UseCaseItem } from "@/lib/sanity/types";
import Link from "next/link";

const useCaseQuery = groq`
  *[_type == "useCase"][0] {
    "useCases": useCases[buttonLink == "/use-cases/" + $slug][0] {
      title,
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
  params: { slug: string };
}) {
  const { slug } = params;
  const { useCases: useCaseItem } = await sanityClient.fetch<{
    useCases: UseCaseItem | null;
  }>(useCaseQuery, { slug });

  if (!useCaseItem) {
    return <p className="prose mx-auto py-16">Use case not found.</p>;
  }

  return (
    <article className="max-w-7xl mx-auto py-16 px-4 md:grid md:grid-cols-2 md:gap-x-12">
      {/* LEFT: Sticky overview */}
      <aside className="sticky top-32 self-start space-y-6">
        <h1 className="text-3xl font-bold">{useCaseItem.title}</h1>

        <h2 className="text-2xl font-semibold">Objective</h2>
        <div className="prose">
          <PortableText value={useCaseItem.objective || []} />
        </div>
      </aside>

      {/* RIGHT: Scrollable deep dive */}
      <main className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Pain Points</h2>
          <div className="prose">
            <PortableText value={useCaseItem.painPoints || []} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <div className="prose">
            <PortableText value={useCaseItem.solution || []} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <div className="prose">
            <PortableText value={useCaseItem.benefits || []} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Role at Korefocus</h2>
          <div className="prose">
            <PortableText value={useCaseItem.korefocusRole || []} />
          </div>
        </section>

        <Button asChild variant="outline">
          <Link href="/use-cases">← Back to all use cases</Link>
        </Button>
      </main>
    </article>
  );
}
