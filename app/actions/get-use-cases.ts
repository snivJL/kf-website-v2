'use server';
import { sanityClient } from '@/lib/sanity/client';
import { UseCase } from '@/lib/sanity/types';

export async function getUseCases(
  productName: string
): Promise<UseCase['useCases']> {
  const query = `*[_type == "useCase"][0] {
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
  }`;

  const data = await sanityClient.fetch<UseCase>(query);
  const enrichedData = data.useCases?.map((useCase, i) => {
    return {
      ...useCase,
      productName: i === 0 ? 'KNOW' : i === 1 ? 'DO' : 'DECIDE',
    };
  });
  const filteredData = enrichedData!.filter(
    (useCase) => useCase.productName === productName
  );

  return filteredData;
}
