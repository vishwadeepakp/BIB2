'use client';

import Link from 'next/link';
import { Store } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';

export function Footer() {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-green-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-[#0f4c3a]" />
              </div>
              <span className="font-bold text-lg">BusinessHub</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.features')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          {/* <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Twitter
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                LinkedIn
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
