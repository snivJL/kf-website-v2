'use client';

import type { Highlights } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { PortableText, PortableTextReactComponents } from 'next-sanity';
import AnimatedSection from '../animated-section';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type HighlightsProps = {
  highlights: Highlights;
};

const portableComponents: Partial<PortableTextReactComponents> = {
  list: {
    // Render bullet lists without default bullets
    bullet: (props) => <ul className="list-none">{props.children}</ul>,
  },
  listItem: (props) => (
    <li className="flex items-start">
      <CheckCircle className="text-accent mt-1 mr-2 h-4 w-4 shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
};
export default function HomeHighlights({ highlights }: HighlightsProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <AnimatedSection
      id="what-we-do"
      amount={0.1}
      className="container mx-auto min-h-[calc(100dvh-96px)] space-y-4 px-4 md:py-24"
    >
      <div className="container mx-auto mb-8 max-w-[700px] px-4 text-center">
        {highlights.heading && (
          <h2 className="text-primary mb-4 text-3xl font-bold md:text-4xl">
            {highlights.heading}
          </h2>
        )}
        {highlights.graySubHeading && (
          <p className="mx-auto max-w-3xl text-2xl leading-tight text-gray-500">
            {highlights.graySubHeading}
          </p>
        )}
        {highlights.blueSubHeading && (
          <p className="text-accent mx-auto max-w-3xl text-2xl leading-tight font-semibold">
            {highlights.blueSubHeading}
          </p>
        )}
      </div>

      <div
        className={cn(
          'grid items-start gap-12 pt-12 md:grid-cols-12 [&_li]:ml-1 [&_li]:list-inside [&_li]:list-disc md:[&_li]:-ml-4'
        )}
        style={{ minHeight: 'calc(100vh - 96px)' }}
      >
        {/* Left column: Accordion */}
        <div className="md:col-span-5">
          <div className="space-y-3">
            <Accordion type="single" collapsible className="space-y-3">
              {highlights.items?.map((item) => (
                <AccordionItem
                  key={item.title}
                  value={item.title || ''}
                  className="bg-primary hover:bg-accent overflow-hidden rounded-2xl border-0 text-white shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    border: '1px solid #f1f5f9',
                    boxShadow:
                      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <AccordionTrigger
                    className={cn(
                      'group cursor-pointer rounded-none border-0 px-6 py-5 text-xl font-semibold shadow-sm hover:no-underline',
                      { 'bg-accent': active === item.title }
                    )}
                    onClick={() =>
                      active === item.title
                        ? setActive(null)
                        : setActive(item.title!)
                    }
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-left leading-tight">
                        {item.title}
                      </span>
                      <div className="ml-4 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all duration-300 group-data-[state=open]:rotate-180">
                          <ChevronDown className="text-primary h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white px-6 pt-6 pb-6">
                    <div className="space-y-5">
                      {item.problem && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              Challenge
                            </h3>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <div className="leading-relaxed text-gray-700">
                              <PortableText value={item.problem} />
                            </div>
                          </div>
                        </div>
                      )}

                      {item.solution && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-primary text-lg font-semibold">
                              Solution
                            </h3>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <div className="border-accent rounded-lg leading-relaxed">
                              <PortableText
                                value={item.solution || []}
                                components={portableComponents}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 md:col-span-7">
          <div className="relative w-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="aspect-video w-full overflow-hidden rounded-2xl object-cover shadow-lg"
              style={{
                border: `3px solid #2D62FF`,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <source src="/kf-ai-connecting-people.mp4" type="video/mp4" />
              <source src="/kf-ai-connecting-people.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
