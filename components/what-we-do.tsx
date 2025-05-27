'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { WhatWeDo, WhatWeDoItem } from '@/lib/sanity/types';

interface WhatWeDoProps {
  whatWeDo: WhatWeDo;
}

export default function WhatWeDo({ whatWeDo }: WhatWeDoProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="what-we-do"
      className="min-h-[calc(100dvh-var(--navbar-height))] scroll-mt-24 bg-white py-[clamp(3rem,5vw,6rem)]"
    >
      <motion.div
        className="container mx-auto mb-8 max-w-[700px] px-4"
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col">
          {whatWeDo.heading && (
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {whatWeDo.heading}
            </h2>
          )}
          {whatWeDo.graySubHeading && (
            <p className="max-w-3xl pl-13 text-2xl text-gray-400">
              {whatWeDo.graySubHeading}
            </p>
          )}
          {whatWeDo.blueSubHeading && (
            <p className="text-accent max-w-3xl pl-13 text-2xl">
              {whatWeDo.blueSubHeading}
            </p>
          )}
        </div>
      </motion.div>
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
        {whatWeDo.cards?.map((card: WhatWeDoItem, idx: number) => {
          // interleave blue/gray lines
          const lines: { text: string; color: 'blue' | 'gray' }[] = [];
          const blue = card.blueLines ?? [];
          const gray = card.grayLines ?? [];
          const max = Math.max(blue.length, gray.length);
          for (let i = 0; i < max; i++) {
            if (blue[i]) lines.push({ text: blue[i], color: 'blue' });
            if (gray[i]) lines.push({ text: gray[i], color: 'gray' });
          }

          return (
            <motion.div
              key={idx}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1"
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={shouldReduce ? {} : { opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              id="what-we-do"
            >
              <span data-glow className="glow" />

              {/* Header with icon */}
              <div className="relative z-10 flex items-center space-x-3 bg-black px-6 py-4 text-white">
                <div>
                  <h3 className="text-2xl font-bold uppercase">{card.title}</h3>
                  <p className="mt-1 text-lg text-gray-300">{card.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between px-6 py-8">
                <div className="space-y-2">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.color === 'blue'
                          ? 'text-accent text-xl font-semibold'
                          : 'text-gray-500'
                      }
                    >
                      {line.text}
                    </p>
                  ))}
                </div>

                {/* CTA button */}
                <div className="mt-6">
                  <Button size="lg" className="w-full" asChild>
                    <Link href={card.buttonLink || '#'}>
                      {card.buttonText} →
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
