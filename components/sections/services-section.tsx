'use client';

import { Ship, FileCheck, TrendingUp, Users, Lightbulb } from 'lucide-react';
import CardSwap, { Card } from '@/components/CardSwap';

const services = [
  {
    title: 'Freight Forwarding',
    icon: Ship,
    shortDescription:
      'Comprehensive transport solutions across sea, air, road, and rail networks.',
    details: [
      { name: 'Sea Freight', desc: 'FCL and LCL services for global shipping' },
      { name: 'Air Freight', desc: 'Fast and reliable air cargo solutions' },
      { name: 'Road Freight', desc: 'Domestic and international trucking' },
      { name: 'Rail Freight', desc: 'Cost-effective rail transport options' },
    ],
  },
  {
    title: 'Customs Clearance',
    icon: FileCheck,
    shortDescription:
      'Seamless customs processing and compliance management for all your shipments.',
    details: [
      {
        name: 'Import & Export',
        desc: 'Complete customs documentation handling',
      },
      { name: 'Tariff Classification', desc: 'Accurate goods classification' },
      { name: 'Duty Management', desc: 'Calculate and manage customs duties' },
    ],
  },
  {
    title: 'Logistics Solutions',
    icon: TrendingUp,
    shortDescription:
      'End-to-end supply chain optimization and warehouse management services.',
    details: [
      { name: 'Supply Chain', desc: 'Complete supply chain optimization' },
      { name: 'Warehousing', desc: 'Storage with inventory management' },
      { name: 'Distribution', desc: 'Efficient last-mile delivery solutions' },
    ],
  },
  {
    title: 'Freight Brokering',
    icon: Users,
    shortDescription:
      'Connect with reliable carriers and get competitive rates with real-time tracking.',
    details: [
      { name: 'Carrier Matching', desc: 'Connect with trusted carriers' },
      { name: 'Rate Negotiation', desc: 'Secure competitive freight rates' },
      { name: 'Shipment Tracking', desc: 'Real-time visibility for shipments' },
    ],
  },
  {
    title: 'Consultation Services',
    icon: Lightbulb,
    shortDescription:
      'Expert guidance on supply chain strategy, compliance, and risk management.',
    details: [
      {
        name: 'Supply Chain Consulting',
        desc: 'Strategies to improve efficiency',
      },
      {
        name: 'Compliance Advisory',
        desc: 'International trade regulations guidance',
      },
      {
        name: 'Risk Management',
        desc: 'Identify and mitigate logistics risks',
      },
    ],
  },
];

export function ServicesCard() {
  return (
    <section
      id='services'
      className='py-24 bg-surface'>
      <div className='container mx-auto px-6 max-w-7xl'>
        {/* Header */}
        <div className='mb-20'>
          <p className='text-sm font-semibold tracking-widest text-accent uppercase mb-3'>
            What We Offer
          </p>
          <h2 className='text-4xl md:text-5xl font-bold text-navy'>
            Our Services
          </h2>
        </div>

        {/* Two column layout */}
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left - Text content */}
          <div className='space-y-6'>
            <h3 className='text-3xl md:text-4xl font-semibold text-navy leading-tight text-balance'>
              Delivering trusted freight solutions worldwide
            </h3>
            <p className='text-muted-foreground text-lg leading-relaxed max-w-md'>
              From customs clearance to last-mile delivery, we provide
              comprehensive logistics services tailored to your business needs.
            </p>
            <div className='pt-4'>
              <a
                href='#'
                className='inline-flex items-center gap-2 text-navy font-medium hover:text-accent transition-colors group'>
                View all services
                <svg
                  className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right - Card stack */}
          <div className='relative h-[500px] lg:h-[550px]'>
            <CardSwap
              cardDistance={45}
              verticalDistance={80}
              delay={3500}
              pauseOnHover={true}
              width={480}
              height={420}>
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index}>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 rounded-lg bg-accent/10'>
                        <Icon className='w-5 h-5 text-accent' />
                      </div>
                      <h3 className='text-xl font-semibold text-background'>
                        {service.title}
                      </h3>
                    </div>
                    <p className='text-background/60 text-sm mb-5 leading-relaxed'>
                      {service.shortDescription}
                    </p>
                    <ul className='space-y-2.5'>
                      {service.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className='flex items-start gap-2 text-sm'>
                          <span className='w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0' />
                          <span className='text-background/50'>
                            <span className='font-medium text-background/80'>
                              {detail.name}
                            </span>
                            {' \u2014 '}
                            {detail.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
