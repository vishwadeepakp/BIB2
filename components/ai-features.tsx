'use client';

import { Card } from '@/components/ui/card';
import { Mic, FileText, QrCode, Smartphone, Zap, Brain } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';

export function AIFeatures() {
  const t = useTranslation();

  const features = [
    {
      icon: Mic,
      titleKey: 'features.feature1_title',
      descKey: 'features.feature1_desc',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: FileText,
      titleKey: 'features.feature2_title',
      descKey: 'features.feature2_desc',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: FileText,
      titleKey: 'features.feature3_title',
      descKey: 'features.feature3_desc',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: QrCode,
      titleKey: 'features.feature4_title',
      descKey: 'features.feature4_desc',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Smartphone,
      titleKey: 'features.feature5_title',
      descKey: 'features.feature5_desc',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: Brain,
      titleKey: 'features.feature6_title',
      descKey: 'features.feature6_desc',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
    },
  ];

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Everything MSMEs Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intelligent tools designed specifically for small businesses that work smarter, not harder
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border border-border hover:border-primary/50 bg-card p-8 rounded-xl transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`w-14 h-14 rounded-lg ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descKey)}
                </p>

                {/* <div className="mt-6 pt-6 border-t border-border">
                  <a href="#" className="text-primary font-semibold text-sm hover:text-primary/80 inline-flex items-center gap-1 transition-all">
                    Learn more →
                  </a>
                </div> */}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
