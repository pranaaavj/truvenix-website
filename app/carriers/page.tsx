import type { Metadata } from 'next';
import { CarriersHero } from '@/components/sections/carriers-hero';
import {
  CarriersAdminRelief,
  CarriersCompliance,
} from '@/components/sections/carriers-content';
import { CarriersRegisterForm } from '@/components/sections/carriers-register-form';

export const metadata: Metadata = {
  title: 'Carriers | Truvenix Limited',
  description:
    'Maximise your vehicle fleet utilisation and eliminate empty dead-miles. Register your fleet capacity with Truvenix Limited.',
};

export default function CarriersPage() {
  return (
    <>
      <CarriersHero />
      <CarriersAdminRelief />
      <CarriersCompliance />
      <CarriersRegisterForm />
    </>
  );
}
