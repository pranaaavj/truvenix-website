'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Truck, Ship, Zap } from 'lucide-react';

const SERVICES = [
  {
    icon: Truck,
    title: 'Full Truckloads (FTL)',
    description:
      'Curtainsides, box trailers, and flatbeds for direct point-to-point regional transit.',
  },
  {
    icon: Ship,
    title: 'Port Container Drayage',
    description:
      'Sourcing reliable skeletal trailer drivers to pull import/export ocean containers out of Felixstowe, Southampton, and Liverpool hubs.',
  },
  {
    icon: Zap,
    title: 'Time-Critical Hotshots',
    description:
      'Sourcing express van couriers for manufacturing or commercial emergencies.',
  },
];

function useRevealProps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return { ref, isInView };
}

export function ShippersValueProp() {
  const { ref, isInView } = useRevealProps();

  return (
    <section className='py-20 md:py-28 bg-background'>
      <div className='container mx-auto px-6'>
        <div
          ref={ref}
          className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className='relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden'>
            <Image
              src='/images/port-containers.jpg'
              alt='Stacked shipping containers at a port terminal'
              fill
              sizes='(min-width: 768px) 50vw, 100vw'
              className='object-cover'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            <p className='text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4'>
              The Truvenix Difference
            </p>
            <h2 className='text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight text-balance'>
              Real rate transparency.
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Traditional freight forwarders hide significant margin buffers
              inside a single lump-sum freight invoice. Truvenix removes the
              blindfold. When we secure a domestic vehicle or container
              drayage run for your business, we itemize every detail. You see
              the exact invoice value requested by the trucking firm, paired
              with a clear, predictable brokerage fee.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ShippersServiceRange() {
  const { ref, isInView } = useRevealProps();

  return (
    <section className='py-20 md:py-28 bg-surface'>
      <div className='container mx-auto px-6'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className='max-w-2xl mb-16'>
          <p className='text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4'>
            What We Arrange
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-navy leading-tight text-balance'>
            Across the UK network.
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className='rounded-2xl bg-background border border-border p-8'>
                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-primary-blue/10 mb-6'>
                  <Icon className='w-6 h-6 text-primary-blue' />
                </div>
                <h3 className='text-lg font-semibold text-navy mb-3'>
                  {service.title}
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
