'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function CarriersHero() {
  return (
    <section className='relative min-h-[70vh] flex items-end overflow-hidden bg-navy'>
      <div className='absolute inset-0'>
        <Image
          src='/images/carriers-hero.jpg'
          alt='Freight truck driving through mountain terrain'
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/40' />
      </div>

      <div className='relative z-10 container mx-auto px-6 pt-40 pb-16'>
        <motion.p
          className='text-sm font-semibold tracking-[0.2em] text-accent-blue uppercase mb-5'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          For Hauliers
        </motion.p>
        <motion.h1
          className='text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-[1.1] text-balance'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}>
          Maximise your fleet utilisation. Eliminate empty dead-miles.
        </motion.h1>
      </div>
    </section>
  );
}
