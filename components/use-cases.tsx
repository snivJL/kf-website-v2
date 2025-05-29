'use client';

import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UseCase } from '@/lib/sanity/types';
import { PortableText } from 'next-sanity';
import { fadeIn } from '@/lib/motion';

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type UseCasesProps = {
  useCaseSection: UseCase;
};
export const UseCases = ({ useCaseSection }: UseCasesProps) => {
  const { heading, subHeading, description, useCases, blueSection } =
    useCaseSection || {};
  const shouldReduce = useReducedMotion();
  return (
    <motion.section
      id="use-cases"
      className="h-[calc(100dvh-96px)] scroll-mt-24 bg-white px-8 py-12"
      initial={shouldReduce ? {} : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left Intro */}
        <div className="prose space-y-6">
          <h2 className="text-4xl leading-tight font-bold">{heading}</h2>
          {subHeading && (
            <p className="prose-xl leading-tight text-gray-700 italic">
              {subHeading}
            </p>
          )}
          <PortableText value={description || []} />
          <p className="text-accent prose prose-xl italic">{blueSection}</p>
        </div>

        {/* Right Cards */}
        <motion.div
          className="space-y-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {useCases
            ? useCases.map((useCase) => (
                <motion.div key={useCase._key} variants={item}>
                  <Card className="shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="space-y-4">
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {useCase.hook}
                      </CardDescription>
                      <Button asChild variant="outline">
                        <Link href={useCase.buttonLink || ''}>
                          Learn More →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            : null}
        </motion.div>
      </div>
    </motion.section>
  );
};
