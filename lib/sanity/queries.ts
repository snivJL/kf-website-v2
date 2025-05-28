import { groq } from 'next-sanity';

export const heroQuery = `
*[_type == "hero"][0] {
  heading,
  headingBlue,
  image {
    asset,
    alt
  },
  ctas[] {
    text,
    linkText,
    linkTarget,
  }
}
`;

export const whatWeDoQuery = `
*[_type == "whatWeDo"][0] {
  heading,
  blueSubHeading,
  graySubHeading,
  cards[] {
    title,
    subtitle,
    buttonText,
    buttonLink,
    blueLines,
    grayLines
  }
}
`;

export const ourApproachQuery = `
*[_type == "ourApproach"][0] {
  heading,
  graySubHeading,
  blueSubHeading,
  steps[] {
    _key,
    title,
    index,
    description[]  
  }
}
`;

export const faqQuery = `
*[_type == "faq"][0] {
  heading,
  faqItem[] {
    _key,
    question,
    answer[]        
  }
}
`;

export const useCaseQuery = `
*[_type == "useCase"][0] {
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
`;

export const contactUsQuery = `
*[_type == "contactUsPage"][0] {
  title,
  description,
  phoneLabel,
  phoneNumber,
  emailLabel,
  emailAddress,
  submitButtonText,
  sendingButtonText,
  successToast,
  errorToast
}
`;

export const homePageQuery = groq`
{
  "hero": ${heroQuery},
  "whatWeDo": ${whatWeDoQuery},
  "ourApproach": ${ourApproachQuery},
  "faq": ${faqQuery},
  "useCase": ${useCaseQuery},
  "contactUs": ${contactUsQuery}
}
`;
