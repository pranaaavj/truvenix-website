'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Ship, FileCheck, TrendingUp, Users, Lightbulb } from 'lucide-react';

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
    image: '/aerial-containers.png',
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
    image: '/shipping-containers-hero.png',
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
    image: '/aerial-containers.png',
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
    image: '/shipping-containers-hero.png',
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
    image: '/aerial-containers.png',
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id='services'
      ref={ref}
      className='py-20 md:py-32 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='mb-16 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-navy mb-4'>
            Our Services
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Comprehensive logistics solutions tailored to your business needs
          </p>
        </motion.div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className='group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100'>
                {/* Background Image */}
                <div className='relative h-48 overflow-hidden'>
                  <motion.img
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    className='w-full h-full object-cover'
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent' />
                </div>

                {/* Card Content */}
                <div className='p-6'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center'>
                      <Icon className='w-5 h-5 text-primary-blue' />
                    </div>
                    <h3 className='text-xl font-semibold text-navy'>
                      {service.title}
                    </h3>
                  </div>
                  <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                    {service.shortDescription}
                  </p>

                  {/* Expandable Details */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isHovered ? 'auto' : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className='overflow-hidden'>
                    <div className='pt-4 border-t border-gray-100 space-y-3'>
                      {service.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{
                            x: isHovered ? 0 : -10,
                            opacity: isHovered ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 rounded-full bg-primary-blue mt-2 flex-shrink-0' />
                          <div>
                            <p className='text-sm font-medium text-navy'>
                              {detail.name}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {detail.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-navy'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
