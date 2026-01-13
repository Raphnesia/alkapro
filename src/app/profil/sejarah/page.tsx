// src/app/profil/sejarah/page.tsx
// Halaman sejarah singkat SMP dengan integrasi API backend dan layout lama

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useSejarah } from '@/hooks/useSejarah';
import { SejarahContent } from '@/components/SejarahContent';
import { SejarahLoading } from '@/components/SejarahLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { sejarahService } from '@/services/sejarahService';

export default function SejarahPage() {
  const { data, loading, error } = useSejarah();
  const { t } = useI18n();

  // Fallback data jika API belum tersedia
  const fallbackSettings = {
    title: 'Sejarah SMP Muhammadiyah Al Kautsar PK Kartasura',
    subtitle: 'Perjalanan panjang sekolah dalam membentuk generasi Islam berkualitas',
    banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
    banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
    title_panel_bg_color: 'bg-green-500',
    subtitle_panel_bg_color: 'bg-green-700',
    mobile_panel_bg_color: 'bg-green-600'
  };

  // Fallback content dengan layout lama
  const fallbackContent = [
    {
      id: 1,
      title: 'Sejarah Pendirian SMP Muhammadiyah Al Kautsar PK Kartasura',
      content: '<p>SMP Muhammadiyah Al Kautsar Program Khusus Kartasura didirikan pada tahun 2008 sebagai wujud kepedulian Muhammadiyah terhadap pendidikan Islam berkualitas di wilayah Kartasura dan sekitarnya. Sekolah ini merupakan pengembangan dari visi Muhammadiyah untuk menciptakan generasi Islam yang unggul dalam ilmu pengetahuan dan akhlak mulia.</p><p>Pada awal berdirinya, SMP Muhammadiyah Al Kautsar PK Kartasura hanya memiliki beberapa ruang kelas dengan jumlah siswa yang terbatas. Namun, berkat dedikasi para pendiri dan dukungan dari masyarakat, sekolah ini terus berkembang hingga menjadi salah satu lembaga pendidikan Islam terkemuka di Kabupaten Sukoharjo.</p><p>Nama "Al Kautsar" diambil dari salah satu surat dalam Al-Qur\'an yang bermakna "nikmat yang berlimpah". Hal ini mencerminkan harapan bahwa sekolah ini akan menjadi sumber keberkahan ilmu dan memberikan manfaat yang berlimpah bagi masyarakat.</p>',
      grid_type: 'grid-cols-1' as const,
      use_list_disc: false,
      list_items: null,
      background_color: 'bg-white',
      border_color: 'border-gray-100',
      order_index: 1,
      is_active: true,
      created_at: '',
      updated_at: ''
    },
    {
      id: 2,
      title: 'Tonggak Sejarah',
      content: '<p>Berikut adalah tonggak-tonggak penting dalam perjalanan SMP Muhammadiyah Al Kautsar PK Kartasura:</p>',
      grid_type: 'grid-cols-1' as const,
      use_list_disc: true,
      list_items: [
        { item: '2008 - Pendirian SMP Muhammadiyah Al Kautsar PK Kartasura' },
        { item: '2010 - Kelulusan angkatan pertama dengan prestasi gemilang' },
        { item: '2012 - Perluasan gedung dan fasilitas sekolah' },
        { item: '2015 - Pengembangan program khusus unggulan' },
        { item: '2018 - Perayaan 10 tahun dengan berbagai pencapaian' },
        { item: '2020 - Adaptasi pembelajaran di era pandemi' },
        { item: '2023 - Pengembangan kurikulum terintegrasi' }
      ],
      background_color: 'bg-gray-50',
      border_color: 'border-gray-200',
      order_index: 2,
      is_active: true,
      created_at: '',
      updated_at: ''
    },
    {
      id: 3,
      title: 'Perkembangan dan Pencapaian',
      content: '<p>Sejak didirikan, SMP Muhammadiyah Al Kautsar PK Kartasura telah mengalami berbagai perkembangan signifikan, baik dari segi infrastruktur, kualitas pendidikan, maupun prestasi yang diraih. Beberapa pencapaian penting dalam perjalanan sekolah kami antara lain:</p>',
      grid_type: 'grid-cols-1' as const,
      use_list_disc: false,
      list_items: null,
      background_color: 'bg-white',
      border_color: 'border-gray-100',
      order_index: 3,
      is_active: true,
      created_at: '',
      updated_at: ''
    },
    {
      id: 4,
      title: 'Bidang Akademik',
      content: '<p>Pencapaian dalam bidang akademik yang telah diraih sekolah:</p>',
      grid_type: 'grid-cols-2' as const,
      use_list_disc: true,
      list_items: [
        { item: 'Peningkatan nilai rata-rata ujian nasional setiap tahun' },
        { item: 'Berbagai prestasi dalam olimpiade sains tingkat kabupaten, provinsi, dan nasional' },
        { item: 'Pengembangan program literasi dan penelitian siswa' },
        { item: 'Kerjasama dengan berbagai institusi pendidikan tinggi' }
      ],
      background_color: 'bg-blue-50',
      border_color: 'border-blue-200',
      order_index: 4,
      is_active: true,
      created_at: '',
      updated_at: ''
    },
    {
      id: 5,
      title: 'Bidang Keislaman',
      content: '<p>Pencapaian dalam bidang keislaman:</p>',
      grid_type: 'grid-cols-2' as const,
      use_list_disc: true,
      list_items: [
        { item: 'Pengembangan program tahfidz Al-Qur\'an' },
        { item: 'Pembinaan karakter Islami melalui berbagai kegiatan' },
        { item: 'Prestasi dalam MTQ dan kompetisi keislaman lainnya' },
        { item: 'Pengembangan kurikulum terintegrasi nilai-nilai Islam' }
      ],
      background_color: 'bg-green-50',
      border_color: 'border-green-200',
      order_index: 5,
      is_active: true,
      created_at: '',
      updated_at: ''
    }
  ];

  if (loading) {
    return <SejarahLoading />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Gunakan data dari API backend
  const settings = data?.settings;
  const content = data?.content;

  // Jika tidak ada data dari API, tampilkan loading
  if (!settings || !content) {
    return <SejarahLoading />;
  }

  // Banner image
  const bannerImage = sejarahService.getBannerUrl(settings.banner_desktop);

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
              src={sejarahService.getBannerUrl(settings.banner_mobile)}
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
        <div className={`w-full bg-gradient-to-r from-${settings.mobile_panel_bg_color.replace('bg-', '')} to-${settings.mobile_panel_bg_color.replace('bg-', '').replace('-600', '-900')} py-4 md:hidden`}>
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
        <h1 className="text-3xl font-bold text-primary mb-6">Sejarah Singkat</h1>
        
        <div className="prose max-w-none">
          {/* Render content sections */}
          {content.map((section, index) => (
            <div key={section.id} className={`${section.background_color} rounded-lg shadow-lg p-6 mb-8 border ${section.border_color}`}>
              <h2 className="text-2xl font-semibold text-primary mb-4">{section.title}</h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <div 
                    dangerouslySetInnerHTML={{ __html: section.content }}
                    className="text-gray-800 leading-relaxed"
                  />
                </div>
                
                {section.use_list_disc && section.list_items && section.list_items.length > 0 && (
                  <div className="md:w-1/3">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-primary mb-2">Tonggak Sejarah</h3>
                      <ul className="list-disc pl-5 space-y-2 text-black">
                        {section.list_items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}