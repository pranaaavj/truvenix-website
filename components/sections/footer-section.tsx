'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shippers', href: '/shippers' },
  { label: 'Carriers', href: '/carriers' },
];

export function FooterSection() {
  return (
    <footer
      id='footer'
      className='bg-navy text-white scroll-mt-24'>
      <div className='container mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-8'>
          <div>
            <motion.h2
              className='text-2xl font-bold mb-3'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              TRUVENIX <span className='text-accent-blue'>LIMITED</span>
            </motion.h2>
            <p className='text-white/70 text-sm leading-relaxed mb-6 max-w-xs'>
              An independent, non-asset logistics broker operating a
              disclosed-agent model across the United Kingdom.
            </p>
            <div className='space-y-3 text-sm'>
              <a
                href='mailto:truvenix@gmail.com'
                data-clickable
                className='flex items-center gap-3 text-white/70 hover:text-white transition-colors'>
                <Mail className='w-4 h-4 shrink-0' />
                truvenix@gmail.com
              </a>
              <a
                href='tel:+447424609945'
                data-clickable
                className='flex items-center gap-3 text-white/70 hover:text-white transition-colors'>
                <Phone className='w-4 h-4 shrink-0' />
                07424 609945
              </a>
              <div className='flex items-center gap-3 text-white/70'>
                <MapPin className='w-4 h-4 shrink-0' />
                82 Nairne Street, BB11 4PE
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-white/50 mb-4'>
              Navigate
            </h3>
            <nav className='flex flex-col gap-3'>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-clickable
                  className='text-white/70 hover:text-white transition-colors text-sm w-fit'>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-white/50 mb-4'>
              Get Started
            </h3>
            <div className='flex flex-col gap-3'>
              <Link
                href='/shippers#quote'
                data-clickable
                className='text-white/70 hover:text-white transition-colors text-sm w-fit'>
                Request Transport Rates
              </Link>
              <Link
                href='/carriers#register'
                data-clickable
                className='text-white/70 hover:text-white transition-colors text-sm w-fit'>
                Join Our Haulier Network
              </Link>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <p className='text-xs text-white/50 leading-relaxed max-w-4xl'>
            <span className='font-semibold text-white/70'>
              Legal disclaimer:
            </span>{' '}
            Truvenix Limited acts exclusively as a disclosed agent
            intermediary. All transport services arranged are subject
            directly to the standard trading conditions of the performing
            carrier (e.g. RHA conditions). Truvenix Limited does not
            physically carry, handle, or store commercial cargo.
          </p>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/50 pt-4 border-t border-white/10'>
            <p>&copy; {new Date().getFullYear()} Truvenix Limited. All rights reserved.</p>
            <div className='flex items-center gap-6'>
              <Link
                href='/privacy-policy'
                data-clickable
                className='hover:text-white transition-colors'>
                Privacy Policy
              </Link>
              <Link
                href='/terms-of-trading'
                data-clickable
                className='hover:text-white transition-colors'>
                Terms of Trading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
