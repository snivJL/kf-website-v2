'use client';

import { MessageCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { PopupButton } from 'react-calendly';

export default function WidgetButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      <Button
        asChild
        size="icon"
        className="bg-green-500 text-white hover:bg-green-600"
      >
        <a
          href="https://wa.me/+84903316327"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-5" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </Button>

      {typeof window !== undefined && (
        <PopupButton
          url="https://calendly.com/julien-lejay-korefocus/30min"
          rootElement={document.body}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
          text={(<Calendar className="size-5" />) as unknown as string}
          pageSettings={{
            primaryColor: '2d62ff',
          }}
        />
      )}
    </div>
  );
}
