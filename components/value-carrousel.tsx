'use client';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const items = [
  {
    title: 'Plan Your Journey',
    problem:
      'You’re surrounded by opportunities—but where to begin? With so many goals, it’s hard to prioritize and estimate real costs.',
    solution:
      'We translate your operational pain points and business objectives into a clear, actionable roadmap—simple projects with real impact.',
  },
  {
    title: 'Build Your Toolkit',
    problem:
      'The AI market is a maze. Do you pick the latest tool or adapt what you already have? Change your processes or refine them?',
    solution:
      'We define the most valuable use cases and design workflows that enhance your existing business processes—no overhauls unless needed.',
  },
  {
    title: 'Upgrade Your Tech Stack',
    problem:
      'New tools rarely play nice. Integrations cause friction, and mismatched systems slow down everything.',
    solution:
      'We design and embed AI solutions into your current tech stack—so everything works together smoothly, with minimal disruption.',
  },
  {
    title: 'Deliver Lasting Impact',
    problem:
      'Your teams need time. Change is hard, and AI adoption doesn’t happen overnight. How do you keep momentum without burnout?',
    solution:
      'We offer tailored training, knowledge bases, and real-time user support—plus continuous improvement based on feedback and usage.',
  },
  {
    title: 'Keep AI in Control',
    problem:
      'AI brings value—but also risk. How do you ensure safety, compliance, and trust in every decision it makes?',
    solution:
      'Our AI Framework embeds security, ethics, confidentiality, and governance—so you stay in control, always.',
  },
];
function ValueCarousel() {
  const [activeItem, setActiveItem] = useState(0);
  const wrapperRef = useRef<HTMLUListElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    wrapperRef.current.style.setProperty(
      '--transition',
      '600ms cubic-bezier(0.22, 0.61, 0.36, 1)'
    );

    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty('--transition');
    }, 900);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center py-12">
      <div className="w-full max-w-full">
        <ul
          ref={wrapperRef}
          className="group flex w-full flex-col gap-3 md:h-[480px] md:flex-row md:gap-[1.5%]"
        >
          {items.map((item, index) => (
            <li
              onClick={() => setActiveItem(index)}
              aria-current={activeItem === index}
              className={cn(
                'relative cursor-pointer',
                "md:w-[8%] md:[&[aria-current='true']]:w-[48%]",
                'md:[transition:width_var(--transition,200ms_ease-in)]',
                'md:before-block before:absolute before:top-0 before:right-[-10px] before:bottom-0 before:left-[-10px] before:hidden before:bg-white',
                // 'md:hover:w-[12%]',
                'md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0'
              )}
              key={item.title}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-100">
                <p
                  className={cn(
                    'bg-accent border-accent absolute top-46 -left-48 mx-auto w-[480px] rotate-270 rounded-tl-2xl rounded-tr-2xl border-l py-10 pr-4 pl-12 text-3xl font-semibold transition-colors ease-in-out md:hover:text-white/80',
                    activeItem === index ? 'text-blue-500' : 'text-white'
                  )}
                >
                  {item.title}
                </p>

                <div
                  className={cn(
                    'top-0 left-32 flex h-full w-[360px] flex-col justify-between px-0 pt-6 pb-12 md:absolute',
                    activeItem === index
                      ? 'md:translate-x-0'
                      : 'md:translate-x-4'
                  )}
                >
                  <div className="space-y-2">
                    <p className="text-primary pt-4 pb-6 text-2xl font-bold uppercase">
                      {item.title}
                    </p>

                    <p className="text-primary text-xl font-semibold tracking-wide uppercase">
                      Problem to be solved
                    </p>
                    <p className="prose prose-lg text-primary">
                      {item.problem}
                    </p>
                  </div>{' '}
                  <div className="divider-animated divider-animated--delay" />
                  <div className="space-y-2 delay-100">
                    <p className="text-primary text-xl font-semibold tracking-wide uppercase">
                      Our Approach
                    </p>
                    <p className="prose prose-lg text-primary">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ValueCarousel;
