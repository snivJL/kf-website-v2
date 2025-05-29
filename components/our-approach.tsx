'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { OurApproach } from '@/lib/sanity/types';
import { fadeIn } from '@/lib/motion';
import ValueCarousel from './value-carrousel';

export default function OurApproach({ approach }: { approach: OurApproach }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ['start start', 'end end'],
  // });

  // Smooth scroll
  // useEffect(() => {
  //   const lenis = new Lenis();
  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  //   return () => lenis.destroy();
  // }, []);

  // // number of steps
  // const stepCount = approach.steps?.length ?? 0;
  // const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative scroll-mt-24 pt-12 pb-48"
      ref={containerRef}
      id="how-we-work"
    >
      <motion.div
        className="container mx-auto mb-4 max-w-[700px] px-4"
        // initial={shouldReduce ? {} : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="flex flex-col">
          {approach.heading && (
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {approach.heading}
            </h2>
          )}
          {approach.graySubHeading && (
            <p className="mr-auto max-w-3xl px-4 text-2xl text-gray-400 lg:pl-13">
              {approach.graySubHeading}
            </p>
          )}
          {approach.blueSubHeading && (
            <p className="text-accent mr-auto max-w-3xl px-4 text-2xl lg:pl-13">
              {approach.blueSubHeading}
            </p>
          )}
        </div>
      </motion.div>
      <ValueCarousel />
      {/* <div className="sticky top-[50vh] mt-[50px] flex w-full flex-col">
        {approach.steps?.map((step, i) => {
          const start = i / stepCount;
          const end = (i + 1) / stepCount;
          return (
            <ApproachCard
              key={step._key}
              i={step.index!}
              step={step}
              progress={scrollYProgress}
              range={[start, end]}
              targetScale={1 - (stepCount + i) * 0.02}
            />
          );
        })}
      </div> */}
    </section>
  );
}
