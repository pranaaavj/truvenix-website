'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  { label: 'About us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Contact us', href: '#contact' },
  { label: 'Get a quote', href: '#quote' },
];

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
];

export function FooterSection() {
  return (
    <footer className='relative bg-primary-blue text-white px-6 py-16 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className="absolute inset-0 bg-[url('/shipping-containers-hero.png')] bg-cover bg-center" />
      </div>

      <div className='relative container mx-auto'>
        <div className='border-b border-white/20 pb-12 mb-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            {/* Company Info */}
            <div>
              <motion.h2
                className='text-3xl font-bold mb-4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                Truvenix
              </motion.h2>
              <p className='text-white/80 mb-6 leading-relaxed'>
                Where trust meets transit. Providing reliable logistics
                solutions since 2020.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-white/80'>
                  <Mail className='w-4 h-4' />
                  <span className='text-sm'>truvenix@gmail.com</span>
                </div>
                <div className='flex items-center gap-3 text-white/80'>
                  <Phone className='w-4 h-4' />
                  <span className='text-sm'>+91 1234567890</span>
                </div>
                <div className='flex items-center gap-3 text-white/80'>
                  <MapPin className='w-4 h-4' />
                  <span className='text-sm'>Kochi, Kerala, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
              <nav className='flex flex-col gap-3'>
                {footerLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    className='text-white/80 hover:text-white transition-colors text-sm'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    data-clickable>
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>
                Let's connect with truvenix!
              </h3>
              <p className='text-white/80 text-sm mb-6'>
                Follow us on social media for updates and news
              </p>
              <div className='flex flex-col gap-3'>
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    className='text-white/80 hover:text-white transition-colors text-sm'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    data-clickable>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70'>
          <p>© 2025 Truvenix. All rights reserved.</p>
          <div className='flex items-center gap-6'>
            <a
              href='#'
              className='hover:text-white transition-colors'
              data-clickable>
              Privacy Policy
            </a>
            <a
              href='#'
              className='hover:text-white transition-colors'
              data-clickable>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
