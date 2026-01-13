// src/app/profil/visi-misi/page.tsx
// Halaman Visi Misi dengan integrasi API backend

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useVisiMisi } from '@/hooks/useVisiMisi';
import { VisiMisiLoading } from '@/components/VisiMisiLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { visiMisiService } from '@/services/visiMisiServiceNew';
import { BackendStatus } from '@/components/BackendStatus';

export default function VisiMisiPage() {
  const { data, loading, error } = useVisiMisi();
  const { t } = useI18n();

  if (loading) {
    return <VisiMisiLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // GUNAKAN DATA JIKA CONTENT ADA, MESKIPUN SETTINGS NULL
  const settings = data?.settings;
  const content = data?.content ?? [];

  // Default settings jika null
  const defaultSettings = {
    title: 'Visi & Misi SMP Muhammadiyah Al Kautsar PK Kartasura',
    subtitle: 'Arah dan tujuan pendidikan Islam berkualitas',
    banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
    banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
    title_panel_bg_color: 'bg-green-500',
    subtitle_panel_bg_color: 'bg-green-700',
    mobile_panel_bg_color: 'bg-green-700',
  };

  // Gunakan settings dari API atau default
  const displaySettings = settings || defaultSettings;
  const isBackendOnline = content.length > 0;

  // Banner image
  const bannerImage = visiMisiService.getBannerUrl(displaySettings.banner_desktop);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackendStatus isOnline={isBackendOnline} />
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={bannerImage}
            alt="banner"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image - Height diperkecil untuk mobile */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={visiMisiService.getBannerUrl(displaySettings.banner_mobile)}
              alt="banner"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={75}
            />
          </div>
          
          {/* Overlay Content untuk Desktop */}
          <div className="absolute inset-0 hidden md:flex md:items-end">
            <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="container mx-auto px-8 pb-16">
                <div className="max-w-3xl">
                  {/* Title Panel */}
                  <div className="block">
                    <div className={`${displaySettings.title_panel_bg_color} inline-flex p-5`}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2">
                        {displaySettings.title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className={`${displaySettings.subtitle_panel_bg_color} p-4 opacity-90 inline-flex rounded-b-lg`}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {displaySettings.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className={`w-full ${displaySettings.mobile_panel_bg_color} py-4 md:hidden`}>
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className={`${displaySettings.title_panel_bg_color} inline-flex p-3`}>
                <h1 className="text-lg font-bold text-white mb-0">
                  {displaySettings.title}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className={`${displaySettings.subtitle_panel_bg_color} mb-0 p-3 opacity-90 inline-flex`}>
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {displaySettings.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Content Section */}
      <main className="flex-grow container mx-auto px-4 py-8 bg-white">
        <ScrollReveal>
          <div className="space-y-8">
            {content.map((section, index) => (
              <div 
                key={section.id} 
                className={`${section.background_color} ${section.border_color} rounded-lg p-6 border shadow-sm`}
              >
                                 <h2 className="text-2xl font-semibold mb-4 text-black">
                  {section.title}
                </h2>
                
                <div className={`grid ${section.grid_type} gap-6`}>
                  <div 
                    className="prose prose-black max-w-none text-black"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  
                  {section.use_list_disc && section.list_items && (
                    <ul className="list-disc pl-5 space-y-2 text-black">
                      {section.list_items.map((item, idx) => (
                        <li key={idx} className="text-black">
                          {item.item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}