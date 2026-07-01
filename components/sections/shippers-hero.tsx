'use client';

import Image from 'next/image';

export function ShippersHero() {
  return (
    <section className='relative min-h-[70vh] flex items-end overflow-hidden bg-navy'>
      <div className='absolute inset-0'>
        <Image
          src='/images/shippers-hero.jpg'
          alt='Freight truck driving on a UK motorway at dusk'
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/0' />
      </div>

      <div className='relative z-10 container mx-auto px-6 pt-40 pb-16'>
        <p className='text-sm font-semibold tracking-[0.2em] text-accent-blue uppercase mb-5'>
          For Shippers
        </p>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-[1.1] text-balance'>
          Seamless UK transport logistics without hidden overhead.
        </h1>
      </div>
    </section>
  );
}
