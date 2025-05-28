import Link from 'next/link';
import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[100dvh_-_96px] w-full max-w-2xl flex-col items-center justify-center px-4 pt-32 text-center">
      <AlertTriangle
        className="text-destructive mb-6 h-12 w-12"
        aria-hidden="true"
      />
      <h1 className="text-accent text-7xl font-extrabold">404</h1>
      <p className="mt-2 text-2xl font-semibold">Page Not Found</p>
      <p className="text-muted-foreground mt-2 max-w-md text-lg">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
