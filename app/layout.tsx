import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SanityLive } from '@/lib/sanity/live';
import Navbar from '@/components/navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import WidgetButtons from '@/components/widget-buttons';
import { Toaster } from 'sonner';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.korefocus.com'),
  title: 'Korefocus – AI + Data + Workflows',
  description: 'We design and implement your AI workflows to make data simple.',
  keywords: ['AI workflows', 'data automation', 'Korefocus'],
  authors: [{ name: 'Korefocus', url: 'https://www.korefocus.com' }],
  creator: 'Korefocus',
  publisher: 'Korefocus',
  generator: 'Next.js 15',
  applicationName: 'Korefocus',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Korefocus – AI + Data + Workflows',
    description:
      'We design and implement your AI workflows to make data simple.',
    url: 'https://www.korefocus.com',
    siteName: 'Korefocus',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Korefocus – AI + Data + Workflows',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korefocus – AI + Data + Workflows',
    description:
      'We design and implement your AI workflows to make data simple.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <SanityLive />
        <Analytics />
        <SpeedInsights />
        <WidgetButtons />
        <Toaster />
      </body>
    </html>
  );
}
