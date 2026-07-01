'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ClipboardList,
  Radar,
  FileCheck2,
  CheckCircle2,
  Package,
  Truck,
} from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Lane Inquiry',
    description: 'Shippers submit their domestic lane requirements.',
  },
  {
    number: '02',
    icon: Radar,
    title: 'Live Procurement',
    description: 'We source verified hauliers using live exchange networks.',
  },
  {
    number: '03',
    icon: FileCheck2,
    title: 'Direct Disclosure',
    description:
      'We detail the exact carrier rate and our flat broker fee.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Execution',
    description:
      'The shipper contracts directly with the performing asset.',
  },
];

function useRevealProps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return { ref, isInView };
}

export function CorporateIntro() {
  const { ref, isInView } = useRevealProps();

  return (
    <section className='py-20 md:py-28 bg-background'>
      <div className='container mx-auto px-6'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className='max-w-3xl'>
          <p className='text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4'>
            Welcome to Truvenix Limited
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight text-balance'>
            An independent logistics broker, not another forwarder taking a
            cut.
          </h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Truvenix Limited is an independent, non-asset logistics broker
            operating across the United Kingdom. We do not own a fleet, nor
            do we absorb your margins. Instead, we act as your dedicated
            strategic matchmaker, seamlessly bridging the gap between
            commercial shippers and fully vetted transport operations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function DisclosedAgentFramework() {
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
            Our Disclosed Agent Framework
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-navy leading-tight text-balance'>
            We believe in absolute transparency. Here is the direct workflow.
          </h2>
        </motion.div>

        <div className='relative'>
          <div className='hidden lg:block absolute top-1.75 left-0 right-0 h-px bg-border overflow-hidden'>
            <motion.div
              className='h-full bg-primary-blue origin-left'
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8'>
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}>
                  <span className='relative z-10 block w-3.5 h-3.5 rounded-full bg-primary-blue ring-4 ring-surface mb-5' />
                  <span className='text-xs font-semibold tracking-widest text-muted-foreground'>
                    STEP {step.number}
                  </span>
                  <div className='flex items-center gap-2 mt-2 mb-2'>
                    <Icon className='w-4 h-4 text-primary-blue shrink-0' />
                    <h3 className='text-lg font-semibold text-navy'>
                      {step.title}
                    </h3>
                  </div>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AudienceSplit() {
  const { ref, isInView } = useRevealProps();

  return (
    <section className='py-20 md:py-28 bg-background'>
      <div className='container mx-auto px-6'>
        <div
          ref={ref}
          className='grid md:grid-cols-2 gap-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className='rounded-3xl bg-navy text-white p-10 md:p-12 flex flex-col'>
            <Package className='w-8 h-8 text-accent-blue mb-6' />
            <h3 className='text-2xl font-bold mb-6'>Are you a Shipper?</h3>
            <ul className='space-y-3 mb-10 flex-1'>
              {[
                'Eliminate hidden forwarder markups.',
                'Retain primary carrier insurance paths.',
                'Access vetted regional O-License holders.',
              ].map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-white/80 text-sm leading-relaxed'>
                  <span className='w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href='/shippers'
              data-clickable
              className='inline-flex items-center justify-center rounded-full bg-white text-navy px-6 h-11 text-sm font-semibold hover:bg-white/90 transition-colors w-fit'>
              View Shipper Solutions
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
            className='rounded-3xl bg-surface border border-border p-10 md:p-12 flex flex-col'>
            <Truck className='w-8 h-8 text-primary-blue mb-6' />
            <h3 className='text-2xl font-bold text-navy mb-6'>
              Are you a Haulier?
            </h3>
            <ul className='space-y-3 mb-10 flex-1'>
              {[
                'Keep your assets running full loops.',
                'Hand over booking administration to us.',
                'Safeguard cashflow with clean terms.',
              ].map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-muted-foreground text-sm leading-relaxed'>
                  <span className='w-1.5 h-1.5 rounded-full bg-primary-blue mt-1.5 shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href='/carriers'
              data-clickable
              className='inline-flex items-center justify-center rounded-full bg-navy text-white px-6 h-11 text-sm font-semibold hover:bg-primary-blue transition-colors w-fit'>
              Explore Carrier Benefits
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
