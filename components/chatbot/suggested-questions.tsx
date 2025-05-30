'use client';

import type { Question } from '@/app/actions/generate-followup';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MailIcon, MessageCircle, UserSearch } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface SuggestedQuestionsProps {
  questions: Question[];
  isLoading?: boolean;
  onSelectQuestion: (question: string) => void;
}

export default function SuggestedQuestions({
  questions,
  isLoading,
  onSelectQuestion,
}: SuggestedQuestionsProps) {
  if (isLoading) {
    return (
      <div className="mt-4 w-full max-w-2xl flex-col px-4 sm:flex sm:gap-2">
        {[...Array(questions.length)].map((_, i) => (
          <Skeleton
            key={`loading-skeleton-${i}`}
            className="h-[48px] w-full rounded-xl"
          />
        ))}
      </div>
    );
  }
  if (!questions.length) return null;

  return (
    <div className="mx-0 mt-4 w-full max-w-2xl flex-col sm:flex sm:gap-2">
      {questions.map(
        (question, index) =>
          question.text && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.05 * index }}
              key={`suggested-action-${question.type}-${index}`}
              className="w-full"
            >
              <Button
                variant="secondary"
                size="sm"
                className="flex h-[48px] w-full cursor-pointer items-center justify-start gap-2 border text-sm transition-shadow duration-200 hover:shadow-md"
                onClick={() => onSelectQuestion(question.text || '')}
              >
                {question.type === 'follow-up' ? (
                  <MessageCircle className="text-muted-foreground h-4 w-4 shrink-0" />
                ) : question.type === 'contact' ? (
                  <MailIcon className="text-muted-foreground h-4 w-4 shrink-0" />
                ) : (
                  <UserSearch className="text-muted-foreground h-4 w-4 shrink-0" />
                )}
                <span className="line-clamp-2">{question.text}</span>
              </Button>
            </motion.div>
          )
      )}
    </div>
  );
}
