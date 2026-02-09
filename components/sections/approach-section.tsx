'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const APPROACH_IMAGE_URL =
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop';

const LAYOUT_TRANSITION = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const,
};

const CONTENT_TRANSITION = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Track section visibility for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  // Collapse on scroll attempt (wheel) while expanded
  useEffect(() => {
    if (!isExpanded) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) {
        setIsExpanded(false);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('wheel', handleWheel, { passive: true });
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isExpanded]);

  // Also collapse on touchmove for mobile
  useEffect(() => {
    if (!isExpanded) return;

    const handleTouch = () => {
      setIsExpanded(false);
    };

    const timer = setTimeout(() => {
      window.addEventListener('touchmove', handleTouch, { passive: true });
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [isExpanded]);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <LayoutGroup>
      <section
        id='approach'
        ref={sectionRef}
        className='relative py-20 md:py-32 bg-background overflow-visible'>
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
              Our Approach
            </h2>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            {/* Left Side - Image */}
            <motion.div
              className='relative order-2 md:order-1'
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <div
                className='relative h-[400px] md:h-[500px] rounded-2xl'
                role='button'
                tabIndex={0}
                onClick={handleExpand}
                onKeyDown={(e) => e.key === 'Enter' && handleExpand()}
                aria-label='Click to expand and read more about our approach'>
                {!isExpanded && (
                  <motion.div
                    layoutId='approach-image'
                    className='absolute inset-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer'
                    transition={LAYOUT_TRANSITION}
                    style={{ borderRadius: 16 }}>
                    <img
                      src={APPROACH_IMAGE_URL || '/placeholder.svg'}
                      alt='Logistics operations'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors' />
                  </motion.div>
                )}

                {isExpanded && (
                  <div className='w-full h-full rounded-2xl bg-muted/30' />
                )}
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className='order-1 md:order-2'
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}>
              <h3 className='text-2xl md:text-3xl font-semibold text-foreground/90 mb-4'>
                We provide a very seamless process
              </h3>
              <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                Logistics is the process of planning, organizing, and managing
                the movement and storage of goods, resources, and information
                from one point to another.
              </p>
              <button
                onClick={handleExpand}
                type='button'
                className='flex items-center gap-2 text-foreground hover:text-foreground/70 transition-colors group cursor-pointer'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
                  alt='Team member'
                  className='w-8 h-8 rounded-full'
                />
                <span className='font-medium'>Read more on our approach</span>
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </button>
            </motion.div>
          </div>
        </div>

        {/* ──────────── Expanded Overlay ──────────── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key='expanded-approach'
              className='fixed inset-0 z-50'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}>
              <motion.div
                layoutId='approach-image'
                className='absolute inset-0 overflow-hidden'
                transition={LAYOUT_TRANSITION}
                style={{ borderRadius: 0 }}>
                <img
                  src={APPROACH_IMAGE_URL || '/placeholder.svg'}
                  alt='Logistics operations'
                  className='w-full h-full object-cover'
                />

                <motion.div
                  className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={CONTENT_TRANSITION}
                />
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={handleCollapse}
                type='button'
                className='absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors cursor-pointer'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ ...CONTENT_TRANSITION, delay: 0.15 }}
                aria-label='Close expanded view'>
                <X className='w-6 h-6' />
              </motion.button>

              {/* Expanded content */}
              <motion.div
                className='relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ ...CONTENT_TRANSITION, delay: 0.15 }}>
                <motion.h2
                  className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-4xl leading-tight text-balance drop-shadow-lg'
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ ...CONTENT_TRANSITION, delay: 0.2 }}>
                  A Seamless Process
                  <br />
                  From Start to Finish
                </motion.h2>

                <div className='grid md:grid-cols-2 gap-8 md:gap-16 max-w-5xl'>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ ...CONTENT_TRANSITION, delay: 0.25 }}
                    className='bg-black/30 backdrop-blur-sm rounded-xl p-6'>
                    <p className='text-white/90 text-sm uppercase tracking-wider mb-3 font-medium'>
                      Planning &amp; Organization
                    </p>
                    <p className='text-white text-base md:text-lg leading-relaxed'>
                      We meticulously plan every step of the logistics process,
                      ensuring that resources are allocated efficiently and
                      timelines are met with precision across all stages of the
                      supply chain.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ ...CONTENT_TRANSITION, delay: 0.3 }}
                    className='bg-black/30 backdrop-blur-sm rounded-xl p-6'>
                    <p className='text-white/90 text-sm uppercase tracking-wider mb-3 font-medium'>
                      Execution &amp; Delivery
                    </p>
                    <p className='text-white text-base md:text-lg leading-relaxed'>
                      Our approach focuses on seamless execution, managing the
                      movement and storage of goods with real-time tracking and
                      optimization to guarantee reliable delivery every time.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className='flex flex-wrap gap-8 md:gap-16 mt-12 pt-8 border-t border-white/30'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ ...CONTENT_TRANSITION, delay: 0.35 }}>
                  <div>
                    <p className='text-3xl md:text-4xl font-bold text-white drop-shadow-md'>
                      99.8%
                    </p>
                    <p className='text-white/90 text-sm mt-1'>
                      On-Time Delivery
                    </p>
                  </div>
                  <div>
                    <p className='text-3xl md:text-4xl font-bold text-white drop-shadow-md'>
                      24/7
                    </p>
                    <p className='text-white/90 text-sm mt-1'>
                      Real-Time Tracking
                    </p>
                  </div>
                  <div>
                    <p className='text-3xl md:text-4xl font-bold text-white drop-shadow-md'>
                      100+
                    </p>
                    <p className='text-white/90 text-sm mt-1'>
                      Optimized Routes
                    </p>
                  </div>
                </motion.div>

                <motion.p
                  className='text-white/70 text-sm mt-8'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ...CONTENT_TRANSITION, delay: 0.4 }}>
                  Scroll to close
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}
