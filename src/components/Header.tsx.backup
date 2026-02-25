'use client'

import { useState, useEffect, useRef } from 'react'
import { SearchIcon, GridIcon, ChevronDownIcon, IndonesiaFlag, GreatBritainFlag, SaudiArabiaFlag } from './Icons'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useI18n } from '@/hooks/useI18n'
import { useHeader } from '@/hooks/useNavigation'
import { gsap } from 'gsap'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { t } = useI18n()
  const { headerData, loading: headerLoading } = useHeader()
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeTrackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !marqueeTrackRef.current || !headerData?.marquee || headerData.marquee.length === 0) return

    // Reset GSAP animation
    gsap.set(marqueeTrackRef.current, { xPercent: 0 })
    
    // Calculate duration based on speed
    const getDuration = (speed: string) => {
      switch (speed) {
        case 'slow': return 20
        case 'fast': return 10
        default: return 15
      }
    }
    
    // Use first marquee item speed or default
    const duration = getDuration(headerData.marquee[0]?.speed || 'normal')
    
    tweenRef.current = gsap.to(marqueeTrackRef.current, {
      xPercent: -50,
      duration: duration,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [mounted, headerData?.marquee])

  const handleMarqueeEnter = () => tweenRef.current?.pause()
  const handleMarqueeLeave = () => tweenRef.current?.resume()

  // Gunakan data dari API jika tersedia, fallback ke data statis
  const menuItems = headerData?.menu && headerData.menu.length > 0 
    ? headerData.menu.map(item => ({
        name: item.name,
        href: item.href,
        dropdown: item.dropdown || []
      }))
    : [
        { 
          name: t('header.home'), 
          href: '/',
          dropdown: []
        },
        { 
          name: t('header.about'), 
          href: '/profil',
          dropdown: [
            { name: t('pimpinan.title'), href: '/profil/pimpinansmp' },
            { name: 'Guru dan Tendik', href: '/profil/guru' },
            { name: 'Sejarah Singkat', href: '/profil/sejarah' },
            { name: 'Visi Misi', href: '/profil/visi-misi' },
            { name: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
            { name: 'IPM', href: '/profil/ipm' },
            { name: 'Ekstrakurikuler', href: '/profil/ekstrakurikuler' },
            { name: 'Hisbul Wathan', href: '/profil/hisbul-wathan' } // Tambahkan Hisbul Wathan
          ]
        },
        { 
          name: 'Fasilitas', 
          href: '/fasilitas',
          dropdown: []
        },
        { 
          name: 'Program Khusus', 
          href: '/program-khusus',
          dropdown: [
            { name: 'Tahfidz', href: '/program-khusus/tahfidz' },
            { name: 'ICT', href: '/program-khusus/ict' }
          ]
        },
        { 
          name: t('header.news'), 
          href: '/berita-dan-artikel',
          dropdown: [
            { name: 'Berita Sekolah', href: '/berita/list' },
            { name: 'Artikel Sekolah', href: '/berita-dan-artikel/artikel-sekolah' }
          ]
        },
        { 
          name: 'Kegiatan Sekolah', 
          href: '/kegiatansekolah',
          dropdown: []
        },
        { 
          name: 'Fitur', 
          href: '#',
          dropdown: [
            { name: 'Portal ALKAPRO', href: 'https://alkapro.dsd.co.id/' },
            { name: 'Information Management', href: 'https://sim-alkapro.dsd.co.id/' },
            { name: 'Golden Habits', href: 'https://alkapro.dsd.co.id/gobit/' },
            { name: 'Informasi Keuangan', href: 'https://alkapro.dsd.co.id/siku/' },
            { name: 'Alkapro Digital Ebook', href: 'https://ebook-alkapro.dsd.co.id/' },
            { name: 'Alkapro Smart', href: 'https://alkapro.dsd.co.id/penilaian/' },
            { name: 'Alkapro Smart CBT', href: 'http://alkautsarcbt.com/' },
            { name: 'SIKAP System', href: 'https://smpam.site/sikap/' }
          ]
        }
      ]

  // Debug: Log data yang diterima dari API
  console.log('🔍 Header Data from API:', headerData)
  console.log('🔍 Menu Items (API vs Fallback):', {
    hasApiData: !!headerData?.menu,
    apiMenuLength: headerData?.menu?.length || 0,
    fallbackMenuLength: menuItems.length,
    usingFallback: !headerData?.menu || headerData.menu.length === 0
  })

  // Marquee data dari API atau fallback
  const marqueeData = headerData?.marquee && headerData.marquee.length > 0 
    ? headerData.marquee 
    : [
        {
          text: "Selamat datang di SMP Al-Kautsar",
          color: "#ffffff",
          speed: "normal"
        },
        {
          text: "Mendidik dengan Hati, Membentuk Karakter Islami",
          color: "#ffffff",
          speed: "normal"
        },
        {
          text: "Portal Informasi Terdepan untuk Masa Depan Cemerlang",
          color: "#ffffff",
          speed: "normal"
        }
      ]

  if (!mounted) {
    return (
      <header className="position-sticky top-0 w-full z-50">
        <div className="bg-primary text-white py-3">
          <div className="container mx-auto px-4 fe-wrapper">
            <div className="flex items-center gap-4">
              <div className="w-10 h-7 bg-gray-300 rounded-sm animate-pulse"></div>
              <div className="w-10 h-7 bg-gray-300 rounded-sm animate-pulse"></div>
              <div className="w-10 h-7 bg-gray-300 rounded-sm animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="bg-primary border-b-4 border-orange-400">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">K</span>
                </div>
              </div>
              <div className="w-64 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header 
      className="fe-kautsar-header position-sticky top-0 w-full z-50 bg-opacity-80 font-quicksand"
    >
      {/* Top Navigation Bar - Language Flags and Marquee */}
      <div className="fe-wrapper text-white bg-primary top-navigations">
        <div className="container mx-auto px-8 flex justify-between items-center py-3 min-w-0">
          <div className="flex items-center gap-1">
            {/* Language Switcher */}
            <LanguageSwitcher variant="dark" />
          </div>

          {/* Marquee modern dengan data dari API */}
          <div className="flex-1 mx-8 min-w-0">
            <div
              onMouseEnter={handleMarqueeEnter}
              onMouseLeave={handleMarqueeLeave}
              className="relative w-full overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5"
            >
              <div
                ref={marqueeTrackRef}
                className="flex items-center whitespace-nowrap gap-10 will-change-transform shrink-0"
              >
                {/* Grup 1 */}
                <div className="flex items-center gap-10">
                  {marqueeData.map((item, index) => (
                    <span 
                      key={`group1-${index}`}
                      className="text-sm text-white/90 flex items-center gap-2"
                      style={{ color: item.color }}
                    >
                      <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="12"/>
                      </svg>
                      {item.text}
                    </span>
                  ))}
                </div>

                {/* Grup 2 (duplikasi untuk loop mulus) */}
                <div className="flex items-center gap-10" aria-hidden="true">
                  {marqueeData.map((item, index) => (
                    <span 
                      key={`group2-${index}`}
                      className="text-sm text-white/90 flex items-center gap-2"
                      style={{ color: item.color }}
                    >
                      <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="12"/>
                      </svg>
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Separator Line */}
      <div className="w-full bg-white" style={{ height: '1px' }}></div>
      {/* Main Header with Logo and Navigation */}
      <div className="bg-primary fe-kautsar-header-wrapper fe-kautsar-header-border-bottom border-secondary row mx-0 fe-wrapper no-wrapper-non-desktop border-white" style={{ borderBottomWidth: '0.5px' }}>
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="fe-kautsar-header-logo">
                <a href="/" className="flex items-center gap-4">
                  {headerData?.branding?.header_logo ? (
                    <img 
                      src={headerData.branding.header_logo} 
                      alt="Logo Sekolah"
                      className="h-16 w-auto"
                    />
                  ) : (
                    <span className="text-white font-bold text-2xl">KAUTSAR</span>
                  )}
                </a>
              </div>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav className="fe-kautsar-menu position-relative hidden xl:inline-flex flex-wrap items-stretch">
              <ul className="flex items-center space-x-10">
                {menuItems.map((item) => (
                  <li 
                    key={item.name} 
                    className="fe-kautsar-menu-item relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={item.href}
                      className="text-white hover:text-gray-200 font-semibold transition-colors text-base relative block"
                      style={{ fontWeight: 600 }}
                    >
                      {item.name}
                      {item.dropdown.length > 0 && (
                        <ChevronDownIcon className={`w-3 h-3 ml-1 inline transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                      
                      {/* Yellow underline animation */}
                      <div className={`absolute bottom-0 left-0 h-1 bg-yellow-400 transition-all duration-300 ease-out ${
                        activeDropdown === item.name ? 'w-full' : 'w-0'
                      }`}></div>
                    </a>
                    
                    {/* Dropdown Menu */}
                    {item.dropdown.length > 0 && (
                      <div className={`absolute top-full left-0 mt-0 w-64 bg-white shadow-lg rounded-b-lg border-t-4 border-yellow-400 transition-all duration-300 ease-out transform ${
                        activeDropdown === item.name 
                          ? 'opacity-100 translate-y-0 visible' 
                          : 'opacity-0 -translate-y-2 invisible'
                      }`}>
                        <div className="py-2">
                          {item.dropdown.map((dropdownItem, index) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-primary transition-colors duration-200 border-b border-gray-100 last:border-b-0 dropdown-item"
                              style={{
                                animationDelay: `${index * 50}ms`
                              }}
                            >
                              {dropdownItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Info PPDB and Actions */}
            <div className="flex items-center gap-4">
              {/* Info PPDB Button */}
              <div className="fe-ppdb-info hidden sm:flex">
                <a 
                  href="/info-ppdb"
                  className="bg-white text-primary px-4 py-2 text-sm font-bold hover:bg-opacity-90 transition-colors rounded-sm shadow-sm flex items-center gap-2"
                >
                  <span>Info PPDB</span>
                </a>
              </div>

              {/* Mobile Info PPDB */}
              <div className="fe-ppdb-toggle sm:hidden">
                <a 
                  href="/info-ppdb"
                  className="text-white p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors text-xs font-semibold"
                >
                  PPDB
                </a>
              </div>

              {/* Grid/Apps Icon */}
              <div className="fe-more-item">
                <div className="fe-more-item-icon">
                  <button className="text-white p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors">
                    <GridIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="xl:hidden text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors border border-white/20 hover:border-white/40"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <div className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}></div>
                  <div className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-primary border-t border-gray-600">
          <div className="container mx-auto px-4 py-4">
            {/* Debug Info untuk Mobile */}
            <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
              <strong>🔍 Mobile Menu Debug:</strong> {menuItems.length} menu items loaded
            </div>
            
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <div key={item.name} className="relative">
                  {/* Main Menu Item */}
                  <div 
                    className="text-white hover:text-gray-200 font-semibold text-base py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-white/20"
                    onClick={() => {
                      if (item.dropdown.length > 0) {
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      } else {
                        window.location.href = item.href;
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    <span className="flex items-center gap-3">
                      {/* Icon untuk setiap menu */}
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {item.name}
                    </span>
                    {item.dropdown.length > 0 && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown.length > 0 && activeDropdown === item.name && (
                    <div className="bg-white rounded-lg mt-2 ml-6 shadow-lg border border-gray-200 overflow-hidden mobile-dropdown-enter">
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem, index) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-primary transition-colors duration-200 border-b border-gray-100 last:border-b-0 mobile-dropdown-item flex items-center gap-3"
                            style={{
                              animationDelay: `${index * 50}ms`
                            }}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {/* Icon untuk dropdown item */}
                            <div className="w-4 h-4 bg-yellow-100 rounded-full flex items-center justify-center">
                              <svg className="w-2 h-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile PPDB Button */}
              <div className="pt-4 border-t border-white/20">
                <a 
                  href="/info-ppdb"
                  className="block w-full bg-white text-primary px-4 py-3 text-center font-bold hover:bg-opacity-90 transition-colors rounded-lg shadow-sm"
                >
                  📚 Info PPDB
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}