"use client";

import { PortableText } from "next-sanity";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UseCaseItem } from "@/lib/sanity/types";
import UseCaseNavigator from "./use-case-navigator";

interface Props {
  useCase: UseCaseItem;
}

export default function UseCaseContent({ useCase }: Props) {
  return (
    <article className="scroll-smooth max-w-7xl mx-auto py-16 px-4 md:grid md:grid-cols-2 md:gap-x-12 [&_li]:list-disc! [&_li]:list-inside [&_li]:ml-4">
      {/* LEFT: Sticky overview + nav */}
      <aside className="sticky top-32 self-start space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{useCase.title}</h1>

          <h2 className="text-2xl font-semibold">Objective</h2>
          <div className="prose ">
            <PortableText value={useCase.objective || []} />
          </div>
        </div>

        <UseCaseNavigator />
      </aside>

      {/* RIGHT: Scrollable deep dive */}
      <main className="space-y-16 pb-24">
        <section id="pain-points" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Pain Points</h2>
          <div className="prose">
            <PortableText value={useCase.painPoints || []} />
          </div>
        </section>

        <section id="solution" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <div className="prose">
            <PortableText value={useCase.solution || []} />
          </div>
        </section>

        <section id="benefits" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <div className="prose">
            <PortableText value={useCase.benefits || []} />
          </div>
        </section>

        <section id="our-role" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Our Role at Korefocus</h2>
          <div className="prose">
            <PortableText value={useCase.korefocusRole || []} />
          </div>
        </section>

        <Button asChild variant="outline">
          <Link href="/use-cases">← Back to all use cases</Link>
        </Button>
      </main>
    </article>
  );
}
