import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Trading | Truvenix Limited',
  description:
    'The trading conditions under which Truvenix Limited arranges UK road freight and port drayage.',
};

const sections = [
  {
    heading: 'Our role as a disclosed agent',
    body: [
      'Truvenix Limited acts exclusively as a disclosed agent intermediary. We are an independent, non-asset logistics broker: we do not own a fleet, and we do not physically carry, handle, or store commercial cargo.',
      'We arrange transport by matching shippers with vetted, independent haulage operators. Once a booking is confirmed, the shipper contracts directly with the performing carrier for that shipment.',
    ],
  },
  {
    heading: 'Carrier trading conditions',
    body: [
      'All transport services arranged through Truvenix are subject directly to the standard trading conditions of the performing carrier, including, where applicable, the RHA (Road Haulage Association) conditions of carriage.',
    ],
  },
  {
    heading: 'Rates and quotes',
    body: [
      'Rates provided in response to a lane quote request are indicative and subject to carrier availability at the time of booking. Final rates are confirmed once a haulier has been sourced and verified for the specific lane, vehicle type, and cargo.',
      'Our brokerage fee is disclosed alongside the carrier rate, in line with our disclosed-agent framework.',
    ],
  },
  {
    heading: 'Haulier network requirements',
    body: [
      'Hauliers joining our network must hold an active UK Operator’s Licence, valid Goods in Transit (GIT) insurance covering standard RHA liability limits, and active Motor Public Liability insurance. Truvenix verifies these credentials before connecting a haulier with any load.',
    ],
  },
  {
    heading: 'Cancellations',
    body: [
      'Cancellation terms for a confirmed booking are set by the performing carrier under their own trading conditions. Contact our operations desk as early as possible if a booking needs to change.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of England and Wales.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about these terms can be sent to truvenix@gmail.com or +44 7424 609945.',
    ],
  },
];

export default function TermsOfTradingPage() {
  return (
    <section className='bg-background py-32 md:py-40'>
      <div className='container mx-auto px-6 max-w-3xl'>
        <p className='text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4'>
          Legal
        </p>
        <h1 className='text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight'>
          Terms of Trading
        </h1>
        <p className='text-sm text-muted-foreground mb-16'>
          Last updated: January 2026
        </p>

        <div className='space-y-12'>
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className='text-xl font-semibold text-navy mb-4'>
                {section.heading}
              </h2>
              <div className='space-y-4'>
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className='text-muted-foreground leading-relaxed'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
