'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HomeHero() {
  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center overflow-hidden bg-navy'>
      <div className='absolute inset-0'>
        <Image
          src='/images/home-hero.jpg'
          alt='Aerial view of a freight truck on a UK motorway'
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/40' />
      </div>

      <div className='relative z-10 container mx-auto px-6 pt-32 pb-24'>
        <div className='max-w-2xl'>
          <motion.p
            className='text-sm font-semibold tracking-[0.2em] text-accent-blue uppercase mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            UK Road Freight &amp; Port Drayage
          </motion.p>

          <motion.h1
            className='text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] text-balance'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}>
            Direct. Transparent. Dependable.
          </motion.h1>

          <motion.p
            className='text-lg text-white/70 mb-10 leading-relaxed max-w-xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Optimising UK road freight and port drayage solutions through a
            disclosed-agent model &mdash; real carrier rates, one clear
            brokerage fee, no hidden markups.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-4'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}>
            <Link
              href='/shippers#quote'
              data-clickable
              className='inline-flex items-center justify-center rounded-full bg-white text-navy px-7 h-12 text-sm font-semibold hover:bg-white/90 transition-colors'>
              Request Transport Rates
            </Link>
            <Link
              href='/carriers#register'
              data-clickable
              className='inline-flex items-center justify-center rounded-full border border-white/30 text-white px-7 h-12 text-sm font-semibold hover:bg-white/10 transition-colors'>
              Join Our Haulier Network
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
