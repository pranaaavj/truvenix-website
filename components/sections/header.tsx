'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/react-motion';

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
    if (!element) return;

    const offset = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      ref={headerRef}
      className='fixed top-0 left-0 right-0 z-50 flex justify-center'
      style={{ paddingTop: paddingY }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
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
            (opacity) => `0 8px 32px rgba(0, 0, 0, ${opacity})`
          ),
        }}
        transition={springConfig}>
        {/* Decorative layers remain untouched */}

        <div className='h-full px-8 flex items-center justify-between relative z-10'>
          {/* Logo unchanged */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className='relative z-10 group'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <span className='text-2xl font-bold text-navy tracking-tight'>
              Truvenix
            </span>
          </motion.button>

          {/* MotionHighlight integrated here */}
          <MotionHighlight
            hover
            className='rounded-md bg-primary-blue/10'
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}>
            <nav className='hidden md:flex items-center gap-8'>
              {[
                { label: 'About us', id: 'about' },
                { label: 'Our Services', id: 'services' },
                { label: 'Contact us', id: 'contact' },
              ].map((item, index) => (
                <MotionHighlightItem
                  key={item.id}
                  value={item.id}
                  asChild>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className='relative px-2 py-1 text-sm font-medium text-foreground/80 hover:text-primary-blue transition-colors group'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      type: 'spring',
                      stiffness: 400,
                      damping: 17,
                    }}
                    // whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}>
                    {item.label}

                    {/* Existing underline animation preserved */}
                    <motion.span
                      className='absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-cyan rounded-full'
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </MotionHighlightItem>
              ))}
            </nav>
          </MotionHighlight>
        </div>
      </motion.header>
    </motion.div>
  );
}
