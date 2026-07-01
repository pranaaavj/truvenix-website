'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, FileText, Umbrella } from 'lucide-react';

const REQUIREMENTS = [
  {
    icon: ShieldCheck,
    title: "Active UK Operator's License",
    description: 'A valid O-License covering your operating vehicles.',
  },
  {
    icon: FileText,
    title: 'Goods in Transit (GIT) Insurance',
    description: 'Cover up to standard RHA liability limits.',
  },
  {
    icon: Umbrella,
    title: 'Motor Public Liability Insurance',
    description: 'Active cover protecting third parties and cargo.',
  },
];

function useRevealProps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return { ref, isInView };
}

export function CarriersAdminRelief() {
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
            Administrative Relief for Drivers
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight text-balance'>
            We handle the back-office so you can focus on the road.
          </h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Are you an independent owner-operator or running a small
            regional transport fleet? Managing a haulage business means
            spending hours chasing clients, dealing with consignor
            paperwork, and hunting down backloads. Truvenix acts as your
            external sales and administrative layer. We match your regular
            empty legs with real shippers, handle client updates, organise
            confirmation sheets, and pass direct booking opportunities
            right to your phone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function CarriersCompliance() {
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
            Compliance Benchmarks
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-navy leading-tight text-balance'>
            What we require to add you to our network.
          </h2>
          <p className='text-muted-foreground mt-4 leading-relaxed'>
            To protect our shipper network, we strictly verify all
            subcontracting operators before we connect you with a load.
          </p>
        </motion.div>

        <div className='divide-y divide-border border-t border-border'>
          {REQUIREMENTS.map((req, index) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='grid md:grid-cols-[auto_1fr] gap-4 md:gap-10 py-8 items-start'>
                <Icon className='w-6 h-6 text-primary-blue shrink-0' />
                <div>
                  <h3 className='text-lg font-semibold text-navy mb-2'>
                    {req.title}
                  </h3>
                  <p className='text-sm text-muted-foreground leading-relaxed max-w-xl'>
                    {req.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
