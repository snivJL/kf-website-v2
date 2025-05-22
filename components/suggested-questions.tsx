'use client';

import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, UserSearch } from 'lucide-react';

interface Question {
  text: string;
  type: 'follow-up' | 'needs-assessment';
}

interface SuggestedQuestionsProps {
  questions: Question[];
  isLoading: boolean;
  onSelectQuestion: (question: string) => void;
}

export default function SuggestedQuestions({
  questions,
  isLoading,
  onSelectQuestion,
}: SuggestedQuestionsProps) {
  if (isLoading) {
    return (
      <div className="bg-muted/50 border-border mt-4 rounded-lg border p-3">
        <div className="mb-2 flex items-center gap-2">
          <HelpCircle className="text-primary h-4 w-4" />
          <p className="text-sm font-medium">Loading suggested questions...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) return null;

  return (
    <div className="bg-muted/50 border-border mt-4 rounded-lg border p-3">
      <div className="mb-2 flex items-center gap-2">
        <HelpCircle className="text-primary h-4 w-4" />
        <p className="text-sm font-medium">Suggested questions</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="secondary"
            size="sm"
            className="flex items-center gap-1.5 text-xs"
            onClick={() => onSelectQuestion(question.text)}
          >
            {question.type === 'follow-up' ? (
              <MessageCircle className="h-3 w-3" />
            ) : (
              <UserSearch className="h-3 w-3" />
            )}
            {question.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
