'use client';

import type { UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { MultimodalInput } from './multimodal-input';
import { useAutoResume } from '@/hooks/use-auto-resume';
import { ChatSDKError } from '@/lib/errors';
import { fetchWithErrorHandlers, generateUUID } from '@/lib/utils';
import { Messages } from '@/components/messages';
import { toast } from 'sonner';
import {
  generateFollowUpQuestions,
  type Question,
} from '@/app/actions/generate-followup';

export function Chat({
  initialMessages,
  isReadonly,
  autoResume,
}: {
  initialMessages: Array<UIMessage>;
  isReadonly: boolean;
  autoResume: boolean;
}) {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
    experimental_resume,
    data,
  } = useChat({
    api: '/api/chat',
    sendExtraMessageFields: true,
    generateId: generateUUID,
    fetch: fetchWithErrorHandlers,
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast.error(error.message);
      }
    },
    async onFinish(lastMessage) {
      {
        try {
          setIsLoadingQuestions(true);
          const recentMessages = messages.slice(-5);
          const questions = await generateFollowUpQuestions([
            ...recentMessages,
            lastMessage,
          ]);
          setFollowUpQuestions(questions);
        } catch (err) {
          console.error('Failed to generate follow-up questions:', err);
        } finally {
          setIsLoadingQuestions(false);
        }
      }
    },
  });
  const [followUpQuestions, setFollowUpQuestions] = useState<Array<Question>>(
    []
  );
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useAutoResume({
    autoResume,
    initialMessages,
    experimental_resume,
    data,
    setMessages,
  });

  return (
    <>
      <div className="bg-background flex h-screen min-w-0 flex-col pt-32">
        <Messages
          chatId={'1'}
          status={status}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          followUpQuestions={status === 'ready' ? followUpQuestions : []}
          isLoadingQuestions={isLoadingQuestions}
          onSelectQuestion={(question) => {
            setFollowUpQuestions([]);
            append({ content: question, role: 'user' });
          }}
        />
        <form className="bg-background mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
          <MultimodalInput
            chatId={'1'}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            status={status}
            stop={stop}
            messages={messages}
            setMessages={setMessages}
            append={append}
            followUpQuestions={followUpQuestions}
            isLoadingQuestions={isLoadingQuestions}
            onSelectQuestion={(question) => {
              append({ content: question, role: 'user' });
              setFollowUpQuestions([]);
            }}
          />
        </form>
      </div>
    </>
  );
}
