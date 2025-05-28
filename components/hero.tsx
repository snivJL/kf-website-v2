'use client';

import {
  useReducedMotion,
  motion,
  type TargetAndTransition,
} from 'framer-motion';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import type { Hero } from '@/lib/sanity/types';
import Image from 'next/image';
import { fadeIn, fadeUp } from '@/lib/motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const container = {
  hidden: fadeIn.hidden,
  show: {
    ...fadeIn.show,
    transition: {
      ...(fadeIn.show as TargetAndTransition).transition,
      staggerChildren: 0.2,
    },
  },
};

const blurbContainer = {
  hidden: fadeIn.hidden,
  show: {
    ...fadeIn.show,
    transition: {
      ...(fadeIn.show as TargetAndTransition).transition,
      staggerChildren: 0.15,
    },
  },
};

export default function HeroSection({ hero }: { hero: Hero }) {
  const shouldReduce = useReducedMotion();
  const imgSrc = hero.image?.asset?._ref
    ? urlFor(hero.image).width(800).auto('format').url()
    : '';

  return (
    <div className="flex min-h-[100dvh_-_96px] flex-col justify-between px-4 py-[clamp(3rem,8vh,6rem)]">
      <motion.section
        className="flex flex-col items-center gap-6 md:pt-[clamp(2rem,8vh,5rem)]"
        initial={shouldReduce ? undefined : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={shouldReduce ? {} : container}
      >
        {imgSrc && (
          <motion.div
            className="relative h-40 w-full max-w-lg md:h-48 2xl:h-64"
            variants={shouldReduce ? {} : fadeUp}
          >
            <Image
              src={imgSrc}
              alt={hero.image?.alt || 'Hero image'}
              fill
              priority
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
        className="mx-auto mt-8 grid w-full max-w-5xl gap-6 px-4 pb-[clamp(3rem,8vh,6rem)] sm:grid-cols-2 md:grid-cols-3"
        initial={shouldReduce ? undefined : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={shouldReduce ? {} : blurbContainer}
      >
        {hero.ctas?.map((cta) => (
          <motion.div
            key={cta.text}
            variants={shouldReduce ? {} : fadeUp}
            className="group border-border bg-card relative flex min-h-40 flex-col justify-between rounded-2xl border p-6 pb-4 shadow-sm transition-shadow hover:shadow-md sm:min-h-52 md:pb-6 lg:min-h-60"
          >
            <p className="text-muted-foreground prose prose-sm italic md:mb-4">
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
