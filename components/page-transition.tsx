'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode='wait'
      initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
