'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const scrollThreshold = 150;

  const springConfig = {
    type: 'spring' as const,
    stiffness: 80,
    damping: 25,
  };

  const width = useTransform(scrollY, [0, scrollThreshold], ['100%', '90%']);

  const maxWidth = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['1300px', '1000px']
  );

  const height = useTransform(scrollY, [0, scrollThreshold], ['80px', '64px']);

  const borderRadius = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['0px', '999px']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['16px', '24px']
  );

  const backgroundColor = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.30)']
  );

  const shadowOpacity = useTransform(scrollY, [0, scrollThreshold], [0, 0.12]);

  const paddingY = useTransform(scrollY, [0, scrollThreshold], ['0px', '12px']);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div
      ref={headerRef}
      className='fixed top-0 left-0 right-0 z-50 flex justify-center'
      style={{ paddingTop: paddingY }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}>
      <motion.header
        className='relative overflow-hidden'
        style={{
          width,
          maxWidth,
          height,
          borderRadius,
          backdropFilter: useTransform(
            backdropBlur,
            (blur) => `blur(${blur}) saturate(200%) brightness(105%)`
          ),
          backgroundColor,
          boxShadow: useTransform(
            shadowOpacity,
            (opacity) => `0 8px 32px rgba(0, 0, 0, ${opacity}),`
          ),
        }}
        transition={springConfig}>
        <div
          className='absolute inset-0 rounded-[inherit] pointer-events-none'
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        />

        <div
          className='absolute inset-0 rounded-[inherit] pointer-events-none opacity-50'
          style={{
            background:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
          }}
        />

        <div className='h-full px-8 flex items-center justify-between relative z-10'>
          <motion.button
            onClick={() => scrollToSection('hero')}
            className='relative z-10 group'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <div className='flex items-center gap-3'>
              <div className='flex flex-col items-start'>
                <span className='text-2xl font-bold text-navy tracking-tight'>
                  Truvenix
                </span>
              </div>
            </div>
          </motion.button>

          <nav className='hidden md:flex items-center gap-8'>
            {[
              { label: 'About us', id: 'about' },
              { label: 'Our Services', id: 'services' },
              { label: 'Contact us', id: 'contact' },
            ].map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='text-sm font-medium text-foreground/80 hover:text-primary-blue transition-colors relative group'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * index,
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}>
                {item.label}
                <motion.span
                  className='absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-cyan rounded-full'
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>
    </motion.div>
  );
}
