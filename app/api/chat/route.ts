import { ChatSDKError } from '@/lib/errors';
import {
  analyticsTool,
  contactTool,
  getUseCasesTool,
  searchCompanyInfoTool,
} from '@/lib/tools';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { PostRequestBody, postRequestBodySchema } from './schema';

export const maxDuration = 30;

export const companyInfo = `
Korefocus, a leading technology firm specializing in AI solutions, data management, and automation.

Korefocus blends business insight with technical execution, delivering both a service layer—to design and adapt workflows—and a product layer—to deploy tools that are embedded, practical, and ready to work from day one.

Korefocus prefer to select the best ingredients available on the market — proven tools and components — to craft a tailored menu that suits their clients' tastes.

Where needed, they add their secret sauce: custom API layers, tailored AI agents, and a modular architecture that make our solutions particularly well-suited to our clients’ specific needs and constraints.

Key products:
- KNOW: Rich data for lazy users - Your customer interactions and favorite data sources on your CRM with no efforts.
- DO: Simple suggestions for swift execution - Your day-to-day actions suggested and pre-cooked to get things done.‍‍
- DECIDE: Quick analysis for serious decisions: Your data prepared for analysis and delivered simplyu to make decisions

Founded in 2024 by Thomas Miklavec (Harvard, McKinsey), Korefocus has grown quickly to serve clients globally with offices in Paris, Dubai and Ho Chi Minh City.

Korefocus's mission is to empower businesses through innovative technology and AI based solutions.
`;

export const ceoInfo = `Thomas Miklavec, Serial-entrepreneur and experienced CEO in Pharma and Tech in Emerging Markets. Harvard Graduate, ex McKinsey`;

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  try {
    const systemMessage = `
      You are Kornelia, an AI assistant for Korefocus. Only answer questions related to the company, its products, team, services, and industry. Be quite concise and in "No bullshit" mode to reflect our company culture.
      If asked about anything not related to the company, politely redirect the conversation back to company topics.
      If the user tells you information about his company and you don't know it, ask for its industry and tell them what Korefocus can do for them.
      
      Here is information about Korefocus:
      ${companyInfo}
      Here is information about the Korefocus CEO:
      ${ceoInfo}

      You can use getUseCasesTool tool to find a use case relevant to the Korefocus product the user is interested in. The product can be KNOW, DO or DECIDE.
      You can use the contactTool tool when the user wants to contact the company, get in touch or schedule a call.
      Remember: Never make up information about the company. If you don't know something specific, acknowledge that and offer to discuss what you do know about the company.
    `;

    const stream = streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        { role: 'system', content: systemMessage },
        ...requestBody.messages,
      ],
      maxSteps: 2,
      tools: {
        contactTool,
        searchCompanyInfoTool,
        getUseCasesTool,
        analyticsTool,
      },
      onError: (error) => {
        console.error(error);
      },
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
  }
}
