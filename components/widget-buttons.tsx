'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export default function WidgetButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      <Button
        asChild
        size="icon"
        className="bg-green-500 text-white hover:bg-green-600"
      >
        <a
          href="https://wa.me/+971543329319"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-5" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </Button>
    </div>
  );
}
