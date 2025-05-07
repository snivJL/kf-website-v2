import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  useCdn: false,
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityConfig);
export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}
