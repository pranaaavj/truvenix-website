'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function CarriersRegisterForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/carrier-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id='register'
      className='py-24 md:py-32 bg-background scroll-mt-24'>
      <div className='container mx-auto px-6'>
        <div
          ref={ref}
          className='max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className='text-center mb-12'>
            <p className='text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4'>
              Register Your Available Fleet Capacity
            </p>
            <h2 className='text-3xl md:text-4xl font-bold text-navy leading-tight text-balance'>
              Let our dispatch team keep your trucks loaded.
            </h2>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
            className='bg-surface rounded-2xl p-10 md:p-14 space-y-8'>
            <div className='grid sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Haulier / Company Name
                </label>
                <Input
                  required
                  name='haulierName'
                  className='bg-white'
                  placeholder='Midlands Haulage Ltd'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Direct Dispatch Phone Number
                </label>
                <Input
                  required
                  type='tel'
                  name='dispatchPhone'
                  className='bg-white'
                  placeholder='07123 456789'
                />
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Base Location / Postcode
                </label>
                <Input
                  required
                  name='basePostcode'
                  className='bg-white'
                  placeholder='DE1 2AB'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Vehicle Types
                </label>
                <Input
                  required
                  name='vehicleTypes'
                  className='bg-white'
                  placeholder='e.g. 44t Artic, Hiab, Van'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Preferred Regional Lanes
              </label>
              <Input
                required
                name='preferredLanes'
                className='bg-white'
                placeholder='e.g. Midlands to Felixstowe, North West loops'
              />
            </div>

            <Button
              type='submit'
              disabled={status === 'submitting'}
              className='w-full bg-navy hover:bg-primary-blue text-white rounded-full h-12'>
              {status === 'submitting' ? 'Submitting…' : 'Register with Truvenix'}
            </Button>

            {status === 'success' && (
              <p className='flex items-center gap-2 text-sm text-emerald-700'>
                <CheckCircle2 className='w-4 h-4' />
                Registration received &mdash; our dispatch team will follow up
                shortly.
              </p>
            )}
            {status === 'error' && (
              <p className='flex items-center gap-2 text-sm text-destructive'>
                <AlertCircle className='w-4 h-4' />
                Something went wrong. Please email ops@truvenix.co.uk directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
