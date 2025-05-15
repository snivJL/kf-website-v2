'use client';

import { AlertTriangle, Lightbulb, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export const SECTIONS = [
  { id: 'pain-points', label: 'Pain Points', Icon: AlertTriangle },
  { id: 'solution', label: 'Solution', Icon: Lightbulb },
  { id: 'benefits', label: 'Benefits', Icon: TrendingUp },
  { id: 'our-role', label: 'Korefocus Role', Icon: Users },
] as const;

export default function UseCaseNavigator({ activeId }: { activeId: string }) {
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav aria-label="On-page navigation" className="relative hidden md:block">
      {/* line between text and icon (icons are 2.5rem wide) */}
      <div className="absolute inset-y-0 left-[calc(100%-1.25rem)] w-px bg-gray-200" />

      <ul className="space-y-10">
        {SECTIONS.map(({ id, label, Icon }) => {
          const isActive = id === activeId;
          return (
            <li key={id}>
              <Button
                onClick={handleClick(id)}
                variant="ghost"
                className="w-full cursor-pointer justify-between pr-0 hover:bg-white"
              >
                <span
                  className={cn(
                    'text-2xl font-medium transition-colors',
                    isActive ? 'text-accent' : 'hover:text-accent text-gray-700'
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </span>

                {/* icon on right, overlapping the line */}
                <div
                  className={cn(
                    'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                    isActive
                      ? 'bg-accent border-accent scale-110'
                      : 'border-gray-300 bg-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-6 w-6 transition-colors',
                      isActive ? 'text-white' : 'text-gray-400'
                    )}
                  />
                </div>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
