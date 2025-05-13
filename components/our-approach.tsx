"use client";

import { useRef, useEffect } from "react";
import Lenis from "lenis";
import { useScroll, motion, useReducedMotion } from "framer-motion";
import type { OurApproach } from "@/lib/sanity/types";
import ApproachCard from "./approach-card";

export default function OurApproach({ approach }: { approach: OurApproach }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // number of steps
  const stepCount = approach.steps?.length ?? 0;
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-12 relative h-[2400px] scroll-mt-24"
      ref={containerRef}
      id="how-we-work"
    >
      <motion.div
        className="container mx-auto px-4 mb-4 max-w-[700px] sticky top-[20vh]"
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col">
          {approach.heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              {approach.heading}
            </h2>
          )}
          {approach.graySubHeading && (
            <p className="text-2xl text-gray-400 max-w-3xl pl-13">
              {approach.graySubHeading}
            </p>
          )}
          {approach.blueSubHeading && (
            <p className="text-2xl text-accent max-w-3xl pl-13">
              {approach.blueSubHeading}
            </p>
          )}
        </div>
      </motion.div>

      <div className="mt-[50px] flex flex-col w-full sticky top-[50vh]">
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
      </div>
    </section>
  );
}
