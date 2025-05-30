'use client';

import { motion } from 'framer-motion';
import type { HowWeWork } from '@/lib/sanity/types';
import { fadeIn } from '@/lib/motion';
import ValueCarousel from './value-carrousel';
import AnimatedSection from './animated-section';

export default function OurApproach({ howWeWork }: { howWeWork: HowWeWork }) {
  return (
    <AnimatedSection
      className="relative min-h-[calc(100dvh-96px)] scroll-mt-24 py-24"
      id="how-we-work"
    >
      <motion.div
        className="container mx-auto mb-4 max-w-[700px] px-4"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="flex flex-col">
          {howWeWork.title && (
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {howWeWork.title}
            </h2>
          )}
          {howWeWork.graySubHeading && (
            <p className="mr-auto max-w-3xl px-4 text-2xl text-gray-400 lg:pl-13">
              {howWeWork.graySubHeading}
            </p>
          )}
          {howWeWork.blueSubHeading && (
            <p className="text-accent mr-auto max-w-3xl px-4 text-2xl lg:pl-13">
              {howWeWork.blueSubHeading}
            </p>
          )}
        </div>
      </motion.div>
      <ValueCarousel items={howWeWork.items || []} />
    </AnimatedSection>
  );
}
