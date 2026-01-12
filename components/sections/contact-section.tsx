'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [agreed, setAgreed] = useState(false);

  return (
    <section
      id='contact'
      ref={ref}
      className='py-20 md:py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='relative rounded-3xl overflow-hidden p-8 md:p-12'
            style={{
              backgroundImage: "url('/sky-background.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div className='relative z-10'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>
                Get in touch
              </h2>
              <p className='text-white/90 mb-2'>Come meet us at our office.</p>
              <p className='text-sm text-white/80 mb-8'>
                3rd Floor, XYZ Building, Kochi, Kerala, India
              </p>

              <div className='space-y-4 mb-8'>
                <div className='text-white'>
                  <h3 className='font-semibold mb-2'>Chat with us</h3>
                  <p className='text-white/90'>
                    Our team is here to help with any shipping queries.
                  </p>
                  <a
                    href='mailto:truvenix@gmail.com'
                    className='text-white/90 hover:text-white transition-colors'>
                    truvenix@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <div className='bg-surface rounded-2xl p-8 md:p-10'>
              <form className='space-y-6'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      First Name
                    </label>
                    <Input
                      className='bg-white'
                      placeholder='First Name'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Second Name
                    </label>
                    <Input
                      className='bg-white'
                      placeholder='Second Name'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Company Name
                  </label>
                  <Input
                    className='bg-white'
                    placeholder='Company Name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Email
                  </label>
                  <Input
                    className='bg-white'
                    type='email'
                    placeholder='Email'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Phone number
                  </label>
                  <Input
                    className='bg-white'
                    type='tel'
                    placeholder='Phone number'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Message
                  </label>
                  <Textarea
                    className='bg-white min-h-[120px]'
                    placeholder='Your message...'
                  />
                </div>

                <div className='flex items-start gap-2'>
                  <input
                    type='checkbox'
                    id='privacy'
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className='mt-1'
                  />
                  <label
                    htmlFor='privacy'
                    className='text-sm text-muted-foreground'>
                    I'd like to receive more information about products, I
                    understand and agree to the Privacy Policy.
                  </label>
                </div>

                <Button className='w-full bg-primary-blue hover:bg-navy text-white rounded-full h-12'>
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
