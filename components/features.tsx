'use client';

import { Card } from '@/components/ui/card';
import { Receipt, Box, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';

export function Features() {
  const t = useTranslation();

  const features = [
    {
      icon: Receipt,
      titleKey: 'features.feature1_title',
      descKey: 'features.feature1_desc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Box,
      titleKey: 'features.feature2_title',
      descKey: 'features.feature2_desc',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      titleKey: 'features.feature3_title',
      descKey: 'features.feature3_desc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      titleKey: 'features.feature4_title',
      descKey: 'features.feature4_desc',
      color: 'from-orange-500 to-orange-600',
    },
  ];
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#0f4c3a] font-semibold text-sm uppercase tracking-wide">Core Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            {t('features.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed specifically for small business owners and entrepreneurs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border border-gray-200 hover:border-[#0f4c3a] bg-white p-8 rounded-xl transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {t(feature.descKey)}
                </p>

                {/* <div className="mt-6 pt-6 border-t border-gray-100">
                  <a href="#" className="text-[#0f4c3a] font-semibold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all">
                    Learn more →
                  </a>
                </div> */}
              </Card>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-20 bg-gradient-to-r from-[#0f4c3a] to-[#1a5f7a] rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">{t('features.banner_cost')}</p>
              <p className="text-white/80">Setup Cost</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{t('features.banner_trial')}</p>
              <p className="text-white/80">Free Trial</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{t('features.banner_unlimited')}</p>
              <p className="text-white/80">Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
