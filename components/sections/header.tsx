'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
      <div className='container mx-auto px-6'>
        <div className='flex items-center justify-between h-20'>
          <button
            onClick={() => scrollToSection('hero')}
            className='text-2xl font-bold text-[rgb(var(--navy))]'>
            Truvenix
          </button>

          <nav className='hidden md:flex items-center gap-8'>
            <button
              onClick={() => scrollToSection('about')}
              className='text-sm font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary-blue))] transition-colors'>
              About us
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className='text-sm font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary-blue))] transition-colors'>
              Our Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className='text-sm font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary-blue))] transition-colors'>
              Contact us
            </button>

            {/* <button
              onClick={() => scrollToSection('contact')}
              className='text-sm font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary-blue))] transition-colors'>
              Get a quote
            </button> */}
          </nav>

          {/* <div className='flex items-center gap-3'>
            <Button
              onClick={() => scrollToSection('contact')}
              className='bg-[rgb(var(--primary-blue))] hover:bg-[rgb(var(--navy))] text-white rounded-full px-6'>
              Enquiry Us
            </Button>
            <Button
              variant='outline'
              className='rounded-full px-6 hidden sm:flex bg-transparent'>
              Login
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
}
