import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Truvenix Limited',
  description:
    'How Truvenix Limited collects, uses, and protects your information.',
};

const sections = [
  {
    heading: 'Who we are',
    body: [
      'Truvenix Limited is an independent, non-asset logistics broker operating a disclosed-agent model across the United Kingdom. This policy explains what information we collect through this website and how we use it.',
    ],
  },
  {
    heading: 'Information we collect',
    body: [
      'When you submit a lane quote request or a haulier registration form, we collect the details you provide: company name, contact information, postcodes, cargo description, vehicle types, and preferred lanes.',
      'We also use Vercel Analytics to understand general traffic patterns on this site. This does not identify you personally.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'We use the information you submit to respond to your enquiry, source and verify transport capacity, and, where relevant, connect shippers with vetted hauliers under our disclosed-agent framework.',
      'We do not sell your information to third parties.',
    ],
  },
  {
    heading: 'Sharing your information',
    body: [
      'Under our disclosed-agent model, relevant shipment details are shared directly with the performing carrier once a booking is confirmed, so that the shipper contracts directly with that carrier. We do not share your information beyond what is necessary to arrange your transport.',
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'We retain enquiry and registration information for as long as necessary to provide our services and meet our legal and compliance obligations.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Under UK data protection law, you have the right to access, correct, or request deletion of your personal information. To exercise any of these rights, contact us at truvenix@gmail.com.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about this policy can be sent to truvenix@gmail.com or +44 7424 609945.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className='bg-background py-32 md:py-40'>
      <div className='container mx-auto px-6 max-w-3xl'>
        <p className='text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4'>
          Legal
        </p>
        <h1 className='text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight'>
          Privacy Policy
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
