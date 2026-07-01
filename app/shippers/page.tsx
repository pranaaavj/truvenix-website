import type { Metadata } from 'next';
import { ShippersHero } from '@/components/sections/shippers-hero';
import {
  ShippersValueProp,
  ShippersServiceRange,
} from '@/components/sections/shippers-content';
import { ShippersQuoteForm } from '@/components/sections/shippers-quote-form';

export const metadata: Metadata = {
  title: 'Shippers | Truvenix Limited',
  description:
    'Seamless UK transport logistics without hidden overhead. Real rate transparency on FTL, port container drayage, and time-critical hotshots.',
};

export default function ShippersPage() {
  return (
    <>
      <ShippersHero />
      <ShippersValueProp />
      <ShippersServiceRange />
      <ShippersQuoteForm />
    </>
  );
}
