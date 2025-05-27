import FaqSection from '@/components/faqs-section';
import HeroSection from '@/components/hero';
import OurApproach from '@/components/our-approach';
import { UseCases } from '@/components/use-cases';
import WhatWeDo from '@/components/what-we-do';
import { sanityClient } from '@/lib/sanity/client';
import {
  Hero,
  OurApproach as OurApproachType,
  WhatWeDo as WhatWeDoType,
  Faq,
  Home,
  UseCase as UseCaseType,
} from '@/lib/sanity/types';
import { groq } from 'next-sanity';

const query = groq`
{
  "hero": *[_type == "hero"][0] {
    heading,
    headingBlue,
    image {
      asset,
      alt
    },ctas[]
    {
    text,
    linkText,
    linkTarget,
    }
  },
  "home": *[_type == "home"][0],
  "whatWeDo": *[_type == "whatWeDo"][0] {
    heading,
    graySubHeading,
    blueSubHeading,
    cards[] {
      title,
      subtitle,
      buttonText,
      buttonLink,
      blueLines,
      grayLines
    }
  },
  "ourApproach": *[_type == "ourApproach"][0] {
    heading,
    graySubHeading,
    blueSubHeading,
    steps[] {
      _key,
      title,
      index,
      description[]  
    }
  },
  "faq": *[_type == "faq"][0] {
    heading,
    faqItem[] {
      _key,
      question,
      answer[]        
    }
  },
  "useCase": *[_type == "useCase"][0] {
    heading,
    subHeading,
    description,  
    blueSection,   
    useCases[] {
      _key,
      title,
      hook,
      buttonText,
      buttonLink,
      objective[]{..., markDefs[]{...}},
      painPoints[]{..., markDefs[]{...}},
      solution[]{..., markDefs[]{...}},
      benefits[]{..., markDefs[]{...}},
      korefocusRole[]{..., markDefs[]{...}}
    }
  }
}
`;

// **1 min cache / ISR**
export const revalidate = 60;

export default async function HomePage() {
  const { hero, whatWeDo, ourApproach, faq, useCase } =
    await sanityClient.fetch<{
      hero: Hero;
      home: Home;
      whatWeDo: WhatWeDoType;
      ourApproach: OurApproachType;
      faq: Faq;
      useCase: UseCaseType;
    }>(query);

  return (
    <>
      <HeroSection hero={hero} />
      <WhatWeDo whatWeDo={whatWeDo} />
      <OurApproach approach={ourApproach} />
      <UseCases useCaseSection={useCase} />
      <FaqSection faq={faq} />
    </>
  );
}
