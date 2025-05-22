'use client';

import type { Message } from 'ai';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Pick<Message, 'content' | 'role'>;
  isLoading?: boolean;
}

export default function ChatMessage({
  message,
  isLoading = false,
}: ChatMessageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message.content]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex items-start gap-4 text-sm',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.role !== 'user' && (
        <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow select-none">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3 text-sm',
          message.role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {isLoading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          <div
            className={cn(
              'prose prose-sm dark:prose-invert max-w-none',
              message.role === 'user' ? 'text-white' : 'text-foreground'
            )}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
      {message.role === 'user' && (
        <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-white shadow select-none">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
