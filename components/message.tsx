'use client';

import type { UIMessage } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';
import { Markdown } from './markdown';
import equal from 'fast-deep-equal';
import { cn, sanitizeText } from '@/lib/utils';
import { MessageReasoning } from './message-reasoning';
import type { UseChatHelpers } from '@ai-sdk/react';
import { SparklesIcon } from 'lucide-react';
import { ContactForm, type ContactFormData } from './contact-form';
import AnalyticsShowcase from './analytics-showcase';
import Image from 'next/image';

const PurePreviewMessage = ({
  message,
  isLoading,
  requiresScrollPadding,
  onSendEmail,
}: {
  chatId: string;
  message: UIMessage;
  isLoading: boolean;
  setMessages: UseChatHelpers['setMessages'];
  requiresScrollPadding: boolean;
  onSendEmail: (data: ContactFormData) => Promise<void>;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className="group/message mx-auto w-full max-w-3xl px-4"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div
          className={cn(
            'flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl'
          )}
        >
          {message.role === 'assistant' && (
            <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
              <div className="translate-y-px">
                <Image
                  src="/logo-small.svg"
                  alt="Korefocus logo"
                  width={56}
                  height={56}
                  priority
                />
              </div>
            </div>
          )}

          <div
            className={cn('flex w-full flex-col gap-4', {
              'min-h-96': message.role === 'assistant' && requiresScrollPadding,
            })}
          >
            {message.parts?.map((part, index) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;

              if (type === 'reasoning') {
                return (
                  <MessageReasoning
                    key={key}
                    isLoading={isLoading}
                    reasoning={part.reasoning}
                  />
                );
              }
              if (type === 'tool-invocation') {
                switch (part.toolInvocation.toolName) {
                  case 'contactTool':
                    return <ContactForm onSendEmail={onSendEmail} key={key} />;
                  case 'analyticsTool':
                    return <AnalyticsShowcase key={key} />;
                  default:
                    return null;
                }
              }
              if (type === 'text') {
                return (
                  <div key={key} className="flex flex-row items-start gap-2">
                    <div
                      data-testid="message-content"
                      className={cn('flex flex-col gap-4', {
                        'bg-primary text-primary-foreground rounded-xl px-3 py-2':
                          message.role === 'user',
                      })}
                    >
                      <Markdown>{sanitizeText(part.text)}</Markdown>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding)
      return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;
    if (!equal(prevProps.onSendEmail, nextProps.onSendEmail)) return false;

    return true;
  }
);

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <motion.div
      data-testid="message-assistant-loading"
      className="group/message mx-auto min-h-96 w-full max-w-3xl px-4"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cn(
          'flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2',
          {
            'group-data-[role=user]/message:bg-muted': true,
          }
        )}
      >
        <div className="ring-border flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
          <SparklesIcon size={14} />
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="text-muted-foreground flex flex-col gap-4">
            Hmm...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
