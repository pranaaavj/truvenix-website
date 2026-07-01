import { LenisProvider } from '@/components/lenis-provider';
import { CustomCursor } from '@/components/custom-cursor';
import { Header } from '@/components/sections/header';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ApproachSection } from '@/components/sections/approach-section';
import { ServicesCard } from '@/components/sections/services-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ContactSection } from '@/components/sections/contact-section';
import { FooterSection } from '@/components/sections/footer-section';
import { ScrollProgress } from '@/components/scroll-progress';
import { WhatsAppChatbot } from '@/components/whatsapp-chatbot';

export default function Home() {
  return (
    <LenisProvider>
      <main className='bg-background'>
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <ServicesCard />
        <StatsSection />
        <ContactSection />
        <FooterSection />
        <WhatsAppChatbot />
      </main>
    </LenisProvider>
  );
}
