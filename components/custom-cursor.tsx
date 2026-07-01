'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CLICKABLE_SELECTOR = 'a, button, [data-clickable]';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 650 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setEnabled(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = '';
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    // Delegated hover tracking so elements added after mount (modals,
    // expanded overlays, chat widget) still trigger the hover state.
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest(CLICKABLE_SELECTOR)) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest(CLICKABLE_SELECTOR)) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className='pointer-events-none fixed z-9999 hidden md:block'
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}>
      <motion.div
        className='rounded-full bg-slate-900'
        animate={{
          width: isHovering ? 32 : 8,
          height: isHovering ? 32 : 8,
          opacity: isHovering ? 0.2 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
