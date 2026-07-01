import { HomeHero } from '@/components/sections/home-hero';
import {
  CorporateIntro,
  DisclosedAgentFramework,
  AudienceSplit,
} from '@/components/sections/home-content';

export default function Home() {
  return (
    <>
      <HomeHero />
      <CorporateIntro />
      <DisclosedAgentFramework />
      <AudienceSplit />
    </>
  );
}
