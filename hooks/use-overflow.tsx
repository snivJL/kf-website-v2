import { RefObject, useEffect, useRef, useState } from 'react';

type OverflowDirection = 'x' | 'y' | 'both' | 'none';

export function useOverflow<T extends HTMLElement>(): [
  RefObject<T>,
  OverflowDirection,
  boolean,
] {
  const ref = useRef<T>(null);
  const [overflow, setOverflow] = useState<OverflowDirection>('none');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!el) return;

      const hasOverflowX = el.scrollWidth > el.clientWidth;
      const hasOverflowY = el.scrollHeight > el.clientHeight;

      if (hasOverflowX && hasOverflowY) setOverflow('both');
      else if (hasOverflowX) setOverflow('x');
      else if (hasOverflowY) setOverflow('y');
      else setOverflow('none');
    };

    const checkScrollBottom = () => {
      if (!el) return;
      const reachedBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setIsScrolledToBottom(reachedBottom);
    };

    checkOverflow();
    checkScrollBottom();

    el.addEventListener('scroll', checkScrollBottom);

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
      checkScrollBottom();
    });

    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScrollBottom);
      resizeObserver.disconnect();
    };
  }, []);

  return [ref as RefObject<T>, overflow, isScrolledToBottom];
}
