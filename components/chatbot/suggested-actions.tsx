'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import { Button } from '../ui/button';

interface SuggestedActionsProps {
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Can you tell me',
      label: 'what you offer?',
      action: 'Can you tell me what you offer?',
    },
    {
      title: 'Which countries',
      label: 'do you operate in?',
      action: 'Which countries do you operate in?',
    },
    {
      title: 'Do you build',
      label: 'your own tech stack?',
      action: 'Do you build your own tech stack?',
    },
    {
      title: 'What’s the best way',
      label: 'to contact you?',
      action: 'What’s the best way to contact you?',
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
