"use client";

import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UseCase } from "@/lib/sanity/types";
import { PortableText } from "next-sanity";

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
      className="bg-white text-gray-900 py-16 px-8 scroll-mt-24"
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Intro */}
        <div className="space-y-6 prose">
          <h2 className="text-4xl font-bold leading-tight">{heading}</h2>
          {subHeading && (
            <p className="prose-xl italic leading-tight text-gray-700">
              {subHeading}
            </p>
          )}
          <PortableText value={description || []} />
          <p className="text-accent prose-xl italic">{blueSection}</p>
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
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="space-y-4">
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {useCase.hook}
                      </CardDescription>
                      <Button asChild variant="outline">
                        <Link href={useCase.buttonLink || ""}>
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
