'use client';

import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AIFeatures } from '@/components/ai-features';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export function PageWrapper() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AIFeatures />
      <Contact />
      <Footer />
    </main>
  );
}
