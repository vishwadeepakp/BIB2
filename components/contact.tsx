'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/lib/use-translation';

export function Contact() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert(t('contact.form_success'));
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">{t('contact.title')}</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="border border-border p-8 rounded-xl hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{t('contact.email_label')}</h3>
            <p className="text-muted-foreground mb-4">{t('contact.email_value')}</p>
            <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
          </Card>

          <Card className="border border-border p-8 rounded-xl hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{t('contact.phone_label')}</h3>
            <p className="text-muted-foreground mb-4">{t('contact.phone_value')}</p>
            <p className="text-sm text-muted-foreground">Mon-Fri, 9AM - 6PM IST</p>
          </Card>

          <Card className="border p-8 rounded-xl hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-[#1a5f7a]" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{t('contact.chat_label')}</h3>
            <p className="text-muted-foreground mb-4">{t('contact.chat_value')}</p>
            <p className="text-sm text-muted-foreground">Available on our website</p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="border p-8 rounded-xl hover:shadow-lg transition-all rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t('contact.form_name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t('contact.form_email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                {t('contact.form_message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
              >
                {t('contact.form_submit')}
              </Button>
              <p className="text-sm text-gray-600">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
