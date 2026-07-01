import type React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LenisProvider } from '@/components/lenis-provider';
import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';
import { PageTransition } from '@/components/page-transition';
import { Header } from '@/components/sections/header';
import { FooterSection } from '@/components/sections/footer-section';
import { WhatsAppChatbot } from '@/components/whatsapp-chatbot';
import './globals.css';

const _montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Truvenix Limited | UK Road Freight & Port Drayage Broker',
  description:
    'Truvenix Limited is an independent, non-asset logistics broker connecting UK shippers with vetted hauliers through a transparent, disclosed-agent model.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`font-sans antialiased`}>
        <LenisProvider>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main className='bg-navy'>
            <PageTransition>{children}</PageTransition>
          </main>
          <FooterSection />
          <WhatsAppChatbot />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
