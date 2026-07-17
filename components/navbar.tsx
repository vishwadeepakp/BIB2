'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { useTranslation } from '@/lib/use-translation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline group-hover:text-primary transition-colors">
            AIBiz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.features')}
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.pricing')}
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.contact')}
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sm"
            >
              {t('nav.login')}
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
              onClick={() => router.push('/register')}
            >
              {t('nav.register')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-3">
            <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground">
              {t('nav.features')}
            </Link>
            <Link href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">
              {t('nav.pricing')}
            </Link>
            <Link href="#contact" className="block text-sm text-muted-foreground hover:text-foreground">
              {t('nav.contact')}
            </Link>
            <div className="pt-3 border-t border-border flex gap-2">
              <Button variant="ghost" className="flex-1">
                {t('nav.login')}
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                {t('nav.register')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
