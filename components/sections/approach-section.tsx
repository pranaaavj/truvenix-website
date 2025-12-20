'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ApproachSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className='py-20 md:py-32 bg-[rgb(var(--surface))]'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-[rgb(var(--navy))] mb-4'>
            Our Approach
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            className='relative order-2 md:order-1'
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <div className='rounded-2xl overflow-hidden shadow-2xl'>
              <img
                src='/aerial-containers.png'
                alt='Logistics operations'
                className='w-full h-[400px] md:h-[500px] object-cover'
              />
            </div>
          </motion.div>

          <motion.div
            className='order-1 md:order-2'
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}>
            <h3 className='text-2xl md:text-3xl font-semibold text-[rgb(var(--foreground))] mb-4'>
              We provide a very seamless process
            </h3>
            <p className='text-lg text-[rgb(var(--muted-foreground))] mb-6 leading-relaxed'>
              Logistics is the process of planning, organizing, and managing the
              movement and storage of goods, resources, and information from one
              point to another.
            </p>
            <button className='flex items-center gap-2 text-[rgb(var(--primary-blue))] hover:text-[rgb(var(--navy))] transition-colors group'>
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
    </section>
  );
}
