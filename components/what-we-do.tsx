"use client";
import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { WhatWeDo, WhatWeDoItem } from "@/lib/sanity/types";

interface WhatWeDoProps {
  whatWeDo: WhatWeDo;
}

export default function WhatWeDo({ whatWeDo }: WhatWeDoProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="concretely" className="py-20">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {whatWeDo.heading}
        </h2>
      </div>

      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
        {whatWeDo.cards
          ? whatWeDo.cards.map((card: WhatWeDoItem, idx: number) => {
              const lines: { text: string; color: "blue" | "gray" }[] = [];
              const blue = card.blueLines ?? [];
              const gray = card.grayLines ?? [];
              const max = Math.max(blue.length, gray.length);
              for (let i = 0; i < max; i++) {
                if (blue[i]) {
                  lines.push({ text: blue[i], color: "blue" });
                }
                if (gray[i]) {
                  lines.push({ text: gray[i], color: "gray" });
                }
              }

              return (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow"
                  initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                  whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                >
                  {/* Header */}
                  <div className="bg-black text-white px-6 py-4">
                    <h3 className="text-2xl font-bold uppercase">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-lg text-gray-300">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      {lines.map((line, i) => (
                        <p
                          key={i}
                          className={
                            line.color === "blue"
                              ? "text-accent font-semibold text-xl"
                              : "text-gray-500"
                          }
                        >
                          {line.text}
                        </p>
                      ))}
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                      <Button size="lg" className="w-full" asChild>
                        <Link href={card.buttonLink || ""}>
                          {card.buttonText} →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          : null}
      </div>
    </section>
  );
}
