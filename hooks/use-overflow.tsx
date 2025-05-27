import { RefObject, useEffect, useRef, useState } from 'react';

type OverflowDirection = 'x' | 'y' | 'both' | 'none';

export function useOverflow<T extends HTMLElement>(): [
  React.RefObject<T>,
  OverflowDirection,
] {
  const ref = useRef<T>(null);
  const [overflow, setOverflow] = useState<OverflowDirection>('none');

  useEffect(() => {
    const checkOverflow = () => {
      const el = ref.current;
      if (!el) return;

      const hasOverflowX = el.scrollWidth > el.clientWidth;
      const hasOverflowY = el.scrollHeight > el.clientHeight;

      if (hasOverflowX && hasOverflowY) setOverflow('both');
      else if (hasOverflowX) setOverflow('x');
      else if (hasOverflowY) setOverflow('y');
      else setOverflow('none');
    };

    checkOverflow();

    // Optionally handle dynamic resizing
    const observer = new ResizeObserver(checkOverflow);
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref as RefObject<T>, overflow];
}
