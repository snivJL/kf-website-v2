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
import { ceoInfo, companyInfo } from './prompts';

export const maxDuration = 30;

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
