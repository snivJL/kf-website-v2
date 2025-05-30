import ContactUs from '@/components/contact-us-section';
import FaqSection from '@/components/faqs-section';
import HeroSection from '@/components/hero';
import OurApproach from '@/components/our-approach';
import { UseCases } from '@/components/use-cases';
import { sanityClient } from '@/lib/sanity/client';
import {
  Hero,
  Highlights as HighlightsType,
  Faq,
  Home,
  UseCase as UseCaseType,
  ContactUsPage,
  HowWeWork,
} from '@/lib/sanity/types';
import type { Metadata } from 'next';
import { homePageQuery } from '@/lib/sanity/queries';
import HomeHighlights from '@/components/highlights';

// **1 min cache / ISR**
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Korefocus – AI + Data + Workflows',
  description:
    'Korefocus partners with you to streamline data and AI workflows. We blend business insight with technical expertise, delivering proven tools, custom API layers, and tailored AI agents. Discover our approach, use cases, and contact us today.',
};

export default async function HomePage() {
  const { hero, highlights, faq, useCase, contactUs, howWeWork } =
    await sanityClient.fetch<{
      hero: Hero;
      home: Home;
      highlights: HighlightsType;
      faq: Faq;
      useCase: UseCaseType;
      contactUs: ContactUsPage;
      howWeWork: HowWeWork;
    }>(homePageQuery);
  console.log(howWeWork);
  return (
    <>
      <HeroSection hero={hero} />
      <HomeHighlights highlights={highlights} />
      <OurApproach howWeWork={howWeWork} />
      <UseCases useCaseSection={useCase} />
      <FaqSection faq={faq} />
      <ContactUs contactUsSection={contactUs} />
    </>
  );
}
