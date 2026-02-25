// src/components/FacilityBanner.tsx
// Komponen banner untuk fasilitas

import React from 'react';
import Image from 'next/image';
import { FacilitySettings, SubFacilitySettings } from '@/services/facilityService';

interface FacilityBannerProps {
  settings: FacilitySettings | SubFacilitySettings;
  isSubFacility?: boolean;
}

export const FacilityBanner: React.FC<FacilityBannerProps> = ({ 
  settings, 
  isSubFacility = false 
}) => {
  if (!settings) {
    return null;
  }

  return (
    <>
      {/* IMG dengan Overlay untuk Desktop */}
      <div className="relative w-full md:h-screen h-64">
        {/* Desktop Image */}
        <Image 
          src={settings.banner_desktop || '/placeholder.jpg'}
          alt="Fasilitas Sekolah"
          fill
          className="object-cover hidden md:block"
          priority
          sizes="100vw"
          quality={75}
        />
        {/* Mobile Image - Height diperkecil untuk mobile */}
        <div className="relative w-full h-full md:hidden">
          <Image 
            src={settings.banner_mobile || '/placeholder.jpg'}
            alt="Fasilitas Sekolah"
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
                  <div className={`${settings.title_panel_bg_color || 'bg-gradient-to-r from-blue-600 to-blue-800'} inline-flex p-5`}>
                    <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2" style={{ fontFamily: 'Philosopher, serif' }}>
                      {settings.title || 'Fasilitas Sekolah'}
                    </h1>
                  </div>
                </div>
                
                {/* Subtitle Panel */}
                <div className={`${settings.subtitle_panel_bg_color || 'bg-gradient-to-r from-blue-700 to-blue-900'} p-4 opacity-90 inline-flex rounded-b-lg`}>
                  <p className="text-white text-sm md:text-lg font-semibold mb-0">
                    {settings.subtitle || 'Fasilitas lengkap untuk mendukung kegiatan belajar mengajar'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
      <div className={`w-full ${settings.title_panel_bg_color || 'bg-gradient-to-r from-blue-700 to-blue-800'} py-4 md:hidden`}>
        <div className="container mx-auto px-4">
          <div className="block">
            {/* Title Panel untuk Mobile */}
            <div className={`${settings.title_panel_bg_color || 'bg-gradient-to-r from-blue-600 to-blue-800'} inline-flex p-3`}>
              <h1 className="text-lg font-bold text-white mb-0" style={{ fontFamily: 'Philosopher, serif' }}>
                {settings.title || 'Fasilitas Sekolah'}
              </h1>
            </div>
            
            {/* Subtitle Panel untuk Mobile */}
            <div className={`${settings.subtitle_panel_bg_color || 'bg-gradient-to-r from-blue-700 to-blue-900'} mb-0 p-3 opacity-90 inline-flex`}>
              <div>
                <p className="text-white text-xs font-semibold mb-0">
                  {settings.subtitle || 'Fasilitas lengkap untuk mendukung kegiatan belajar mengajar'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};