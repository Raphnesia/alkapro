// src/app/profil/ipm/page.tsx
// Halaman IPM dengan integrasi API backend dan struktur bidang kompleks

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useIPM } from '@/hooks/useIPM';
import { IPMLoading } from '@/components/IPMLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { ipmService, IPMSettings, IPMPengurus, IPMContent } from '@/services/ipmServiceNew';
import { BackendStatus } from '@/components/BackendStatus';
import { IPMCard } from '@/components/IPMCard';

export default function IPMPage() {
  const { data, loading, error } = useIPM();
  const { t } = useI18n();

  // Loading state
  if (loading) {
    return <IPMLoading />;
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
  let settings: IPMSettings | null, pengurus: IPMPengurus[], content: IPMContent[];
  const hasBackendData = !!(data?.settings || (data?.pengurus && data.pengurus.length > 0) || (data?.content && data.content.length > 0));
  const isBackendOnline = data !== null; // Backend merespons
  
  if (hasBackendData && data) {
    // Gunakan data dari API
    settings = data.settings;
    pengurus = data.pengurus || [];
    content = data.content || [];
  } else {
    // Fallback data untuk IPM
    settings = {
      id: 1,
      title: 'Ikatan Pelajar Muhammadiyah (IPM)',
      subtitle: 'Organisasi pelajar berbasis nilai Islam dan Kemuhammadiyahan',
      banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
      banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
      title_panel_bg_color: 'bg-gradient-to-r from-red-600 to-red-800',
      subtitle_panel_bg_color: 'bg-gradient-to-r from-red-700 to-red-900',
      mobile_panel_bg_color: 'bg-gradient-to-r from-red-700 to-red-800',
      is_active: true
    };
    
    pengurus = [
      {
        id: 1,
        position: 'Ketua IPM',
        name: 'Azka',
        photo: '/guru/611115.jpeg',
        kelas: 'IX A',
        description: 'Ketua IPM SMP Muhammadiyah Al Kautsar PK Kartasura',
        order_index: 1,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 2,
        position: 'Wakil Ketua',
        name: 'Nafisah',
        photo: '/guru/63a7b1894b3210d07e434e9d12170586.jpg',
        kelas: 'IX B',
        description: 'Wakil Ketua IPM SMP Muhammadiyah Al Kautsar PK Kartasura',
        order_index: 2,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 3,
        position: 'Sekretaris 1',
        name: 'Lovely',
        photo: '/guru/Annisa-Mayasari-S.Pd_.jpg',
        kelas: 'VIII A',
        description: 'Sekretaris 1 IPM SMP Muhammadiyah Al Kautsar PK Kartasura',
        order_index: 3,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 4,
        position: 'Sekretaris 2',
        name: 'Belva',
        photo: '/guru/Adam-Muttaqien-M.Si_.jpg',
        kelas: 'VIII B',
        description: 'Sekretaris 2 IPM SMP Muhammadiyah Al Kautsar PK Kartasura',
        order_index: 4,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 5,
        position: 'Bendahara',
        name: 'Danesha',
        photo: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
        kelas: 'IX C',
        description: 'Bendahara IPM SMP Muhammadiyah Al Kautsar PK Kartasura',
        order_index: 5,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ];
    
    content = [
      {
        id: 1,
        title: 'Struktur Organisasi IPM',
        content: 'Berikut adalah struktur organisasi IPM SMP Muhammadiyah Al Kautsar PK Kartasura:',
        grid_type: 'grid-cols-2',
        use_list_disc: true,
        list_items: null,
        bidang_structure: [
          {
            bidang_name: 'Bidang Organisasi',
            members: [
              { name: 'Yazid', position: 'Ketua Bidang' },
              { name: 'Natania', position: 'Anggota' },
              { name: 'Zifana Nur', position: 'Anggota' },
              { name: 'Nazneen', position: 'Anggota' },
              { name: 'Alya Hafidzah', position: 'Anggota' }
            ]
          },
          {
            bidang_name: 'Bidang Pengkaderan',
            members: [
              { name: 'Hanif', position: 'Ketua Bidang' },
              { name: 'Aya', position: 'Anggota' },
              { name: 'Shakila', position: 'Anggota' },
              { name: 'Khanza Dzakia', position: 'Anggota' },
              { name: 'Zifara', position: 'Anggota' },
              { name: 'Feyza', position: 'Anggota' }
            ]
          },
          {
            bidang_name: 'Bidang ASBO',
            members: [
              { name: 'Arvel', position: 'Ketua Bidang' },
              { name: 'Elsa', position: 'Anggota' },
              { name: 'Ghafa', position: 'Anggota' },
              { name: 'Yasmin Putri', position: 'Anggota' },
              { name: 'Husna', position: 'Anggota' },
              { name: 'Innara', position: 'Anggota' }
            ]
          },
          {
            bidang_name: 'Bidang PIP',
            members: [
              { name: 'Nada', position: 'Ketua Bidang' },
              { name: 'Sima', position: 'Anggota' },
              { name: 'Khansa Arsyla', position: 'Anggota' },
              { name: 'Valiqa', position: 'Anggota' },
              { name: 'Zifana', position: 'Anggota' },
              { name: 'Hafidzh Rafie', position: 'Anggota' }
            ]
          },
          {
            bidang_name: 'Bidang KDI',
            members: [
              { name: 'Farros', position: 'Ketua Bidang' },
              { name: 'Yasmin', position: 'Anggota' },
              { name: 'Nikeila', position: 'Anggota' },
              { name: 'Farhan', position: 'Anggota' }
            ]
          }
        ],
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
  const bannerImage = settings ? ipmService.getBannerUrl(settings.banner_desktop) : '/guru/Adam-Muttaqien-M.Si_.jpg';

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
              src={settings ? ipmService.getBannerUrl(settings.banner_mobile) : '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg'}
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
                    <div className={`${settings?.title_panel_bg_color || 'bg-gradient-to-r from-red-600 to-red-800'} inline-flex p-5`}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2">
                        {settings?.title || 'Ikatan Pelajar Muhammadiyah (IPM)'}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className={`${settings?.subtitle_panel_bg_color || 'bg-gradient-to-r from-red-700 to-red-900'} p-4 opacity-90 inline-flex rounded-b-lg`}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {settings?.subtitle || 'Organisasi pelajar berbasis nilai Islam dan Kemuhammadiyahan'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className={`w-full ${settings?.mobile_panel_bg_color || 'bg-gradient-to-r from-red-700 to-red-800'} py-4 md:hidden`}>
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className={`${settings?.title_panel_bg_color || 'bg-gradient-to-r from-red-600 to-red-800'} inline-flex p-3`}>
                <h1 className="text-lg font-bold text-white mb-0">
                  {settings?.title || 'Ikatan Pelajar Muhammadiyah (IPM)'}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className={`${settings?.subtitle_panel_bg_color || 'bg-gradient-to-r from-red-700 to-red-900'} mb-0 p-3 opacity-90 inline-flex`}>
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {settings?.subtitle || 'Organisasi pelajar berbasis nilai Islam dan Kemuhammadiyahan'}
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
          {/* IPM Content Sections */}
          {content && content.length > 0 && (
            <div className="prose prose-black max-w-none mb-12">
              {content.map((section: IPMContent, index: number) => (
                <div key={section.id} className={`${section.background_color} ${section.border_color} rounded-lg shadow-md p-6 mb-8`}>
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-1 bg-primary rounded-full mr-3"></div>
                    <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
                    <div className="w-16 h-1 bg-primary rounded-full ml-3"></div>
                  </div>
                  
                  {/* Content Description */}
                  {section.content && (
                    <div className="mb-6 text-black" dangerouslySetInnerHTML={{ __html: section.content }} />
                  )}
                  
                  {/* Struktur Bidang Kompleks */}
                  {section.use_list_disc && section.bidang_structure && (
                    <div className={`grid ${section.grid_type} gap-6`}>
                      {section.bidang_structure.map((bidang, bidangIndex) => (
                        <div key={bidangIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                          {/* Header Bidang */}
                          <div className="bg-red-600 text-white px-4 py-3">
                            <h3 className="font-semibold text-lg">{bidang.bidang_name}</h3>
                          </div>
                          
                          {/* Daftar Anggota */}
                          <div className="p-4">
                            <div className="space-y-2">
                              {bidang.members.map((member, memberIndex) => (
                                <div key={memberIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                  <div className="flex items-center">
                                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                      {memberIndex + 1}
                                    </span>
                                    <span className="font-medium text-black">{member.name}</span>
                                  </div>
                                  {member.position && (
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                      {member.position}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Legacy List Items (untuk backward compatibility) */}
                  {section.use_list_disc && section.list_items && !section.bidang_structure && (
                    <div className="space-y-3">
                      {section.list_items.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-black font-medium">{item.item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* IPM Pengurus Section */}
          {pengurus && pengurus.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">Pengurus IPM</h2>
              <div className="space-y-8">
                {pengurus.map((item: IPMPengurus, index: number) => (
                  <IPMCard 
                    key={item.id} 
                    pengurus={item} 
                    layout={index % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Fallback message jika tidak ada data */}
          {(!pengurus || pengurus.length === 0) && (!content || content.length === 0) && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data</h3>
                <p className="text-gray-600">
                  Data pengurus IPM dan konten belum tersedia. Silakan hubungi administrator untuk menambahkan data.
                </p>
              </div>
            </div>
          )}
        </ScrollReveal>
      </main>
    </div>
  );
}