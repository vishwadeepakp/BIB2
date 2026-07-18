'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const t = useTranslation();
  const router = useRouter();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-card border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t('hero.badge')}</span>
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                AI Makes Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Effortless</span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t('hero.subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                onClick={() => router.push('/register?tial=true')}
              >
                {t('hero.cta1')}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold"
              >
                {t('hero.cta2')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{t('hero.stats1')}</p>
                <p className="text-sm text-muted-foreground">{t('hero.stats1_label')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{t('hero.stats2')}</p>
                <p className="text-sm text-muted-foreground">{t('hero.stats2_label')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{t('hero.stats3')}</p>
                <p className="text-sm text-muted-foreground">{t('hero.stats3_label')}</p>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-1 shadow-2xl">
              <div className="bg-card rounded-xl p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">AI Invoice Scan</p>
                    <p className="text-3xl font-bold text-foreground">98.5%</p>
                    <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[98.5%] bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Voice Commands</p>
                    <p className="text-2xl font-bold text-foreground">2.3K</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">QR Scans</p>
                    <p className="text-2xl font-bold text-foreground">1.8K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-card rounded-xl shadow-xl p-4 max-w-sm border border-border">
              <p className="text-sm font-semibold text-foreground">Offline-First Sync</p>
              <p className="text-xs text-muted-foreground mt-1">Work offline, sync automatically</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
