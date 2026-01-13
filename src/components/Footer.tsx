'use client'

import React from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { useFooter } from '@/hooks/useNavigation'

interface FooterProps {
  marginTop?: string
}

const Footer: React.FC<FooterProps> = ({ marginTop = 'mt-0' }) => {
  const { footerData, loading: footerLoading } = useFooter()

  // Geometric decoration component
  const GeometricDecoration = () => (
    <div className="absolute top-0 right-0 left-0 flex justify-end lg:relative">
      <svg width="181" height="145" viewBox="0 0 181 145" fill="none" className="responsive-square">
        <rect x="93" width="88" height="88" fill="#22c55e" style={{fill: '#22c55e'}}/>
        <rect x="36" y="88" width="57" height="57" fill="#22c55e" style={{fill: '#22c55e'}}/>
        <rect y="52" width="36" height="36" fill="#86efac" style={{fill: '#86efac'}}/>
      </svg>
    </div>
  )

  // Render brand footer berdasarkan tipe
  const renderBrandFooter = () => {
    if (!footerData?.branding) {
      return (
        <span className="text-white font-semibold">
          SMP Muhammadiyah Al Kautsar PK Kartasura
        </span>
      );
    }

    const { branding } = footerData;
    
    if (branding.footer_brand_type === 'image' && branding.footer_brand_image) {
      return (
        <img 
          src={branding.footer_brand_image} 
          alt="Brand Footer"
          className="h-8"
        />
      );
    }
    
    return (
      <span className="text-white font-semibold">
        {branding.footer_brand_text || 'SMP Muhammadiyah Al Kautsar PK Kartasura'}
      </span>
    );
  };

  // Gunakan data dari API jika tersedia, fallback ke data statis
  const menuUtamaLinks = footerData?.links?.['menu-utama'] || [
    { id: 1, name: 'Home', href: '/', target: '_self' as const, order_index: 1 },
    { id: 2, name: 'Profil', href: '/profil', target: '_self' as const, order_index: 2 },
    { id: 3, name: 'Fasilitas', href: '/fasilitas', target: '_self' as const, order_index: 3 },
    { id: 4, name: 'Berita dan Artikel', href: '/berita-dan-artikel', target: '_self' as const, order_index: 4 },
    { id: 5, name: 'Kegiatan Sekolah', href: '/kegiatansekolah', target: '_self' as const, order_index: 5 },
    { id: 6, name: 'Portal ALKAPRO', href: 'https://alkapro.dsd.co.id/', target: '_blank' as const, order_index: 6 }
  ];

  const informasiAkademikLinks = footerData?.links?.['informasi-akademik'] || [
    { id: 7, name: 'Pimpinan SMP', href: '/profil/pimpinansmp', target: '_self' as const, order_index: 1 },
    { id: 8, name: 'Guru dan Tendik', href: '/profil/guru', target: '_self' as const, order_index: 2 },
    { id: 9, name: 'Struktur Organisasi', href: '/profil/struktur-organisasi', target: '_self' as const, order_index: 3 },
    { id: 10, name: 'Berita Sekolah', href: '/berita/list', target: '_self' as const, order_index: 4 },
    { id: 11, name: 'Artikel Sekolah', href: '/berita-dan-artikel/artikel-sekolah', target: '_self' as const, order_index: 5 },
    { id: 12, name: 'Alkapro Smart', href: 'https://alkapro.dsd.co.id/penilaian/', target: '_blank' as const, order_index: 6 }
  ];

  const sosialLinks = footerData?.links?.sosial || [
    { id: 13, name: 'Facebook', href: '#', target: '_blank' as const, order_index: 1 },
    { id: 14, name: 'Instagram', href: '#', target: '_blank' as const, order_index: 2 },
    { id: 15, name: 'Youtube', href: '#', target: '_blank' as const, order_index: 3 },
    { id: 16, name: 'Twitter', href: '#', target: '_blank' as const, order_index: 4 }
  ];

  const lainnyaLinks = footerData?.links?.lainnya || [];

  return (
    <footer className={`bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 text-white rounded-t-3xl ${marginTop} pt-16 relative z-20 overflow-hidden`}>
      {/* Geometric Decoration */}
      <GeometricDecoration />
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* School Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-quicksand mb-3">SMP Muhammadiyah Al Kautsar PK Kartasura</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Sekolah yang mengintegrasikan pendidikan akademik dengan nilai-nilai Islam untuk membentuk generasi yang berakhlak mulia dan berprestasi.
            </p>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-quicksand mb-3">Menu Utama</h3>
            <ul className="space-y-2">
              {menuUtamaLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-quicksand mb-3">Informasi Akademik</h3>
            <ul className="space-y-2">
              {informasiAkademikLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-quicksand mb-3">Kontak Kami</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="text-green-400 mt-1 flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <p className="text-blue-100 text-sm">
                  Jalan Cendana II RT 02 A RW III, Jl. Gempol, Gempol, Gumpang, Kec. Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57163<br />
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-green-400 flex-shrink-0">
                  <Phone size={14} />
                </div>
                <p className="text-blue-100 text-sm">
                  (022) 1234-5678
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-green-400 flex-shrink-0">
                  <Mail size={14} />
                </div>
                <p className="text-blue-100 text-sm">
                  info@alkapro.sch.id
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-green-400 mt-1 flex-shrink-0">
                  <Clock size={14} />
                </div>
                <div className="text-blue-100 text-sm">
                  <p>Senin - Kamis: 06:50 - 15:30</p>
                  <p>Jumat: 06:50 - 14:00</p>
                  <p>Sabtu: 06:50 - 11:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Bottom Decorative Element */}
        <div className="absolute lg:relative bottom-0 left-0 right-0">
          <img 
            alt="" 
            draggable="false" 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMiIGhlaWdodD0iOTMiIHZpZXdCb3g9IjAgMCA5MyA5MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeT0iMzYiIHdpZHRoPSI1NyIgaGVpZ2h0PSI1NyIgZmlsbD0iIzRBREM3RiIvPgo8cmVjdCB4PSI1NyIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBmaWxsPSIjOTBFRUIyIi8+Cjwvc3ZnPgo="
            className="fe-responsive-square bottom"
          />
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-700/50 relative z-20 bg-green-500">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <div className="text-white text-sm text-center md:text-left">
                {renderBrandFooter()}
              </div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                  Kebijakan Privasi
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                  Syarat & Ketentuan
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer