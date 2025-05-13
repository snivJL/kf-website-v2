"use client";

import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
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
    <div className="h-screen flex flex-col px-4 gap-12">
      {/* HERO */}
      <motion.section
        className="flex flex-col items-center gap-4 pt-8"
        initial={shouldReduce ? undefined : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {imgSrc && (
          <motion.div
            className="w-full max-w-lg relative h-48 sm:h-64 lg:h-72"
            variants={shouldReduce ? {} : fadeUp}
          >
            <Image
              src={imgSrc}
              alt={hero.image?.alt || "Hero image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}

        <motion.div
          className="w-full max-w-3xl text-center"
          variants={shouldReduce ? {} : fadeUp}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {hero.heading}{" "}
            <span className="effect-shine text-accent">{hero.headingBlue}</span>
          </h1>
        </motion.div>
      </motion.section>

      {/* BLURBS */}
      <motion.div
        className="w-full max-w-5xl mx-auto pb-8 flex flex-col prose"
        initial={shouldReduce ? undefined : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <motion.p
          variants={shouldReduce ? {} : fadeUp}
          className="prose-lg mb-0"
        >
          We design and implement AI solutions to better generate, structure and
          activate data —{" "}
          <Link href="/#concretely" className="font-semibold text-accent">
            Concretely
          </Link>
        </motion.p>
        <motion.p
          variants={shouldReduce ? {} : fadeUp}
          className="prose-lg mb-0"
        >
          We support small and mid-size organizations with an obsession: it’s
          working. It’s simple. It’s helping —{" "}
          <Link href="/#how-we-work" className="font-semibold text-accent">
            Approach
          </Link>
        </motion.p>
        <motion.p
          variants={shouldReduce ? {} : fadeUp}
          className="prose-lg mb-0"
        >
          We provide comprehensive support, covering business and technology: to
          be your ideal partner if you don’t have a full-fledge team in-house —{" "}
          <Link href="/#how-we-work" className="font-semibold text-accent">
            How we work
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
