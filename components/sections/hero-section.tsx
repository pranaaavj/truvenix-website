'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ColourfulText } from '@/components/colorful-text';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <section
      id='hero'
      ref={containerRef}
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-white'>
      {/* Hero Image with Parallax */}
      <motion.div
        className='absolute inset-0 w-full h-full'
        style={{ y }}>
        <div className='relative w-full h-full'>
          <img
            src='/shipping-containers-hero.png'
            alt='Shipping containers'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 from-white/60 via-white/30 to-transparent' />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className='relative z-10 container mx-auto px-6 pb-40'
        style={{ opacity }}>
        <div className='max-w-2xl'>
          <motion.h1
            className='text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-6 leading-tight'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Where <ColourfulText text='trust' /> meets transit
          </motion.h1>

          <motion.p
            className='text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed drop-shadow-lg'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            We Provide reliable shipping whenever you need it. With an extensive
            network that spans every corner of the globe, we ensure that your
            shipments arrive on time, every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <Button
              onClick={() => scrollToSection('services')}
              className='bg-primary-blue hover:bg-navy text-white rounded-full px-8 h-12 text-base'>
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}>
        <motion.div
          className='w-6 h-10 rounded-full border-2 border-navy/30 flex items-start justify-center p-2'
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
          <div className='w-1 h-2 rounded-full bg-navy/50' />
        </motion.div>
      </motion.div>
    </section>
  );
}
