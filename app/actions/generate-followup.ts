'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject, UIMessage } from 'ai';
import { z } from 'zod';

// Define a schema for the follow-up questions
const followUpQuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        text: z.string(),
        type: z.enum(['follow-up', 'needs-assessment']),
      })
    )
    .length(2),
});

export interface Question {
  text: string;
  type: 'follow-up' | 'needs-assessment';
}

export async function generateFollowUpQuestions(
  conversationHistory: UIMessage[]
): Promise<Array<Question>> {
  'use server';
  try {
    if (conversationHistory.length === 0) {
      return [];
    }

    // Get the last message from the conversation
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    // Only generate follow-up questions for assistant messages
    if (lastMessage.role !== 'assistant') {
      return [];
    }

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: followUpQuestionsSchema,
      system: `
        You are a helpful assistant that generates follow-up questions based on a conversation.
        Generate exactly two questions:
        1. One follow-up question related to the last assistant message (type: follow-up)
        2. One question to help the user express their specific needs (type: needs-assessment)
        
        Return these as structured data according to the schema.
      `,
      prompt: `
        Here is the last message from the assistant:
        "${lastMessage.content}"
        
        Generate two follow-up questions based on this message.
      `,
    });

    return object.questions;
  } catch (error) {
    console.error('Error generating follow-up questions:', error);
    return [];
  }
}
