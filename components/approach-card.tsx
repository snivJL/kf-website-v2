import type { StepsItem } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { PortableText } from 'next-sanity';
import { useState } from 'react';

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
  useMotionValueEvent(progress, 'change', (latest) => {
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
        translateY,
        scale,
        top: `calc(-5vh + ${i * 20}px)`,
        zIndex: 100 - i,
      }}
      className={cn(
        'w-full rounded-xl bg-white shadow md:w-5/6',
        'absolute top-0 left-1/2 min-h-76 -translate-x-1/2 transform',
        i === 3 && isStatic ? 'static' : '',
        'flex flex-col items-start gap-4 px-6 py-8 md:flex-row md:items-center md:gap-6 md:px-16 md:py-0'
      )}
    >
      {/* Left: Index number */}
      <div className="flex items-center gap-6 md:block md:gap-0">
        <span className="text-accent text-4xl font-semibold md:text-6xl">
          {step.index}
        </span>
        {/* Mobile only: Title next to index */}
        <h3 className="text-2xl font-bold md:hidden">{step.title}</h3>
      </div>

      {/* Right: Title (desktop only) and description */}
      <div className="flex w-full flex-col">
        <h3 className="hidden text-3xl font-bold md:block">{step.title}</h3>
        <div className="prose prose-xl mt-2">
          <PortableText value={step.description ?? []} />
        </div>
      </div>
    </motion.div>
  );
}
