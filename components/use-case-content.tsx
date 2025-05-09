"use client";

import { PortableText } from "next-sanity";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UseCaseItem } from "@/lib/sanity/types";
import UseCaseNavigator, { SECTIONS } from "./use-case-navigator";
import { Card, CardContent, CardHeader } from "./ui/card";
import { UseCaseMobileNav } from "./use-case-mobile-nav";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  useCase: UseCaseItem;
}

export default function UseCaseContent({ useCase }: Props) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id as string);
  const isMobile = useIsMobile();
  const topOffset = isMobile ? 416 : 96;

  // scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `${-topOffset}px 0px -70% 0px`,
        threshold: 0,
      }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [topOffset]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="scroll-smooth max-w-7xl mx-auto py-16 pt-0 md:pt-16 px-4 md:grid md:grid-cols-3 md:gap-x-16">
      {/* LEFT: Sticky overview + nav */}
      <aside className="sticky top-24 md:top-32 self-start md-space-y-8 bg-white col-span-1">
        <div className="space-y-4">
          <h1 className="text-xl md:text-3xl pl-4 font-bold">
            {useCase.title}
          </h1>
          <Card className="bg-accent py-3 md:py-6 gap-0 md:gap-2">
            <CardHeader className="gap-0">
              <h2 className="prose-lg md:prose-xl text-white font-semibold">
                Objective
              </h2>
            </CardHeader>
            <CardContent>
              <div className="prose md:prose-lg text-white">
                <PortableText value={useCase.objective || []} />
              </div>
            </CardContent>
          </Card>
        </div>
        <UseCaseMobileNav activeId={activeId} onSelect={jumpTo} />
        <UseCaseNavigator activeId={activeId} />
      </aside>

      {/* RIGHT: Scrollable deep dive */}
      <main className="space-y-8 md:space-y-16 pb-24 px-4 md-px-16 [&_li]:list-disc [&_li]:list-inside [&_li]:ml-1  md:[&_li]:ml-4 col-span-2">
        <section id="pain-points" style={{ scrollMarginTop: `${topOffset}px` }}>
          <h2 className="text-2xl font-semibold mb-2">Pain Points</h2>
          <div className="prose md:prose-lg">
            <PortableText value={useCase.painPoints || []} />
          </div>
        </section>

        <section id="solution" style={{ scrollMarginTop: `${topOffset}px` }}>
          <h2 className="text-2xl font-semibold mb-2">Solution</h2>
          <div className="prose md:prose-lg">
            <PortableText value={useCase.solution || []} />
          </div>
        </section>

        <section id="benefits" style={{ scrollMarginTop: `${topOffset}px` }}>
          <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
          <div className="prose md:prose-lg">
            <PortableText value={useCase.benefits || []} />
          </div>
        </section>

        <section id="our-role" style={{ scrollMarginTop: `${topOffset}px` }}>
          <h2 className="text-2xl font-semibold mb-2">Our Role at Korefocus</h2>
          <div className="prose md:prose-lg">
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
