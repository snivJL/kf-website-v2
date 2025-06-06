'use client';

import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UseCaseItem } from '@/lib/sanity/types';
import UseCaseNavigator, { SECTIONS } from './use-case-navigator';
import { Card, CardContent, CardHeader } from './ui/card';
import { UseCaseMobileNav } from './use-case-mobile-nav';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useOverflow } from '@/hooks/use-overflow';

interface Props {
  useCase: UseCaseItem;
}

export default function UseCaseContent({ useCase }: Props) {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const isMobile = useIsMobile();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const topOffset = isMobile ? 500 : 224;
  const [ref, overflow, isScrolledToBottom] = useOverflow<HTMLDivElement>();

  // scroll-spy
  useEffect(() => {
    const sentinel = bottomRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (sentinel) {
          const endEntry = entries.find((e) => e.target === sentinel);
          if (endEntry?.isIntersecting) {
            setActiveId(SECTIONS[SECTIONS.length - 1].id);
            return;
          }
        }
        const visible = entries
          .filter((e) => e.isIntersecting && e.target !== sentinel)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `${-topOffset}px 0px -55% 0px`,
        threshold: 0,
      }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [topOffset]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showScrollerClass =
    (overflow === 'y' || overflow === 'both') && !isScrolledToBottom;

  return (
    <article className="mx-auto max-w-7xl scroll-smooth px-4 md:grid md:grid-cols-12 md:gap-x-12">
      {/* LEFT: Sticky overview + nav */}
      <aside className="sticky top-24 col-span-4 self-start bg-white md:top-32 md:space-y-8">
        <div className="flex w-full flex-col">
          <blockquote className="pb-2 text-center text-xl text-gray-600 italic">
            {useCase.shortTestimonial}
          </blockquote>
          <blockquote className="ml-auto text-lg leading-tight font-semibold text-gray-800">
            {useCase.shortTestimonialAuthor}
          </blockquote>
          <blockquote className="ml-auto pb-6 text-lg leading-tight font-semibold text-gray-800">
            {useCase.shortTestimonialCompany}
          </blockquote>
          <Card
            className={cn(
              'bg-accent h-48 overflow-y-auto py-3 md:h-auto md:max-h-[268px] md:gap-2 md:py-6',
              {
                scroller: showScrollerClass,
              }
            )}
            ref={ref}
          >
            <CardHeader className="gap-0">
              <h2 className="leading-tight font-semibold text-white md:text-xl">
                Objective
              </h2>
            </CardHeader>
            <CardContent>
              <div className="prose text-white">
                <PortableText value={useCase.objective || []} />
              </div>
            </CardContent>
          </Card>
        </div>
        <UseCaseMobileNav activeId={activeId} onSelect={jumpTo} />
        <UseCaseNavigator activeId={activeId} />
      </aside>

      {/* RIGHT: Scrollable deep dive */}
      <main className="col-span-8 space-y-8 px-4 pb-4 md:space-y-8 md:px-16 md:pt-0 md:pb-8 [&_li]:ml-1 [&_li]:list-outside [&_li]:list-disc md:[&_li]:ml-4">
        <div className="sticky top-24 z-10 bg-white pt-8 pb-8">
          <h1 className="text-3xl font-bold md:text-4xl">
            <span>{useCase.title}</span>{' '}
            <span className="text-accent">{useCase.company}</span>
          </h1>
        </div>
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
            <div className={'prose leading-tight'}>
              <PortableText
                value={
                  useCase[
                    id === 'pain-points'
                      ? 'painPoints'
                      : id === 'solution'
                        ? 'solution'
                        : id === 'benefits'
                          ? 'benefits'
                          : id === 'testimonial'
                            ? 'testimonial'
                            : 'korefocusRole'
                  ] || []
                }
              />
            </div>
          </section>
        ))}
        <div ref={bottomRef} style={{ height: '1px' }} />

        <Button asChild variant="outline">
          <Link href="/#use-cases">← Back to all use cases</Link>
        </Button>
      </main>
    </article>
  );
}
