'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress from top of viewport
  const { scrollY } = useScroll();

  // Scroll threshold for morphing (50-60px as specified)
  const scrollThreshold = 60;

  // Transform values based on scroll position
  const width = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['100%', '90%'] // Contract to pill shape
  );

  const maxWidth = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['1280px', '1000px'] // Reduce max width for pill effect
  );

  const height = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['80px', '64px'] // Subtle height reduction
  );

  const borderRadius = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['12px', '999px'] // Morph to full pill shape
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['8px', '16px'] // Increase blur when contracted
  );

  const backgroundColor = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.7)'] // Slightly more opaque
  );

  const shadowOpacity = useTransform(
    scrollY,
    [0, scrollThreshold],
    [0.05, 0.15] // Stronger shadow when contracted
  );

  const paddingY = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['0px', '12px'] // Add vertical padding when contracted
  );

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
        className='relative'
        style={{
          width,
          maxWidth,
          height,
          borderRadius,
          backdropFilter: useTransform(backdropBlur, (blur) => `blur(${blur})`),
          backgroundColor,
          boxShadow: useTransform(
            shadowOpacity,
            (opacity) =>
              `0 8px 32px rgba(0, 0, 0, ${opacity}), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
          ),
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}>
        {/* Glassmorphism border */}
        <div className='absolute inset-0 rounded-[inherit] border border-white/20 pointer-events-none' />

        <div className='h-full px-8 flex items-center justify-between'>
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className='text-2xl font-bold text-[rgb(var(--navy))] relative z-10'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            Truvenix
          </motion.button>

          {/* Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {[
              { label: 'About us', id: 'about' },
              { label: 'Our Services', id: 'services' },
              { label: 'Contact us', id: 'contact' },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='text-sm font-medium text-foreground/80 hover:text-[rgb(var(--primary-blue))] transition-colors relative'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                {item.label}
                {/* Animated underline on hover */}
                <motion.span
                  className='absolute -bottom-1 left-0 right-0 h-0.5 bg-[rgb(var(--primary-blue))]'
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>
    </motion.div>
  );
}
