import { useEffect, useState } from 'react';

// A "desktop" experience requires both a wide viewport AND a fine pointer (a
// mouse). This deliberately excludes touch devices — including phones/tablets in
// landscape whose width can exceed 768px — because the smooth-scroll + per-frame
// travelling bottle stack is janky on touch and must stay desktop-only.
export const DESKTOP_MQ = '(min-width: 768px) and (pointer: fine)';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MQ).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}
