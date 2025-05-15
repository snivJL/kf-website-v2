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
        translateY: i === 3 && isStatic ? 0 : translateY,
        scale,
        top: `calc(-5vh + ${i * 20}px)`,
        zIndex: 100 - i,
      }}
      className={cn(
        'flex h-[300px] w-full items-center gap-6 rounded-2xl bg-white px-8 shadow-lg transition-shadow hover:shadow-2xl md:w-5/6 md:px-16',
        i === 3
          ? isStatic
            ? 'static'
            : 'absolute top-0 left-1/2 -translate-x-1/2 transform'
          : 'absolute top-0 left-1/2 -translate-x-1/2 transform'
      )}
    >
      <span className="text-accent text-6xl font-semibold">{step.index}</span>
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold">{step.title}</h3>
        <div className="mt-2 text-xl leading-6 text-gray-400">
          <PortableText value={step.description ?? []} />
        </div>
      </div>
    </motion.div>
  );
}
