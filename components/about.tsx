'use client';

import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';

export function About() {
  const t = useTranslation();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <div>
              <span className="text-[#0f4c3a] font-semibold text-sm uppercase tracking-wide">{t('about.title')}</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">
                {t('about.title')}
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.description')}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('about.value1')}</h3>
                  <p className="text-gray-600 text-sm">{t('about.value1_desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('about.value2')}</h3>
                  <p className="text-gray-600 text-sm">{t('about.value2_desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('about.value3')}</h3>
                  <p className="text-gray-600 text-sm">{t('about.value3_desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('about.value4')}</h3>
                  <p className="text-gray-600 text-sm">{t('about.value4_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 min-h-96 flex items-center justify-center">
              <div className="space-y-8 w-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0f4c3a] rounded-lg flex items-center justify-center text-white font-bold">
                      💼
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-1/2 mt-2"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#16a34a] rounded-lg flex items-center justify-center text-white font-bold">
                      📊
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-1/2 mt-2"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1a5f7a] rounded-lg flex items-center justify-center text-white font-bold">
                      ⚙️
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-1/2 mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
