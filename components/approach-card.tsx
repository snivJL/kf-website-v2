import type { StepsItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { PortableText } from "next-sanity";
import { useState } from "react";

interface ApproachCardProps {
  i: number;
  step: StepsItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export default function ApproachCard({
  step,
  progress,
  i,
  range: [enterStart, enterEnd],
  targetScale,
}: ApproachCardProps) {
  const windowSize = enterEnd - enterStart;

  const [isStatic, setIsStatic] = useState(false);
  useMotionValueEvent(progress, "change", (latest) => {
    if (i === 4) {
      // once progress >= enterStart, we flip to static
      setIsStatic(latest >= enterStart);
    }
  });
  // we anchor the scale curve so it stays at 1 until enterStart,
  // then shrinks to .8 over [enterStart, enterEnd]
  const inputRange = [
    enterStart - windowSize,
    enterStart,
    enterEnd,
    enterEnd + windowSize,
  ];

  const translateY = useTransform(progress, [enterStart, enterEnd], [0, -1000]);
  const scale = useTransform(progress, inputRange, [
    targetScale,
    0.92,
    0.8,
    targetScale,
  ]);
  return (
    <motion.div
      style={{
        translateY: i === 3 && isStatic ? 0 : translateY,
        scale,
        top: `calc(-5vh + ${i * 20}px)`,
        zIndex: 100 - i,
      }}
      className={cn(
        "flex items-center px-16 w-5/6 h-[300px] bg-white gap-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow",
        i === 3
          ? isStatic
            ? "static"
            : "absolute top-0 left-1/2 transform -translate-x-1/2"
          : "absolute top-0 left-1/2 transform -translate-x-1/2"
      )}
    >
      <span className="text-accent font-semibold text-6xl">{step.index}</span>
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold">{step.title}</h3>
        <div className="text-gray-400 text-xl mt-2 leading-6">
          <PortableText value={step.description ?? []} />
        </div>
      </div>
    </motion.div>
  );
}
