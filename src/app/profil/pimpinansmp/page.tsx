'use client'

import React from 'react'
import { Header } from '@/components/Header'
import Image from 'next/image'
import { usePimpinanSMP } from '@/hooks/usePimpinanSMP'
import { PimpinanSMPCard } from '@/components/PimpinanSMPCard'
import { PimpinanSMPBoxes } from '@/components/PimpinanSMPBoxes'
import { PimpinanSMPLoading } from '@/components/PimpinanSMPLoading'
import { ErrorMessage } from '@/components/ErrorMessage'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useI18n } from '@/hooks/useI18n'


interface PimpinanSMPDetailProps {
  searchParams: { id?: string }
}

export default function PimpinanSMPDetail() {
  const { 
    settings, 
    pimpinan, 
    boxes, 
    isLoading, 
    error,
    groupedPimpinan,
    kepalaSekolah,
    wakilKepalaSekolah
  } = usePimpinanSMP();
  const { t } = useI18n()

  // Fallback data dengan terjemahan
  const fallbackData = {
    title: t('pimpinan.title'),
    subtitle: t('pimpinan.subtitle'),
    banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
    banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
    keunggulan_title: t('pimpinan.keunggulan_title'),
    keunggulan_subtitle: t('pimpinan.keunggulan_subtitle')
  };

  // Helper function untuk mengakses properti settings dengan fallback
  const getSettingValue = (key: keyof typeof fallbackData): string => {
    if (settings && settings[key as keyof typeof settings]) {
      return settings[key as keyof typeof settings] as string;
    }
    return fallbackData[key];
  };

  // Data untuk ditampilkan
  const displaySettings = {
    title: getSettingValue('title'),
    subtitle: getSettingValue('subtitle'),
    banner_desktop: getSettingValue('banner_desktop'),
    banner_mobile: getSettingValue('banner_mobile'),
    keunggulan_title: getSettingValue('keunggulan_title'),
    keunggulan_subtitle: getSettingValue('keunggulan_subtitle')
  };
  const displayPimpinan = pimpinan.length > 0 ? pimpinan : [];
  const displayBoxes = boxes.length > 0 ? boxes : [];

  const ShareButton = ({ icon, bg, size = 'normal' }: { icon: string; bg: string; size?: 'normal' | 'small' }) => (
    <button className={`${bg} text-white ${size === 'small' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'} rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}>
      {icon}
    </button>
  )

  // Loading state
  if (isLoading) {
    return <PimpinanSMPLoading />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="pt-0 flex-1">
          <ErrorMessage 
            message="Gagal memuat data pimpinan SMP" 
            details={error}
            onRetry={() => window.location.reload()}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* Banner dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-[80vh] h-64">
          {/* Desktop Image */}
          <Image 
            src={displaySettings.banner_desktop}
            alt="banner"
            fill
            className="object-cover object-center hidden md:block"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Mobile Image */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={displaySettings.banner_mobile}
              alt="banner"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
          
          {/* Overlay Content untuk Desktop - Posisi di kiri bawah */}
          <div className="absolute inset-0 hidden md:flex md:items-end md:justify-start">
            <div className="w-full md:w-1/2 bg-gradient-to-r from-black/60 via-black/40 to-transparent">
              <div className="container mx-auto px-8 pb-16">
                <div className="max-w-2xl">
                  {/* Title Panel */}
                  <ScrollReveal direction="up" delay={300} duration={800}>
                    <div className="block">
                      <div className="bg-green-500 inline-flex p-5 shadow-lg">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0 line-clamp-2">
                          {displaySettings.title}
                        </h1>
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  {/* Subtitle Panel */}
                  <ScrollReveal direction="up" delay={500} duration={800}>
                    <div className="bg-green-700 p-4 opacity-95 inline-flex rounded-b-lg shadow-lg mt-2">
                      <p className="text-white text-sm md:text-lg font-semibold mb-0">
                        {displaySettings.subtitle}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile */}
        <div className="w-full bg-gradient-to-r from-green-600 to-green-900 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <ScrollReveal direction="up" delay={200} duration={600}>
                <div className="bg-green-700 inline-flex p-3">
                  <h1 className="text-lg font-bold text-white mb-0">
                    {displaySettings.title}
                  </h1>
                </div>
              </ScrollReveal>
              
              {/* Subtitle Panel untuk Mobile */}
              <ScrollReveal direction="up" delay={400} duration={600}>
                <div className="bg-green-800 mb-0 p-3 opacity-90 inline-flex">
                  <div>
                    <p className="text-white text-xs font-semibold mb-0">
                      {displaySettings.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Meta Info untuk Mobile */}
            <ScrollReveal direction="up" delay={600} duration={600}>
              <div className="flex flex-wrap items-center gap-2 text-white/80 mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6">
                    <Image 
                      src="/pace.jpeg"
                      alt="Author"
                      fill
                      className="rounded-full object-cover"
                      sizes="24px"
                    />
                  </div>
                  <span>Tim Humas SMP</span>
                </div>
                <span>•</span>
                <span>17 Juli 2025</span>
                <span>•</span>
                <span>5 Menit untuk membaca</span>
              </div>
              
              {/* Share buttons untuk Mobile */}
              <div className="flex items-center gap-2 mt-3">
                <button className="bg-black text-white w-8 h-8 text-xs rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  𝕏
                </button>
                <button className="bg-[#1877F2] text-white w-8 h-8 text-xs rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  f
                </button>
                <button className="bg-[#0077B5] text-white w-8 h-8 text-xs rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  in
                </button>
                <button className="bg-gray-600 text-white w-8 h-8 text-xs rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  🔗
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Render Pimpinan Cards - Hanya tampilkan jika ada data dari API */}
        {displayPimpinan.length > 0 && (
          <div className="mt-0">
            {displayPimpinan.map((pimpinan, index) => (
              <PimpinanSMPCard
                key={pimpinan.id}
                pimpinan={pimpinan}
                layout={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        )}

        {/* Keunggulan Kepemimpinan Section */}
        <PimpinanSMPBoxes 
          boxes={displayBoxes}
          title={displaySettings.keunggulan_title}
          subtitle={displaySettings.keunggulan_subtitle}
        />
      </main>
    </div>
  )
}