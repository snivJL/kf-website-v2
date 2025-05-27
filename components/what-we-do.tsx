'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { WhatWeDo, WhatWeDoItem } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface WhatWeDoProps {
  whatWeDo: WhatWeDo;
}

export default function WhatWeDo({ whatWeDo }: WhatWeDoProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="what-we-do"
      className="min-h-[calc(100dvh-96px)] scroll-mt-24 pb-[clamp(2rem,8vh,6rem)]"
    >
      <motion.div
        className="container mx-auto mb-8 max-w-[700px] space-y-2 px-4 text-center"
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {whatWeDo.heading && (
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {whatWeDo.heading}
          </h2>
        )}
        {whatWeDo.graySubHeading && (
          <p className="mx-auto max-w-3xl text-2xl text-gray-400">
            {whatWeDo.graySubHeading}
          </p>
        )}
        {whatWeDo.blueSubHeading && (
          <p className="text-accent mx-auto max-w-3xl text-2xl">
            {whatWeDo.blueSubHeading}
          </p>
        )}
      </motion.div>

      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3 xl:px-0">
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
              <div className="bg-primary relative z-10 flex flex-col space-x-3 px-6 py-4 text-white">
                <h3 className="line-clamp-1 text-2xl font-bold uppercase">
                  {card.title}
                </h3>
                <p className="mt-1 text-lg text-gray-300">{card.subtitle}</p>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 2xl:py-10">
                <div className="space-y-2">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className={cn(
                        'line-clamp-1',
                        line.color === 'blue'
                          ? 'text-accent text-xl font-semibold'
                          : 'text-gray-500'
                      )}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>

                {/* CTA button */}
                <div className="mt-4 2xl:mt-8">
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
