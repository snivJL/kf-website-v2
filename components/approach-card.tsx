import { OurApproach } from "@/lib/sanity/types";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { PortableText } from "next-sanity";
import { useRef } from "react";

interface ApproachCardProps {
  i: number;
  step: OurApproach["steps"][number];
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

export default function ApproachCard({
  step,
  progress,
  i,
  range,
  targetScale,
}: ApproachCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldReduce = useReducedMotion();
  const scale = useTransform(progress, range, [1, targetScale]);
  const description = step.description ?? [];

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-2vh + ${i * 18}px)`,
        }}
        initial={shouldReduce ? undefined : "hidden"}
        className="relative flex items-center gap-6 rounded-2xl shadow p-8 md:p-12 w-[90%] max-w-5xl h-[300px] bg-white"
      >
        <span className="text-accent font-semibold text-6xl">{step.index}</span>
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold">{step.title}</h3>
          <div className="text-gray-400 text-xl mt-2 leading-6">
            <PortableText value={description} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
