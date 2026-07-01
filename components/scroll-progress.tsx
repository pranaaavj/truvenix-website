'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className='fixed top-0 left-0 right-0 h-1 z-100'>
      <motion.div
        className='h-full bg-gradient-to-r from-primary-blue to-navy origin-left'
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className='absolute -top-1.75 -translate-x-1/2'
        style={{ left }}>
        <Truck className='w-4 h-4 text-navy drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]' />
      </motion.div>
    </div>
  );
}
