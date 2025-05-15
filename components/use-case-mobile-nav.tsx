'use client';
import { cn } from '@/lib/utils';
import { SECTIONS } from './use-case-navigator';
import { Button } from './ui/button';

export function UseCaseMobileNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect(id: string): void;
}) {
  return (
    <nav
      aria-label="Jump to section"
      className="overflow-x-auto py-4 md:hidden"
    >
      <ul className="flex space-x-2 px-4">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <Button
              onClick={() => onSelect(id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition',
                activeId === id
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
