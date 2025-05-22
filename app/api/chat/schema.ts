import { z } from 'zod';

export const postRequestBodySchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
