'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import type { Hero } from '@/lib/sanity/types';
import Image from 'next/image';
import { fadeUp } from '@/lib/motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ hero }: { hero: Hero }) {
  const shouldReduce = useReducedMotion();
  const imgSrc = hero.image?.asset?._ref
    ? urlFor(hero.image).width(800).auto('format').url()
    : '';

  return (
    <div className="flex min-h-[calc(100dvh-var(--navbar-height))] flex-col gap-[clamp(2rem,4vw,3rem)] px-4">
      {/* HERO */}
      <motion.section
        className="flex flex-col items-center gap-4 pt-8"
        initial={shouldReduce ? undefined : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {imgSrc && (
          <motion.div
            className="relative h-48 w-full max-w-lg sm:h-64 lg:h-72"
            variants={shouldReduce ? {} : fadeUp}
          >
            <Image
              src={imgSrc}
              alt={hero.image?.alt || 'Hero image'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}

        <motion.div
          className="w-full max-w-3xl text-center"
          variants={shouldReduce ? {} : fadeUp}
        >
          <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            {hero.heading}{' '}
            <span className="effect-shine text-accent">{hero.headingBlue}</span>
          </h1>
        </motion.div>
      </motion.section>

      {/* BLURBS */}
      <motion.div
        className="mx-auto grid w-full max-w-4xl gap-4 px-4 sm:grid-cols-2 md:grid-cols-3"
        initial={shouldReduce ? undefined : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {hero.ctas?.map((cta) => (
          <motion.div
            key={cta.text}
            variants={shouldReduce ? {} : fadeUp}
            className="group border-border bg-card relative flex h-full flex-col justify-between rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-muted-foreground prose-sm mb-4 italic">
              {cta.text}
            </p>
            <Button asChild variant="ghost">
              <Link
                href={cta.linkTarget || ''}
                className="font-semibold transition-colors"
              >
                <ArrowRight /> {cta.linkText}
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
