'use client';

import { motion, Variants } from 'framer-motion';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import type { UseCase } from '@/lib/sanity/types';
import { PortableText } from 'next-sanity';
import AnimatedSection from '../animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

  return (
    <AnimatedSection
      id="use-cases"
      className="min-h-[calc(100dvh-96px)] scroll-mt-24 bg-white px-8 py-24"
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
            ? useCases.map((useCase, i) => (
                <motion.div key={useCase._key} variants={item}>
                  <Card className="shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="space-y-4">
                      <CardTitle className="text-xl">{`${useCase.title} ${useCase.company}`}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {useCase.hook}
                      </CardDescription>
                      <Button
                        asChild
                        variant="outline"
                        className={cn({
                          invisible: i === 2,
                        })}
                      >
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
    </AnimatedSection>
  );
};
