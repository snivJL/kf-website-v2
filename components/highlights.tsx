'use client';

import type { Highlights } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { PortableText, PortableTextReactComponents } from 'next-sanity';
import AnimatedSection from './animated-section';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { CheckCircle, ChevronDown } from 'lucide-react';

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
      <CheckCircle className="mt-1 mr-2 h-4 w-4 shrink-0 text-[#2D62FF]" />
      <span>{props.children}</span>
    </li>
  ),
};
export default function HomeHighlights({ highlights }: HighlightsProps) {
  const firstItem = highlights.items?.[0];

  return (
    <AnimatedSection
      id="what-we-do"
      amount={0.1}
      className="container mx-auto min-h-[calc(100dvh-96px)] space-y-4 px-4 py-24"
    >
      <div className="container mx-auto mb-8 max-w-[700px] space-y-2 px-4 text-center">
        {highlights.heading && (
          <h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{ color: '#171717' }}
          >
            {highlights.heading}
          </h2>
        )}
        {highlights.graySubHeading && (
          <p className="mx-auto max-w-3xl text-2xl text-gray-500">
            {highlights.graySubHeading}
          </p>
        )}
        {highlights.blueSubHeading && (
          <p
            className="mx-auto max-w-3xl text-2xl font-semibold"
            style={{ color: '#2D62FF' }}
          >
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
                  className="overflow-hidden rounded-2xl border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    border: '1px solid #f1f5f9',
                    boxShadow:
                      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <AccordionTrigger className="group text-primary bg-accent/5 cursor-pointer rounded-none border-0 px-6 py-5 text-xl font-semibold hover:no-underline">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-left leading-tight">
                        {item.title}
                      </span>
                      <div className="ml-4 flex-shrink-0">
                        <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-data-[state=open]:rotate-180">
                          <ChevronDown className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-2 pb-6">
                    <div className="space-y-5">
                      {item.problem && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              The Challenge
                            </h3>
                          </div>
                          <div className="prose prose-sm max-w-none pl-3">
                            <div className="leading-relaxed text-gray-700">
                              <PortableText value={item.problem} />
                            </div>
                          </div>
                        </div>
                      )}

                      {item.solution && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-accent text-lg font-semibold">
                              Our Solution
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

        {/* Right column: static first item */}
        {firstItem && (
          <div className="flex flex-col items-center justify-center space-y-6 px-4 md:col-span-7">
            {firstItem.shortText && (
              <div
                className="text-muted-foreground rounded-xl px-6 py-4 text-center text-2xl font-semibold italic"
                // style={{
                //   color: '#171717',
                //   backgroundColor: '#f8faff',
                //   border: `2px solid #e6f0ff`,
                // }}
              >
                {firstItem.shortText}
              </div>
            )}
            <div className="relative w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="my-6 aspect-video w-full overflow-hidden rounded-2xl object-cover shadow-lg"
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
              {/* Decorative gradient overlay */}
            </div>
            {firstItem.testimonial && (
              <blockquote className="text-muted-foreground relative rounded-xl px-6 py-4 text-center text-lg leading-relaxed italic">
                <div className="relative z-10">
                  <PortableText value={firstItem.testimonial} />
                </div>
                {/* Quote marks */}
                <div className="text-accent absolute top-2 left-4 text-4xl font-bold opacity-20">
                  &quot;
                </div>
                <div className="text-accent absolute right-4 bottom-2 text-4xl font-bold opacity-20">
                  &quot;
                </div>
              </blockquote>
            )}
            {firstItem.tagline && (
              <div className="text-accent rounded-full px-6 py-3 text-xl font-bold">
                {firstItem.tagline}
              </div>
            )}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
