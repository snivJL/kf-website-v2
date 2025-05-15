'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { PortableText } from 'next-sanity';
import { Faq } from '@/lib/sanity/types';

type FaqProps = {
  faq: Faq;
};
export default function FaqSection({ faq }: FaqProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-accent scroll-mt-24 py-20 text-white" id="faq">
      {/* Heading */}
      <motion.h2
        className="mb-12 text-center text-4xl font-bold"
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {faq.heading}
      </motion.h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faq.faqItem
            ? faq.faqItem.map((item, i) => (
                <motion.div
                  key={item._key}
                  initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                  whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="rounded-lg bg-white shadow-lg"
                  >
                    <AccordionItem value={item._key}>
                      <AccordionTrigger className="flex min-h-[106px] cursor-pointer items-center p-6 text-2xl font-medium text-gray-900">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="prose prose-p px-4 pt-0 pb-5 pl-7 text-gray-500">
                        <PortableText value={item.answer ?? []} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
