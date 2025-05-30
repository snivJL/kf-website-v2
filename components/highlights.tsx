'use client';
import { Highlights } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PortableText } from 'next-sanity';

type HighlightsProps = {
  highlights: Highlights;
};

export default function HomeHighlights({ highlights }: HighlightsProps) {
  return (
    <section
      id="highlights"
      className="container mx-auto snap-y snap-mandatory space-y-4 overflow-y-auto px-4 py-12"
    >
      <motion.div
        className="container mx-auto mb-8 max-w-[700px] space-y-2 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>
      {(highlights.items || []).map((item, i) => (
        <div
          key={item.title}
          className={cn(
            'grid items-center gap-12 md:grid-cols-12',
            i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''
          )}
          style={{ minHeight: 'calc(100vh - 96px)' }}
        >
          {/* Left column */}
          <div className="flex flex-col space-y-6 md:col-span-5">
            <h3 className="pb-8 text-2xl font-bold md:text-3xl">
              {item.title}
            </h3>
            <p className="prose prose-xl bg-primary rounded-lg p-8 font-semibold text-white">
              We now have a dynamic, enriched and structured view of our
              collective company knowledge, without any manual input
            </p>
            <div className="space-y-2 pb-4">
              <ul className="space-y-2 pl-6">
                <PortableText value={item.problem || []} />
              </ul>
            </div>
            <div className="space-y-2">
              <ul className="space-y-2 pl-6">
                <PortableText value={item.solution || []} />
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-center justify-center px-4 md:col-span-7">
            <p className="text-center text-lg font-semibold">
              {item.shortText}
            </p>
            <div className="relative my-6 aspect-video w-full overflow-hidden rounded-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/kf-ai-connecting-people.mp4" type="video/mp4" />
                <source src="/kf-ai-connecting-people.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <blockquote className="text-center text-base text-gray-600 italic">
              <PortableText value={item.testimonial || []} />
            </blockquote>
            <p className="text-accent font-semibold">{item.tagline}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
