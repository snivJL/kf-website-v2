import { Chat } from '@/components/chat';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with Korefocus – ask questions about our AI and data services',
  description:
    'Chat with Korefocus – ask questions about our AI and data services.',
  alternates: { canonical: '/chat' },
  openGraph: {
    title: 'Chat with Korefocus – ask questions about our AI and data services',
    description:
      'Chat with Korefocus – ask questions about our AI and data services.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/chat`,
    siteName: 'Korefocus',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Chat with Korefocus – ask questions about our AI and data services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with Korefocus – ask questions about our AI and data services',
    description:
      'Chat with Korefocus – ask questions about our AI and data services.',
    images: ['/opengraph-image.png'],
  },
};

export default function ChatPage() {
  return <Chat initialMessages={[]} isReadonly={false} autoResume={false} />;
}
