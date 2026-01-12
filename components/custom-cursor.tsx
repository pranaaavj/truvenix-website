'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 650 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleHover = (e: Event) => {
      setIsHovering(e.type === 'mouseenter');
    };

    window.addEventListener('mousemove', moveCursor);

    const clickables = document.querySelectorAll('a, button, [data-clickable]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleHover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHover);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className='pointer-events-none fixed z-[9999] hidden md:block'
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
