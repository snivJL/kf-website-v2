"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UseCase } from "@/lib/sanity/types";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
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
  const { heading, subHeading, description, useCases } = useCaseSection || {};
  return (
    <section id="use-cases" className="bg-white text-gray-900 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Intro */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">{heading}</h2>
          {subHeading && (
            <p className="text-4xl italic leading-tight text-gray-700">
              {subHeading}
            </p>
          )}
          <p className="text-gray-600">{description}</p>
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
    </section>
  );
};
