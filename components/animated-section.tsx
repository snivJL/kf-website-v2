'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { fadeIn } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  variants?: Variants;
  amount?: number;
}

export default function AnimatedSection({
  children,
  className,
  variants = fadeIn,
  id,
  amount = 0.3,
}: AnimatedSectionProps) {
  const shouldReduce = useReducedMotion();
  const controls = useAnimation();
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const inView = useInView(ref, {
    amount: isMobile ? 0.1 : amount,
    once: true,
  });
  useEffect(() => {
    if (shouldReduce) return;
    if (inView) {
      controls.start('show');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls, shouldReduce]);

  return (
    <motion.section
      ref={ref}
      className={cn(className)}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : controls}
      variants={shouldReduce ? {} : variants}
      id={id}
    >
      {children}
    </motion.section>
  );
}
