import { getUseCases } from '@/app/actions/get-use-cases';
import { tool } from 'ai';
import { z } from 'zod';

export const contactTool = tool({
  description:
    'Use this tool when the user wants to contact the company, get in touch or schedule a call',
  parameters: z.object({}),
});

export const searchCompanyInfoTool = tool({
  description:
    'Use this if the user tells you his company name and find out what Korefocus can do for this company',
  parameters: z.object({
    company: z.string().describe('The company name of the user'),
  }),
  execute: async ({ company }) => {
    // Simulate a search for company information
    // In a real-world scenario, this would involve querying a database or an API
    // For example:
    // const result = await searchCompanyInfo(query);
    // return result;
    return `Information about ${company}: [Simulated company information]`;
  },
});

export const getUseCasesTool = tool({
  description:
    'Use this tool to fetch a use case relevant to the Korefocus product the user is interested in. The product can be KNOW, DO or DECIDE',
  parameters: z.object({
    product: z.enum(['KNOW', 'DO', 'DECIDE']).describe('The product name'),
  }),
  execute: async ({ product }) => {
    const response = await getUseCases(product);
    return response;
  },
});
