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

export const highlightsQuery = groq`
*[_type == "highlights"][0] {
  heading,
  graySubHeading,
  blueSubHeading,
  shortText,
    testimonial,
    tagline,
  items[] {
    title,
    problem,
    solution,
    
  }
}
`;

export const howWeWorkQuery = groq`
*[_type == "howWeWork"][0] {
    title,
    blueSubHeading,
    graySubHeading,
    items[]{
      title,
      problemLabel,
      problem,
      solutionLabel,
      solution
    }
  }
`;

export const homePageQuery = groq`
{
  "hero": ${heroQuery},
  "highlights": ${highlightsQuery},
  "howWeWork": ${howWeWorkQuery},
  "useCase": ${useCaseQuery},
  "contactUs": ${contactUsQuery},
  "faq": ${faqQuery}
}
`;
