import type { UIMessage } from 'ai';
import { PreviewMessage, ThinkingMessage } from './message';
import { Greeting } from './greeting';
import { memo } from 'react';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { useMessages } from '@/hooks/use-messages';
import { sendEmail } from '@/app/actions/send-email';
import { Button } from './ui/button';
import type { Question } from '@/app/actions/generate-followup';

interface MessagesProps {
  chatId: string;
  status: UseChatHelpers['status'];
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers['setMessages'];
  reload: UseChatHelpers['reload'];
  isReadonly: boolean;
  isArtifactVisible?: boolean;
  followUpQuestions: Array<Question>;
  isLoadingQuestions: boolean;
  onSelectQuestion: (question: string) => void;
}

function PureMessages({
  chatId,
  status,
  messages,
  followUpQuestions,
  isLoadingQuestions,
  onSelectQuestion,
  setMessages,
}: MessagesProps) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  } = useMessages({
    chatId,
    status,
  });

  return (
    <div
      ref={messagesContainerRef}
      className="relative flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pt-4"
    >
      {messages.length === 0 && <Greeting />}

      {messages.map((message, index) => {
        return (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            isLoading={status === 'streaming' && messages.length - 1 === index}
            setMessages={setMessages}
            onSendEmail={(data) => sendEmail({ data, messages })}
            requiresScrollPadding={
              hasSentMessage && index === messages.length - 1
            }
            followUpQuestions={followUpQuestions}
            isLoadingQuestions={isLoadingQuestions}
            onSelectQuestion={onSelectQuestion}
            isLast={index === messages.length - 1}
          />
        );
      })}

      {status === 'submitted' &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && <ThinkingMessage />}
      {messages.length > 0 && (
        <Button
          onClick={() => setMessages([])}
          className="fixed right-6 bottom-13 rounded-full px-4 py-2 text-sm shadow-md"
        >
          New Chat
        </Button>
      )}
      <motion.div
        ref={messagesEndRef}
        className="min-h-[24px] min-w-[24px] shrink-0"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;
  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
