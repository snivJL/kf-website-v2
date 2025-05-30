'use client';
import { HowWeWorkItem } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import { useEffect, useRef, useState } from 'react';

type Props = {
  items: HowWeWorkItem[];
};
function ValueCarousel({ items }: Props) {
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
                'relative mx-4 cursor-pointer md:mx-0',
                "md:w-[8%] md:[&[aria-current='true']]:w-[48%]",
                'md:[transition:width_var(--transition,200ms_ease-in)]',
                'md:before-block before:absolute before:top-0 before:right-[-10px] before:bottom-0 before:left-[-10px] before:hidden before:bg-white',
                'md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0'
              )}
              key={item.title}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-100">
                <div className="space-y-6 p-6 md:hidden">
                  <h3 className="text-primary text-xl font-bold">
                    {item.title}
                  </h3>
                  <div>
                    <p className="text-primary text-sm font-semibold uppercase">
                      Problem to be solved
                    </p>
                    <PortableText value={item.problem || []} />
                  </div>
                  <div>
                    <p className="text-primary text-sm font-semibold uppercase">
                      Our Approach
                    </p>
                    <PortableText value={item.solution || []} />
                  </div>
                </div>

                <p
                  className={cn(
                    'md:hover:bg-accent absolute top-46 -left-48 mx-auto hidden w-[480px] rotate-270 rounded-tl-2xl rounded-tr-2xl border-l py-10 pr-4 pl-12 text-3xl font-semibold transition-colors ease-in hover:text-white/50 md:block',
                    activeItem === index
                      ? 'bg-accent text-white/50'
                      : 'bg-accent/85 text-white'
                  )}
                >
                  {item.title}
                </p>

                <div className="top-0 left-32 hidden flex-col justify-between px-0 pt-6 pb-12 md:absolute md:flex md:h-full md:w-[360px] 2xl:w-[424px]">
                  <div className="space-y-2">
                    <p className="text-primary pt-4 pb-6 text-2xl font-bold uppercase">
                      {item.title}
                    </p>

                    <p className="text-primary text-xl font-semibold tracking-wide uppercase">
                      Problem to be solved
                    </p>
                    <PortableText value={item.problem || []} />
                  </div>
                  <div className="divider-animated divider-animated--delay" />
                  <div className="space-y-2 delay-100">
                    <p className="text-primary text-xl font-semibold tracking-wide uppercase">
                      Our Approach
                    </p>
                    <PortableText value={item.solution || []} />
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
