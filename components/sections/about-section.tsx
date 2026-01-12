'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id='about'
      ref={ref}
      className='py-20 md:py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}>
            <h2 className='text-4xl md:text-5xl font-bold text-navy mb-6'>
              About us
            </h2>
            <h3 className='text-2xl md:text-3xl font-semibold text-foreground mb-4'>
              Providing Logistics Support since 2020
            </h3>
            <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
              Logistics is the process of planning, organizing, and managing the
              movement and storage of goods, resources, and information from one
              point to another.
            </p>
            <button className='flex items-center gap-2 text-primary-blue hover:text-navy transition-colors group'>
              <img
                src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                alt='Team member'
                className='w-8 h-8 rounded-full'
              />
              <span className='font-medium'>Read more about us</span>
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>
          </motion.div>

          <motion.div
            className='relative'
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <div className='rounded-2xl overflow-hidden shadow-2xl'>
              <img
                src='/aerial-containers.png'
                alt='Aerial view of shipping containers'
                className='w-full h-[400px] md:h-[500px] object-cover'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
