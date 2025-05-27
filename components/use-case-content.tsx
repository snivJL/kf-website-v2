'use client';

import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UseCaseItem } from '@/lib/sanity/types';
import UseCaseNavigator, { SECTIONS } from './use-case-navigator';
import { Card, CardContent, CardHeader } from './ui/card';
import { UseCaseMobileNav } from './use-case-mobile-nav';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useOverflow } from '@/hooks/use-overflow';

interface Props {
  useCase: UseCaseItem;
}

export default function UseCaseContent({ useCase }: Props) {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const isMobile = useIsMobile();
  const topOffset = isMobile ? 500 : 96;
  const [ref, overflow] = useOverflow<HTMLDivElement>();

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
        rootMargin: `${-topOffset}px 0px -60% 0px`,
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
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  console.log(overflow);
  return (
    <article className="mx-auto max-w-7xl scroll-smooth px-4 md:grid md:grid-cols-3 md:gap-x-16 md:pt-16">
      {/* LEFT: Sticky overview + nav */}
      <aside className="sticky top-24 col-span-1 self-start bg-white md:top-32 md:space-y-8">
        <div className="space-y-4">
          <h1 className="pl-4 text-xl font-bold md:text-3xl">
            {useCase.title}
          </h1>
          <Card
            className={cn(
              'bg-accent h-48 overflow-y-auto py-3 md:h-[268px] md:gap-2 md:py-6',
              { scroller: overflow === 'y' || overflow === 'both' }
            )}
            ref={ref}
          >
            <CardHeader className="gap-0">
              <h2 className="prose prose-lg md:prose-xl font-semibold text-white">
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
      <main className="col-span-2 space-y-8 px-4 pt-12 pb-4 md:space-y-16 md:px-16 md:pt-0 md:pb-24 [&_li]:ml-1 [&_li]:list-inside [&_li]:list-disc md:[&_li]:ml-4">
        {SECTIONS.map(({ id, label }) => (
          <section
            key={id}
            id={id}
            style={{ scrollMarginTop: `${topOffset}px` }}
            className={cn(
              'rounded-xl p-4 transition-colors duration-300 ease-in-out md:p-8',
              activeId === id && 'bg-accent/10'
            )}
          >
            <h2
              className={cn(
                'mb-2 text-2xl font-semibold',
                activeId === id ? 'text-accent' : 'text-gray-900'
              )}
            >
              {label}
            </h2>
            <div className="prose">
              <PortableText
                value={
                  useCase[
                    id === 'pain-points'
                      ? 'painPoints'
                      : id === 'solution'
                        ? 'solution'
                        : id === 'benefits'
                          ? 'benefits'
                          : 'korefocusRole'
                  ] || []
                }
              />
            </div>
          </section>
        ))}

        <Button asChild variant="outline">
          <Link href="/#use-cases">← Back to all use cases</Link>
        </Button>
      </main>
    </article>
  );
}
