// src/app/profil/struktur-organisasi/page.tsx
// Halaman Struktur Organisasi dengan integrasi API backend dan struktur kompleks

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useStrukturOrganisasi } from '@/hooks/useStrukturOrganisasi';
import { StrukturOrganisasiLoading } from '@/components/StrukturOrganisasiLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { strukturOrganisasiService, StrukturOrganisasiSettings, StrukturOrganisasiData, StrukturOrganisasiContent } from '@/services/strukturOrganisasiService';
import { StrukturOrganisasiCard } from '@/components/StrukturOrganisasiCard';

export default function StrukturOrganisasiPage() {
  const { data, loading, error } = useStrukturOrganisasi();
  const { t } = useI18n();

  // Loading state
  if (loading) {
    return <StrukturOrganisasiLoading />;
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
  let settings: StrukturOrganisasiSettings | null, strukturOrganisasi: StrukturOrganisasiData[], content: StrukturOrganisasiContent[];
  const hasBackendData = !!(data?.settings || (data?.struktur_organisasi && data.struktur_organisasi.length > 0) || (data?.content && data.content.length > 0));
  const isBackendOnline = data !== null; // Backend merespons
  
  if (hasBackendData && data) {
    // Gunakan data dari API
    settings = data.settings;
    strukturOrganisasi = data.struktur_organisasi || [];
    content = data.content || [];
  } else {
    // Fallback data untuk Struktur Organisasi
    settings = {
      id: 1,
      title: 'Struktur Organisasi SMP Muhammadiyah Al Kautsar PK Kartasura',
      subtitle: 'Susunan organisasi pengelolaan sekolah yang efektif',
      banner_desktop: '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg',
      banner_mobile: '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg',
      title_panel_bg_color: 'bg-green-500',
      subtitle_panel_bg_color: 'bg-green-700',
      mobile_panel_bg_color: 'bg-green-700',
      is_active: true
    };
    
    strukturOrganisasi = [
      {
        id: 1,
        position: 'Kepala Sekolah',
        name: 'Drs. Mahmud Hasni, M.Pd.',
        photo: '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg',
        description: 'Bertanggung jawab atas keseluruhan pengelolaan dan pengembangan sekolah.',
        order_index: 1,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 2,
        position: 'Wakil Kepala Sekolah Bidang Kurikulum',
        name: 'Annisa Mayasari, S.Pd.',
        photo: '/guru/Annisa-Mayasari-S.Pd_.jpg',
        description: 'Bertanggung jawab dalam pengembangan dan implementasi kurikulum sekolah.',
        order_index: 2,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 3,
        position: 'Wakil Kepala Sekolah Bidang Kesiswaan',
        name: 'Ardiansyah Pratama Putra, S.Sn.',
        photo: '/guru/Ardiansyah-Pratama-Putra-S.Sn_.jpg',
        description: 'Bertanggung jawab dalam pembinaan dan pengembangan kegiatan kesiswaan.',
        order_index: 3,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 4,
        position: 'Wakil Kepala Sekolah Bidang Sarana Prasarana',
        name: 'Bakhtiar Fahmi, S.Sn.',
        photo: '/guru/Bakhtiar-Fahmi-S.Sn_.jpg',
        description: 'Bertanggung jawab dalam pengelolaan dan pengembangan sarana dan prasarana sekolah.',
        order_index: 4,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 5,
        position: 'Wakil Kepala Sekolah Bidang Humas',
        name: 'Cindy Trisnawati, S.Pd, M.Pd.',
        photo: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
        description: 'Bertanggung jawab dalam menjalin hubungan dengan masyarakat dan stakeholder sekolah.',
        order_index: 5,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 6,
        position: 'Kepala Tata Usaha',
        name: 'Devy Estu Anna Putri, S.T., M.Pd.',
        photo: '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg',
        description: 'Bertanggung jawab dalam pengelolaan administrasi dan keuangan sekolah.',
        order_index: 6,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ];
    
    content = [
      {
        id: 1,
        title: 'Struktur Organisasi Sekolah',
        content: 'Berikut adalah struktur organisasi SMP Muhammadiyah Al Kautsar PK Kartasura:',
        grid_type: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', // Responsive grid
        use_list_disc: true,
        list_items: null,
        bidang_structure: [
          {
            bidang_name: 'Kepemimpinan',
            members: [
              { name: 'Drs. Mahmud Hasni, M.Pd.', position: 'Kepala Sekolah' },
              { name: 'Annisa Mayasari, S.Pd.', position: 'Wakil Kepala Sekolah' },
              { name: 'Ardiansyah Pratama Putra, S.Sn.', position: 'Wakil Kepala Sekolah' }
            ]
          },
          {
            bidang_name: 'Bagian Administrasi',
            members: [
              { name: 'Devy Estu Anna Putri, S.T., M.Pd.', position: 'Kepala Tata Usaha' },
              { name: 'Cindy Trisnawati, S.Pd, M.Pd.', position: 'Wakil Kepala Sekolah Bidang Humas' },
              { name: 'Bakhtiar Fahmi, S.Sn.', position: 'Wakil Kepala Sekolah Bidang Sarana Prasarana' }
            ]
          },
          {
            bidang_name: 'Bagian Kurikulum',
            members: [
              { name: 'Annisa Mayasari, S.Pd.', position: 'Wakil Kepala Sekolah Bidang Kurikulum' },
              { name: 'Guru Matematika', position: 'Koordinator Mata Pelajaran' },
              { name: 'Guru IPA', position: 'Koordinator Mata Pelajaran' },
              { name: 'Guru Bahasa', position: 'Koordinator Mata Pelajaran' }
            ]
          }
        ],
        display_type: 'bagan',
        background_color: 'bg-white',
        border_color: 'border-gray-200',
        order_index: 1,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ];
  }

  // Banner image
  const bannerImage = settings ? strukturOrganisasiService.getBannerUrl(settings.banner_desktop) : '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg';

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
              src={settings ? strukturOrganisasiService.getBannerUrl(settings.banner_mobile) : '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg'}
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
                    <div className={`${settings?.title_panel_bg_color || 'bg-green-500'} inline-flex p-5`}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2">
                        {settings?.title || 'Struktur Organisasi SMP Muhammadiyah Al Kautsar PK Kartasura'}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className={`${settings?.subtitle_panel_bg_color || 'bg-green-700'} p-4 opacity-90 inline-flex rounded-b-lg`}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {settings?.subtitle || 'Susunan organisasi pengelolaan sekolah yang efektif'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className={`w-full ${settings?.mobile_panel_bg_color || 'bg-green-700'} py-4 md:hidden`}>
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className={`${settings?.title_panel_bg_color || 'bg-green-500'} inline-flex p-3`}>
                <h1 className="text-lg font-bold text-white mb-0">
                  {settings?.title || 'Struktur Organisasi SMP Muhammadiyah Al Kautsar PK Kartasura'}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className={`${settings?.subtitle_panel_bg_color || 'bg-green-700'} mb-0 p-3 opacity-90 inline-flex`}>
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {settings?.subtitle || 'Susunan organisasi pengelolaan sekolah yang efektif'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Content Section */}
      <main className="flex-grow container mx-auto px-4 py-8 bg-white">
        {/* Struktur Organisasi Section - Fixed visibility issues */}
        {strukturOrganisasi && strukturOrganisasi.length > 0 && (
          <div className="w-full">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center opacity-100 visible">
              Struktur Organisasi
            </h2>
            <div className="space-y-8 w-full opacity-100 visible">
              {strukturOrganisasi.map((item: StrukturOrganisasiData, index: number) => (
                <div key={item.id} className="w-full opacity-100 visible">
                  <StrukturOrganisasiCard 
                    struktur={item} 
                    layout={index % 2 === 0 ? 'left' : 'right'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback message jika tidak ada data */}
        {(!strukturOrganisasi || strukturOrganisasi.length === 0) && (!content || content.length === 0) && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data</h3>
              <p className="text-gray-600">
                Data struktur organisasi belum tersedia. Silakan hubungi administrator untuk menambahkan data.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}