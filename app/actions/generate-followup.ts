'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject, Message } from 'ai';
import { z } from 'zod';
import { ceoInfo, companyInfo } from '../api/chat/prompts';

// Define a schema for the follow-up questions
const followUpQuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        text: z
          .string()
          .optional()
          .describe('The prompt that will be addressed to you next'),
        type: z.enum(['follow-up', 'redirect']),
      })
    )
    .length(2),
});

export interface Question {
  text?: string;
  type: 'follow-up' | 'redirect' | 'contact';
}

export async function generateFollowUpQuestions(
  lastMessages: Array<Message>
): Promise<Array<Question>> {
  'use server';
  try {
    if (!lastMessages || lastMessages.length === 0) {
      return [];
    }

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: followUpQuestionsSchema,
      system: `
        You are a helpful assistant. After replying to the user, you generate two suggested follow-up prompts that the user might want to ask next.
        Each suggestion should be concise (max 12 words), phrased naturally, and easy for a user to click.
        Generate exactly two suggestions, only if relevant:
        1. One prompt you would like to address to yourself to dive deeper into what you just said (type: follow-up)
        2. One prompt that would redirect the conversation to a different Korefocus topic (type: redirect)
        
        Here is information about Korefocus:
        ${companyInfo}
        Here is information about the Korefocus CEO:
        ${ceoInfo}
        Return these as structured data according to the schema.
      `,
      prompt: `
        Here are the last few messages from the conversation:
        "${lastMessages.map((m) => `${m.role}: ${m.content}`).join('\n')}"
        
        If you feel like the conversation need any follow-up questions, return follow up questions according to the schema.
      `,
    });

    return [
      ...object.questions,
      { text: 'How can I reach out?', type: 'contact' },
    ];
  } catch (error) {
    console.error('Error generating follow-up questions:', error);
    return [];
  }
}
