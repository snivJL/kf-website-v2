import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SanityLive } from '@/lib/sanity/live';
import Navbar from '@/components/navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import WidgetButtons from '@/components/widget-buttons';
import { Toaster } from 'sonner';
import Script from 'next/script';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: 'Korefocus – AI + Data + Orchestration',
  description:
    'We make the AI journey simple for SMEs and mid-caps by delivering both the services and tools they need to unlock the power of data and AI—without the cost or complexity of building a full-fledged in-house team.',
  keywords: ['AI workflows', 'data automation', 'Korefocus'],
  authors: [{ name: 'Korefocus', url: process.env.NEXT_PUBLIC_BASE_URL }],
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
    title: 'Korefocus – AI + Data + Orchestration',
    description:
      'We make the AI journey simple for SMEs and mid-caps by delivering both the services and tools they need to unlock the power of data and AI—without the cost or complexity of building a full-fledged in-house team.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Korefocus',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Korefocus – AI + Data + Orchestration',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korefocus – AI + Data + Orchestration',
    description:
      'We make the AI journey simple for SMEs and mid-caps by delivering both the services and tools they need to unlock the power of data and AI—without the cost or complexity of building a full-fledged in-house team.',
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
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Korefocus',
              url: process.env.NEXT_PUBLIC_BASE_URL,
              logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`,
            }),
          }}
        />
        <Script
          src="https://apply.workable.com/assets/embed.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
