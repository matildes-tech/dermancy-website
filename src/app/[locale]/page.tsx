import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTreatments } from '@/components/home/FeaturedTreatments';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { ThreeDTeaser } from '@/components/home/ThreeDTeaser';
import { AiWhatsAppSection } from '@/components/home/AiWhatsAppSection';
import { BookingCTA } from '@/components/home/BookingCTA';
import { MedicalOrganizationSchema } from '@/components/seo/MedicalOrganizationSchema';
import { PhysicianSchema } from '@/components/seo/PhysicianSchema';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MedicalOrganizationSchema />
      <PhysicianSchema />
      <HeroSection />
      <FeaturedTreatments />
      <PhilosophySection />
      <ThreeDTeaser />
      <AiWhatsAppSection />
      <BookingCTA />
    </>
  );
}
