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
  const [activeItem, setActiveItem] = useState(3);
  const wrapperRef = useRef<HTMLUListElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="mb-6 text-center text-4xl font-bold">
        How we create value for your business
      </h2>
      <div className="w-[1200px] max-w-full">
        <ul
          ref={wrapperRef}
          className="group flex flex-col gap-3 md:h-[540px] md:flex-row md:gap-[1.5%]"
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
                'md:hover:w-[12%]',
                'md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0'
              )}
              key={item.title}
            >
              <div className="from-accent to-accent/80 relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br">
                <p className="absolute top-48 -left-54 w-[520px] rotate-270 text-4xl font-semibold text-white">
                  {item.title}
                </p>

                <div
                  className={cn(
                    'before:bg-texture after:bg-texture inset-0 opacity-25 duration-300 before:absolute before:top-[-148px] before:right-0 before:bottom-0 before:left-[-546px] before:z-10 after:top-0 after:right-[-434px] after:bottom-[28px] after:left-0 after:z-10 md:absolute md:transition-opacity',
                    activeItem === index ? 'md:opacity-25' : 'md:opacity-0'
                  )}
                />
                {/* <div
                  className={cn(
                    'top-12 left-32 w-[320px] space-y-6 transition-[transform,opacity] md:absolute md:p-0',
                    activeItem === index
                      ? 'md:translate-x-0 md:opacity-100'
                      : 'md:translate-x-4 md:opacity-0'
                  )}
                > */}
                <div
                  className={cn(
                    'top-0 left-32 flex h-full w-[360px] flex-col justify-between px-6 py-18 transition-[transform,opacity] md:absolute',
                    activeItem === index
                      ? 'md:translate-x-0 md:opacity-100'
                      : 'md:translate-x-4 md:opacity-0'
                  )}
                >
                  <div className="space-y-2">
                    <p className="text-xl font-semibold tracking-wide text-white uppercase">
                      The Problem
                    </p>
                    <p className="prose prose-lg text-white">{item.problem}</p>
                  </div>{' '}
                  <div className="divider-animated divider-animated--delay" />
                  <div className="space-y-2 delay-100">
                    <p className="text-xl font-semibold tracking-wide text-white uppercase">
                      Our Solution
                    </p>
                    <p className="prose prose-lg text-white">{item.solution}</p>
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
