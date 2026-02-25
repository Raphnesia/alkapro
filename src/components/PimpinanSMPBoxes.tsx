// src/components/PimpinanSMPBoxes.tsx
// Komponen untuk menampilkan box keunggulan kepemimpinan dengan layout 6 box grid

import React from 'react';
import Image from 'next/image';
import { PimpinanSMPBox } from '@/services/pimpinanSMPService';
import { ScrollReveal } from './ScrollReveal';
import { useI18n } from '@/hooks/useI18n';

interface PimpinanSMPBoxesProps {
  boxes: PimpinanSMPBox[];
  title?: string;
  subtitle?: string;
}

// Fungsi untuk mengkonversi background_color dari backend ke CSS class atau style
function getBackgroundStyle(backgroundColor: string) {
  const colorMap: Record<string, string> = {
    'green-600': '#059669',
    'green-700': '#047857',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'purple-600': '#9333ea',
    'purple-700': '#7c3aed',
    'red-600': '#dc2626',
    'red-700': '#b91c1c',
    'yellow-600': '#ca8a04',
    'yellow-700': '#a16207',
    'indigo-600': '#4f46e5',
    'indigo-700': '#4338ca',
    'pink-600': '#db2777',
    'pink-700': '#be185d',
    'gray-600': '#4b5563',
    'gray-700': '#374151'
  };

  return {
    backgroundColor: colorMap[backgroundColor] || colorMap['green-600']
  };
}

// Fungsi untuk mendapatkan icon color berdasarkan background
function getIconColor(backgroundColor: string) {
  const iconColorMap: Record<string, string> = {
    'green-600': '#059669',
    'green-700': '#047857',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'purple-600': '#9333ea',
    'purple-700': '#7c3aed',
    'red-600': '#dc2626',
    'red-700': '#b91c1c',
    'yellow-600': '#ca8a04',
    'yellow-700': '#a16207',
    'indigo-600': '#4f46e5',
    'indigo-700': '#4338ca',
    'pink-600': '#db2777',
    'pink-700': '#be185d',
    'gray-600': '#4b5563',
    'gray-700': '#374151'
  };

  return iconColorMap[backgroundColor] || iconColorMap['green-600'];
}

export function PimpinanSMPBoxes({ boxes }: PimpinanSMPBoxesProps) {
  const { t } = useI18n();
  
  // Fallback data dengan terjemahan - 6 box untuk grid layout
  const fallbackBoxes: PimpinanSMPBox[] = [
    {
      id: 1,
      title: t('pimpinan.keunggulan_title'),
      description: 'Tim pimpinan yang handal dan berpengalaman dalam mengelola sekolah dengan visi yang jelas dan misi yang terukur.',
      icon: '👨‍🏫',
      image: '/guru/Adam-Muttaqien-M.Si_.jpg',
      background_color: '#10B981',
      order_index: 1
    },
    {
      id: 2,
      title: 'Visi Pendidikan',
      description: 'Mengembangkan pendidikan berkualitas dengan nilai-nilai Islami untuk membentuk generasi yang unggul dalam prestasi dan berakhlak mulia.',
      icon: '🎯',
      image: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
      background_color: '#3B82F6',
      order_index: 2
    },
    {
      id: 3,
      title: 'Inovasi Pembelajaran',
      description: 'Menerapkan metode pembelajaran yang inovatif dan teknologi terkini untuk meningkatkan kualitas pendidikan siswa.',
      icon: '💡',
      image: '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg',
      background_color: '#8B5CF6',
      order_index: 3
    },
    {
      id: 4,
      title: 'Kepemimpinan Berkarakter',
      description: 'Membangun kepemimpinan yang berkarakter kuat dengan integritas tinggi dan komitmen terhadap pendidikan.',
      icon: '⭐',
      image: '/guru/Ade-Nugraha-S.Sn_.jpg',
      background_color: '#F59E0B',
      order_index: 4
    },
    {
      id: 5,
      title: 'Pengembangan SDM',
      description: 'Fokus pada pengembangan sumber daya manusia yang berkualitas untuk mendukung kemajuan sekolah.',
      icon: '👥',
      image: '/guru/Ardiansyah-Pratama-Putra-S.Sn_.jpg',
      background_color: '#EF4444',
      order_index: 5
    },
    {
      id: 6,
      title: 'Akreditasi Unggul',
      description: 'Mencapai standar akreditasi unggul dengan kualitas pendidikan yang terjamin dan terukur.',
      icon: '🏆',
      image: '/guru/Bakhtiar-Fahmi-S.Sn_.jpg',
      background_color: '#6366F1',
      order_index: 6
    }
  ];

  // Gunakan boxes dari API atau fallback
  const displayBoxes = boxes.length > 0 ? boxes : fallbackBoxes;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Section */}
        <ScrollReveal direction="up" delay={200} duration={600}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {t('pimpinan.keunggulan_title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('pimpinan.keunggulan_subtitle')}
            </p>
          </div>
        </ScrollReveal>
        
        {/* 6 Box Grid Layout */}
        <ScrollReveal direction="up" delay={300} duration={600}>
          <div className="flex flex-wrap bg-blue-600 rounded-lg overflow-hidden shadow-xl">
            {/* Box 1 - Text */}
            <div className="w-1/2 lg:w-1/3 order-1 lg:order-1 p-1 sm:p-2 md:p-3 lg:p-4 text-center text-white flex items-center hover:bg-blue-700 transition-colors">
              <div className="w-full py-2 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-2 md:px-3 lg:px-3 text-white">
                <div className="w-12 h-12 mx-auto mb-2 text-2xl">
                  {displayBoxes[0]?.icon || '👨‍🏫'}
                </div>
                <span className="text-xl font-bold block">{displayBoxes[0]?.title || 'Kepemimpinan'}</span>
                <p className="mt-2 md:mt-3 text-sm font-semibold">{displayBoxes[0]?.description || 'Tim pimpinan yang handal dan berpengalaman.'}</p>
              </div>
            </div>

            {/* Box 2 - Image */}
            <div className="w-1/2 lg:w-1/3 order-3 lg:order-2 h-64 relative">
              <Image 
                src={displayBoxes[0]?.image || '/guru/Adam-Muttaqien-M.Si_.jpg'}
                alt={displayBoxes[0]?.title || 'Kepemimpinan'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>

            {/* Box 3 - Text */}
            <div className="w-1/2 lg:w-1/3 order-5 lg:order-3 p-1 sm:p-2 md:p-3 lg:p-4 text-center text-white flex items-center hover:bg-blue-700 transition-colors">
              <div className="w-full py-2 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-2 md:px-3 lg:px-3 text-white">
                <div className="w-12 h-12 mx-auto mb-2 text-2xl">
                  {displayBoxes[1]?.icon || '🎯'}
                </div>
                <span className="text-xl font-bold block">{displayBoxes[1]?.title || 'Visi Pendidikan'}</span>
                <p className="mt-2 md:mt-3 text-sm font-semibold">{displayBoxes[1]?.description || 'Mengembangkan pendidikan berkualitas dengan nilai-nilai Islami.'}</p>
              </div>
            </div>

            {/* Box 4 - Image */}
            <div className="w-1/2 lg:w-1/3 order-2 lg:order-4 h-64 relative">
              <Image 
                src={displayBoxes[1]?.image || '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg'}
                alt={displayBoxes[1]?.title || 'Visi Pendidikan'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>

            {/* Box 5 - Text */}
            <div className="w-1/2 lg:w-1/3 order-4 lg:order-5 p-1 sm:p-2 md:p-3 lg:p-4 text-center text-white bg-green-500 flex items-center hover:bg-yellow-500 transition-colors">
              <div className="w-full py-2 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-2 md:px-3 lg:px-3 text-white">
                <div className="w-12 h-12 mx-auto mb-2 text-2xl">
                  {displayBoxes[2]?.icon || '💡'}
                </div>
                <span className="text-xl font-bold block">{displayBoxes[2]?.title || 'Inovasi Pembelajaran'}</span>
                <p className="mt-2 md:mt-3 text-sm font-semibold">{displayBoxes[2]?.description || 'Menerapkan metode pembelajaran yang inovatif dan teknologi terkini.'}</p>
              </div>
            </div>

            {/* Box 6 - Image */}
            <div className="w-1/2 lg:w-1/3 order-6 lg:order-6 h-64 relative">
              <Image 
                src={displayBoxes[2]?.image || '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg'}
                alt={displayBoxes[2]?.title || 'Inovasi Pembelajaran'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Additional 3 Boxes for Mobile Grid */}
        <ScrollReveal direction="up" delay={500} duration={600}>
          <div className="mt-8 lg:hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayBoxes.slice(3, 6).map((box, index) => {
                const backgroundStyle = getBackgroundStyle(box.background_color);
                const iconColor = getIconColor(box.background_color);
                
                return (
                  <ScrollReveal 
                    key={`mobile-${box.id}`}
                    direction="up" 
                    delay={600 + (index * 100)} 
                    duration={500}
                  >
                    <div 
                      className="rounded-lg p-4 text-white text-center shadow-lg"
                      style={backgroundStyle}
                    >
                      <div className="w-10 h-10 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
                        <span 
                          className="text-lg font-bold"
                          style={{ color: iconColor }}
                        >
                          {box.icon}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mb-2">{box.title}</h3>
                      <p className="text-xs opacity-90">{box.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
} 