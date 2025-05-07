"use client";

import { useRef, useEffect } from "react";
import Lenis from "lenis";
import { useScroll } from "framer-motion";
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

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 mb-4">
        <div className="text-center">
          {approach.heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {approach.heading}
            </h2>
          )}
          {approach.graySubHeading && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {approach.graySubHeading}
            </p>
          )}
          {approach.blueSubHeading && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {approach.blueSubHeading}
            </p>
          )}
        </div>
      </div>

      <div ref={containerRef}>
        {approach.steps.map((step, i) => {
          const targetScale = 1 - (approach.steps.length - i) * 0.05;
          return (
            <ApproachCard
              key={step._key}
              i={step.index!}
              step={step}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
