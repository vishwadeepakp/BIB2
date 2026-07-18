'use client';

import { HeroSection } from '@/components/hero-section';
import { AIFeatures } from '@/components/ai-features';
import { Contact } from '@/components/contact';


export function PageWrapper() {

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <AIFeatures />
      <Contact />
    </main>
  );
}
