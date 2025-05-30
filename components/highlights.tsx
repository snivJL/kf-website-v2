'use client';
import { Highlights } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import AnimatedSection from './animated-section';

type HighlightsProps = {
  highlights: Highlights;
};

export default function HomeHighlights({ highlights }: HighlightsProps) {
  return (
    <AnimatedSection
      id="what-we-do"
      amount={0.1}
      className="container mx-auto min-h-[calc(100dvh-96px)] space-y-4 px-4 py-24"
    >
      <div className="container mx-auto mb-8 max-w-[700px] space-y-2 px-4 text-center">
        {highlights.heading && (
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {highlights.heading}
          </h2>
        )}
        {highlights.graySubHeading && (
          <p className="mx-auto max-w-3xl text-2xl text-gray-400">
            {highlights.graySubHeading}
          </p>
        )}
        {highlights.blueSubHeading && (
          <p className="text-accent mx-auto max-w-3xl text-2xl">
            {highlights.blueSubHeading}
          </p>
        )}
      </div>
      {(highlights.items || []).map((item, i) => (
        <div
          key={item.title}
          className={cn(
            'grid items-center gap-12 md:grid-cols-12 [&_li]:ml-1 [&_li]:list-inside [&_li]:list-disc md:[&_li]:-ml-4',
            i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''
          )}
          style={{ minHeight: 'calc(100vh - 96px)' }}
        >
          {/* Left column */}
          <div className="flex flex-col space-y-6 md:col-span-5">
            <h3 className="prose prose-2xl pb-8 font-bold md:text-3xl">
              {item.title}
            </h3>

            <div className="prose pb-4">
              <PortableText value={item.problem || []} />
            </div>
            <div className="prose">
              <PortableText value={item.solution || []} />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-center justify-center px-4 md:col-span-7">
            <p className="text-center text-lg font-semibold">
              {item.shortText}
            </p>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="my-6 aspect-video w-full overflow-hidden rounded-xl object-cover"
            >
              <source src="/kf-ai-connecting-people.mp4" type="video/mp4" />
              <source src="/kf-ai-connecting-people.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <blockquote className="text-center text-base text-gray-600 italic">
              <PortableText value={item.testimonial || []} />
            </blockquote>
            <p className="text-accent font-semibold">{item.tagline}</p>
          </div>
        </div>
      ))}
    </AnimatedSection>
  );
}
