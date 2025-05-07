"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PortableText } from "next-sanity";
import { Faq } from "@/lib/sanity/types";

type FaqProps = {
  faq: Faq;
};
export default function FaqSection({ faq }: FaqProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-accent text-white py-20">
      {/* Heading */}
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {faq.heading}
      </motion.h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1  md:grid-cols-2  gap-6">
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
                    className="bg-white rounded-lg shadow-lg"
                  >
                    <AccordionItem value={item._key}>
                      <AccordionTrigger className="flex items-center p-6 font-medium text-gray-900 text-2xl cursor-pointer min-h-[106px]">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pl-20 pb-5 pt-0 text-gray-500">
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
