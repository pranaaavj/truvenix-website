'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/react-motion';
import { useLenis } from '@/components/lenis-provider';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shippers', href: '/shippers' },
  { label: 'Carriers', href: '/carriers' },
  { label: 'Contact', href: '#footer' },
];

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollThreshold = 150;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > scrollThreshold * 0.6);
  });

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
    ['0px', '24px']
  );
  const backgroundColor = useTransform(
    scrollY,
    [0, scrollThreshold],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.85)']
  );
  const shadowOpacity = useTransform(scrollY, [0, scrollThreshold], [0, 0.12]);
  const paddingY = useTransform(scrollY, [0, scrollThreshold], ['0px', '12px']);

  const handleNavClick = (e: MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      lenis?.scrollTo(href, { duration: 1.2 });
      return;
    }

    const [path, hash] = href.split('#');

    if (path === pathname) {
      e.preventDefault();
      lenis?.scrollTo(hash ? `#${hash}` : 0, { duration: 1.2 });
    }
  };

  return (
    <motion.div
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
            (blur) => `blur(${blur}) saturate(180%)`
          ),
          backgroundColor,
          boxShadow: useTransform(
            shadowOpacity,
            (opacity) => `0 8px 32px rgba(15, 23, 42, ${opacity})`
          ),
        }}
        transition={springConfig}>
        <div className='h-full px-8 flex items-center justify-between relative z-10'>
          <Link
            href='/'
            onClick={(e) => handleNavClick(e, '/')}
            className='relative z-10 group'
            data-clickable>
            <span
              className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}>
              TRUVENIX
              <span className='text-accent-blue'>.</span>
            </span>
          </Link>

          <MotionHighlight
            hover
            className={`rounded-full transition-colors duration-300 ${
              isScrolled ? 'bg-navy/5' : 'bg-white/10'
            }`}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}>
            <nav className='hidden md:flex items-center gap-8'>
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <MotionHighlightItem
                    key={item.href}
                    value={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      data-clickable
                      className='relative px-2 py-1'>
                      <motion.span
                        className={`inline-block text-sm font-medium transition-colors duration-300 ${
                          isScrolled
                            ? isActive
                              ? 'text-navy'
                              : 'text-foreground/70'
                            : isActive
                              ? 'text-white'
                              : 'text-white/70'
                        }`}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.08 * index,
                          type: 'spring',
                          stiffness: 400,
                          damping: 17,
                        }}
                        whileTap={{ scale: 0.95 }}>
                        {item.label}
                      </motion.span>
                    </Link>
                  </MotionHighlightItem>
                );
              })}
            </nav>
          </MotionHighlight>

          <Link
            href='/shippers#quote'
            onClick={(e) => handleNavClick(e, '/shippers#quote')}
            data-clickable
            className='hidden md:inline-flex items-center rounded-full bg-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-blue'>
            Request Rates
          </Link>
        </div>
      </motion.header>
    </motion.div>
  );
}
