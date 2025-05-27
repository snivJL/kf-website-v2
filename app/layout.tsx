import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SanityLive } from '@/lib/sanity/live';
import Navbar from '@/components/navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Korefocus – AI + Data + Workflows',
  description: 'We design and implement your AI workflows to make data simple.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} snap-y snap-proximity antialiased`}
      >
        <Navbar />
        <div className="pt-16">{children}</div>
        <SanityLive />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
