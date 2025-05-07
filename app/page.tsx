import { sanityClient, urlFor } from "@/lib/sanity/client";
import { Hero, OurApproach, WhatWeDo, Home } from "@/lib/sanity/types";
import { groq } from "next-sanity";
import Image from "next/image";

const query = groq`
{
    "hero": *[_type == "hero"][0]{
    heading,
    image {
      asset,     
      alt
    }
  },
    "home":        *[_type=="home"][0],
  "whatWeDo": *[_type=="whatWeDo"][0]{
    heading,
    cards[]{
      title,
      subtitle,
      buttonText,
      buttonLink,
      blueLines,
      grayLines
    } 
   }, 
   "ourApproach": *[_type=="ourApproach"][0]{
    heading,
    graySubHeading,
    blueSubHeading,
    steps[]{
      _key,
      title,
      index,
      description[]  // this brings in your block content
    }
  }
}
`;
export default async function HomePage() {
  const { hero, whatWeDo, ourApproach } = await sanityClient.fetch<{
    hero: Hero;
    home: Home;
    whatWeDo: WhatWeDo;
    ourApproach: OurApproach;
  }>(query);
  const imgSrc = !hero.image?.asset?._ref
    ? ""
    : urlFor(hero.image).width(400).auto("format").url();
  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <section className="flex flex-col gap-4">
        <Image
          src={imgSrc!}
          alt={hero.image?.alt || "Hero Image"}
          width={400}
          height={400}
          priority
        />
        <h1 className="text-4xl font-bold">{hero.heading}</h1>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{ourApproach.heading}</h2>
        {ourApproach.steps?.map((step) => (
          <div key={step._key} className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p>{step.description?.[0]?.children?.[0]?.text}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{whatWeDo?.heading}</h2>
        {whatWeDo.cards?.map((card) => (
          <div key={card._key} className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p>{card.subtitle}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
