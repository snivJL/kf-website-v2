import { defineLive } from 'next-sanity';
import { sanityClient } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({ apiVersion: 'vX' }),
});
