'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ShippersQuoteForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/shipper-quote', {
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
      id='quote'
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
              Request an Ad-Hoc Lane Quote
            </p>
            <h2 className='text-3xl md:text-4xl font-bold text-navy leading-tight text-balance'>
              Our operations desk will manually source and verify capacity
              within the hour.
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
                  Company Name
                </label>
                <Input
                  required
                  name='companyName'
                  className='bg-white'
                  placeholder='Acme Manufacturing Ltd'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Contact Email / Phone
                </label>
                <Input
                  required
                  name='contact'
                  className='bg-white'
                  placeholder='ops@company.co.uk or 020 1234 5678'
                />
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Origin Postcode
                </label>
                <Input
                  required
                  name='originPostcode'
                  className='bg-white'
                  placeholder='LE11 1AA'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Destination Postcode
                </label>
                <Input
                  required
                  name='destinationPostcode'
                  className='bg-white'
                  placeholder='IP11 3SY'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Cargo Description &amp; Weight
              </label>
              <Textarea
                required
                name='cargoDetails'
                className='bg-white min-h-[100px]'
                placeholder='e.g. Palletised dry goods, 12 tonnes, FTL curtainsider'
              />
            </div>

            <Button
              type='submit'
              disabled={status === 'submitting'}
              className='w-full bg-navy hover:bg-primary-blue text-white rounded-full h-12'>
              {status === 'submitting' ? 'Submitting…' : 'Submit Rate Request'}
            </Button>

            {status === 'success' && (
              <p className='flex items-center gap-2 text-sm text-emerald-700'>
                <CheckCircle2 className='w-4 h-4' />
                Request received. Our operations desk will be in touch
                shortly.
              </p>
            )}
            {status === 'error' && (
              <p className='flex items-center gap-2 text-sm text-destructive'>
                <AlertCircle className='w-4 h-4' />
                Something went wrong. Please email truvenix@gmail.com directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
