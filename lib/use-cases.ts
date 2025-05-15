export type UseCase = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export const useCases: UseCase[] = [
  {
    slug: 'use-cases/first',
    title: 'Et enim nisl viverra molestie risus.',
    description:
      'Amet dui blandit ultrices pellentesque tristique adipiscing bibendum tincidunt.',
    content: `
        <p>Here’s the full write-up for the first feature. You can include HTML or MD parsed content here.</p>
        <p>…</p>
      `,
  },
  {
    slug: 'use-cases/second',
    title: 'Et enim nisl viverra molestie risus.',
    description:
      'Amet dui blandit ultrices pellentesque tristique adipiscing bibendum tincidunt.',
    content: `
        <p>Deep-dive on the second feature goes here.</p>
        <ul><li>Point A</li><li>Point B</li></ul>
      `,
  },
  {
    slug: 'use-cases/third',
    title: 'Et enim nisl viverra molestie risus.',
    description:
      'Amet dui blandit ultrices pellentesque tristique adipiscing bibendum tincidunt.',
    content: `
        <p>Third feature explanation and details.</p>
      `,
  },
];

// // helpers
// export async function getAllUseCasesSlugs(): Promise<string[]> {
//   return useCases.map((f) => f.slug);
// }

// export async function getUseCaseBySlug(
//   slug: string
// ): Promise<UseCase | undefined> {
//   return useCases.find((f) => f.slug === slug);
// }
