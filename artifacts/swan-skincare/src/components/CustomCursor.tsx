import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Snap {
  x: number;
  y: number;
  w: number;
  h: number;
  radius: number;
}

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springed position for the magnetic ring
  const ringX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.5 });

  const [snap, setSnap] = useState<Snap | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const findMagnetic = (el: HTMLElement | null): HTMLElement | null => {
      if (!el) return null;
      return (el.closest('button, a, [data-magnetic]') as HTMLElement | null) ?? null;
    };

    const onMove = (e: MouseEvent) => {
      const target = findMagnetic(e.target as HTMLElement);
      targetRef.current = target;

      if (target) {
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Magnetic pull: ring settles at element centre, nudged slightly
        // toward the pointer for a sticky, living feel.
        mouseX.set(cx + (e.clientX - cx) * 0.15);
        mouseY.set(cy + (e.clientY - cy) * 0.15);
        const style = window.getComputedStyle(target);
        const br = parseFloat(style.borderRadius) || 999;
        setSnap({ x: cx, y: cy, w: r.width + 16, h: r.height + 16, radius: br });
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setSnap(null);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block border border-primary mix-blend-difference"
      style={{ x: ringX, y: ringY }}
      animate={{
        width: snap ? snap.w : 32,
        height: snap ? snap.h : 32,
        marginLeft: snap ? -snap.w / 2 : -16,
        marginTop: snap ? -snap.h / 2 : -16,
        borderRadius: snap ? Math.min(snap.radius + 8, 40) : 999,
        backgroundColor: snap ? 'hsl(var(--primary) / 0.12)' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.4 }}
    />
  );
}
