// src/app/profil/ekstrakurikuler/page.tsx
// Halaman Ekstrakurikuler dengan integrasi API backend

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useEkstrakurikuler } from '@/hooks/useEkstrakurikuler';
import { EkstrakurikulerLoading } from '@/components/EkstrakurikulerLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { ekstrakurikulerService, EkstrakurikulerSettings, EkstrakurikulerData } from '@/services/ekstrakurikulerService';
import { BackendStatus } from '@/components/BackendStatus';

export default function EkstrakurikulerPage() {
  const { data, loading, error } = useEkstrakurikuler();
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('Semua Ekstrakurikuler');
  const [filteredContent, setFilteredContent] = useState<EkstrakurikulerData[]>([]);

  // Initialize filtered content
  useEffect(() => {
    if (data?.content) {
      setFilteredContent(data.content);
    }
  }, [data?.content]);

  // Loading state
  if (loading) {
    return <EkstrakurikulerLoading />;
  }

  // Error state
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

  // Gunakan data dari API atau fallback data
  let settings: EkstrakurikulerSettings, content: EkstrakurikulerData[];
  const hasBackendData = !!(data?.settings || (data?.content && data.content.length > 0));
  const isBackendOnline = data !== null; // Backend merespons
  
  if (hasBackendData && data) {
    // Gunakan data dari API
    settings = data.settings || {
      id: 1,
      title: 'Ekstrakurikuler',
      subtitle: 'Temukan minat dan bakatmu melalui berbagai kegiatan ekstrakurikuler',
      banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
      banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
      title_panel_bg_color: 'bg-gradient-to-r from-blue-600 to-blue-800',
      subtitle_panel_bg_color: 'bg-gradient-to-r from-blue-700 to-blue-900',
      mobile_panel_bg_color: 'bg-gradient-to-r from-blue-700 to-blue-800',
      is_active: true
    };
    content = data.content || [];
  } else {
    // Fallback data untuk Ekstrakurikuler
    settings = {
      id: 1,
      title: 'Ekstrakurikuler',
      subtitle: 'Temukan minat dan bakatmu melalui berbagai kegiatan ekstrakurikuler',
      banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
      banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
      title_panel_bg_color: 'bg-gradient-to-r from-blue-600 to-blue-800',
      subtitle_panel_bg_color: 'bg-gradient-to-r from-blue-700 to-blue-900',
      mobile_panel_bg_color: 'bg-gradient-to-r from-blue-700 to-blue-800',
      is_active: true
    };
    
    content = [
      {
        id: 1,
        title: 'Sepak Bola',
        excerpt: 'Ekstrakurikuler sepak bola untuk mengembangkan kemampuan olahraga dan kerjasama tim.',
        image: '/guru/611115.jpeg',
        category: 'Olahraga',
        jadwal: 'Jumat 13.00-15.00',
        location: 'Lapangan Sekolah',
        pembina: 'Pak Ahmad',
        description: 'Deskripsi lengkap ekstrakurikuler sepak bola untuk mengembangkan kemampuan olahraga dan kerjasama tim.',
        order_index: 1,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 2,
        title: 'Tahfidz Al-Qur\'an',
        excerpt: 'Program menghafal Al-Qur\'an untuk mengembangkan kemampuan spiritual dan hafalan.',
        image: '/guru/63a7b1894b3210d07e434e9d12170586.jpg',
        category: 'Keagamaan',
        jadwal: 'Senin-Rabu 15.00-16.30',
        location: 'Masjid Sekolah',
        pembina: 'Ustadz Fauzi',
        description: 'Program menghafal Al-Qur\'an untuk mengembangkan kemampuan spiritual dan hafalan siswa.',
        order_index: 2,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 3,
        title: 'English Club',
        excerpt: 'Klub bahasa Inggris untuk meningkatkan kemampuan berkomunikasi dalam bahasa Inggris.',
        image: '/guru/Annisa-Mayasari-S.Pd_.jpg',
        category: 'Akademik',
        jadwal: 'Selasa-Kamis 14.00-15.30',
        location: 'Ruang Bahasa',
        pembina: 'Bu Sarah',
        description: 'Klub bahasa Inggris untuk meningkatkan kemampuan berkomunikasi dalam bahasa Inggris.',
        order_index: 3,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 4,
        title: 'Tari Tradisional',
        excerpt: 'Melestarikan budaya Indonesia melalui tarian tradisional dari berbagai daerah.',
        image: '/guru/Ardiansyah-Pratama-Putra-S.Sn_.jpg',
        category: 'Seni Budaya',
        jadwal: 'Jumat 15.00-17.00',
        location: 'Aula Sekolah',
        pembina: 'Bu Sari',
        description: 'Melestarikan budaya Indonesia melalui tarian tradisional dari berbagai daerah.',
        order_index: 4,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 5,
        title: 'Robotika',
        excerpt: 'Mengembangkan kemampuan teknologi dan robotika untuk masa depan.',
        image: '/guru/Bakhtiar-Fahmi-S.Sn_.jpg',
        category: 'Teknologi',
        jadwal: 'Sabtu 08.00-10.00',
        location: 'Lab Komputer',
        pembina: 'Pak Budi',
        description: 'Mengembangkan kemampuan teknologi dan robotika untuk masa depan.',
        order_index: 5,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 6,
        title: 'Basket',
        excerpt: 'Melatih kemampuan basket dan strategi permainan untuk kompetisi antar sekolah.',
        image: '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg',
        category: 'Olahraga',
        jadwal: 'Sabtu 13.00-15.00',
        location: 'Lapangan Basket',
        pembina: 'Bu Sarah',
        description: 'Melatih kemampuan basket dan strategi permainan untuk kompetisi antar sekolah.',
        order_index: 6,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ];
  }

  // Banner image
  const bannerImage = ekstrakurikulerService.getBannerUrl(settings.banner_desktop);

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'Semua Ekstrakurikuler') {
      setFilteredContent(content);
    } else {
      try {
        const result = await ekstrakurikulerService.getContentByCategory(category);
        if (result) {
          setFilteredContent(result);
        } else {
          setFilteredContent([]);
        }
      } catch (err) {
        console.error('Error filtering by category:', err);
        setFilteredContent([]);
      }
    }
  };

  // Get unique categories
  const categories = ['Semua Ekstrakurikuler', ...Array.from(new Set(content.map(item => item.category)))];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackendStatus isOnline={isBackendOnline} hasData={hasBackendData} />
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
              src={ekstrakurikulerService.getBannerUrl(settings.banner_mobile)}
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
                    <div className={`${settings.title_panel_bg_color} inline-flex p-5`}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2">
                        {settings.title}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className={`${settings.subtitle_panel_bg_color} p-4 opacity-90 inline-flex rounded-b-lg`}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {settings.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className={`w-full ${settings.mobile_panel_bg_color} py-4 md:hidden`}>
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className={`${settings.title_panel_bg_color} inline-flex p-3`}>
                <h1 className="text-lg font-bold text-white mb-0">
                  {settings.title}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className={`${settings.subtitle_panel_bg_color} mb-0 p-3 opacity-90 inline-flex`}>
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {settings.subtitle}
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
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Ekstrakurikuler Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <Image 
                    src={ekstrakurikulerService.getImageUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.excerpt}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>🕒 {item.jadwal}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>📍 {item.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>👨‍🏫 {item.pembina}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No data message */}
          {filteredContent.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tidak ada ekstrakurikuler dalam kategori ini.</p>
            </div>
          )}
        </ScrollReveal>
      </main>
    </div>
  );
}