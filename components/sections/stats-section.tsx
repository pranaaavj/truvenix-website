'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Users, Globe, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Package, value: '50K+', label: 'Shipments Delivered' },
  { icon: Users, value: '1000+', label: 'Happy Clients' },
  { icon: Globe, value: '100+', label: 'Countries Reached' },
  { icon: TrendingUp, value: '99.9%', label: 'On-Time Delivery' },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className='py-20 md:py-32 bg-primary-blue text-white relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10'>
        <div className="absolute inset-0 bg-[url('/shipping-containers-hero.png')] bg-cover bg-center" />
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Our Impact in Numbers
          </h2>
          <p className='text-lg text-white/90 max-w-2xl mx-auto'>
            Delivering excellence across the globe with reliability and
            precision
          </p>
        </motion.div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='text-center'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4'>
                  <Icon className='w-8 h-8' />
                </div>
                <div className='text-4xl md:text-5xl font-bold mb-2'>
                  {stat.value}
                </div>
                <div className='text-white/90'>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
