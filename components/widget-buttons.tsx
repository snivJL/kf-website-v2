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
          href="https://wa.me/+971543329319"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-5" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </Button>

      {typeof document !== 'undefined' && (
        <PopupButton
          url="https://calendly.com/thomas-korefocus/30min"
          rootElement={document.body}
          className="hover:bg-accent bg-accent/80 flex h-10 w-10 cursor-pointer! items-center justify-center rounded-full text-white"
          text={(<Calendar className="size-5" />) as unknown as string}
          pageSettings={{
            primaryColor: '2d62ff',
          }}
        />
      )}
    </div>
  );
}
