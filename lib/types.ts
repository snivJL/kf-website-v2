import { z } from 'zod';

export const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;

export type DataPart = { type: 'append-message'; message: string };
