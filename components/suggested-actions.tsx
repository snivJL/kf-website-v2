'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';

interface SuggestedActionsProps {
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Tell me more about',
      label: 'what you can provide.',
      action: 'tell me more about what you can provide',
    },
    {
      title: 'In which countries',
      label: `are you based in?`,
      action: `In which countries are you based in?`,
    },
    {
      title: 'Do you develop',
      label: `your own technology?`,
      action: `Do you develop your own technology?`,
    },
    {
      title: 'How can I',
      label: 'contact you ?',
      action: 'How can I contact you?',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid w-full gap-2 sm:grid-cols-2"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6 + 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="h-auto w-full flex-1 items-start justify-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm sm:flex-col"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions);
