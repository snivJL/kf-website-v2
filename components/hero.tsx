"use client";

import { motion, useReducedMotion } from "framer-motion";
import { urlFor } from "@/lib/sanity/client";
import type { Hero } from "@/lib/sanity/types";
import Image from "next/image";
import { fadeUp } from "@/lib/motion";

export default function HeroSection({ hero }: { hero: Hero }) {
  const shouldReduce = useReducedMotion();
  const imgSrc = hero.image?.asset?._ref
    ? urlFor(hero.image).width(800).auto("format").url()
    : "";

  return (
    <>
      <motion.section
        className="relative flex flex-col items-center justify-center gap-2 min-h-screen px-4 pb-12"
        initial={shouldReduce ? undefined : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {imgSrc && (
          <motion.div
            className="w-full lg:w-1/2 relative h-64 sm:h-96 lg:h-[300px]"
            variants={shouldReduce ? {} : fadeUp}
          >
            <Image
              src={imgSrc}
              alt={hero.image?.alt || "Hero image"}
              fill
              className="object-contain "
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}

        <motion.div
          className="w-full lg:w-2/3 text-center lg:text-left"
          variants={shouldReduce ? {} : fadeUp}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {hero.heading}{" "}
            <span className="effect-shine text-accent">{hero.headingBlue}</span>
          </h1>
        </motion.div>
      </motion.section>
    </>
  );
}
