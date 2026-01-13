'use client'

import { useState, useEffect, useRef } from 'react'
import { SearchIcon, GridIcon, ChevronDownIcon, IndonesiaFlag, GreatBritainFlag, SaudiArabiaFlag } from './Icons'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useI18n } from '@/hooks/useI18n'
import { useHeader } from '@/hooks/useNavigation'
import { gsap } from 'gsap'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  

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
            { name: 'Tapak Suci', href: '/profil/tapak-suci' },
            { name: 'Hizbul Wathan', href: '/profil/hizbul-wathan' }
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
                  <span>Info PSB 25/26</span>
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

              {/* Grid/Apps Icon with Dropdown */}
              <div 
                className="fe-more-item relative"
                onMouseEnter={() => setIsMoreMenuOpen(true)}
                onMouseLeave={() => setIsMoreMenuOpen(false)}
              >
                <div className="fe-more-item-icon">
                  <button 
                    className="text-white p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  >
                    <GridIcon className="w-4 h-4" />
                  </button>
                </div>
                

                
                {/* Modern Dropdown Menu */}
                {isMoreMenuOpen && (
                  <div className="fe-more-item-dropdown absolute top-full right-0 mt-2 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden backdrop-blur-sm w-80 md:w-80 sm:w-72 xs:w-64 max-w-[90vw]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 md:px-6 md:py-4">
                      <h3 className="text-white font-semibold text-base md:text-lg">Menu Navigasi</h3>
                      <p className="text-blue-100 text-xs md:text-sm mt-1">Akses cepat ke semua halaman</p>
                    </div>
                    
                    {/* Navigation Menu from Navbar */}
                    <div className="max-h-80 md:max-h-96 overflow-y-auto">
                      {menuItems.map((item, index) => (
                        <div key={item.name} className="border-b border-gray-50 last:border-b-0">
                          <div className="px-3 py-3 md:px-6 md:py-4 hover:bg-gray-50 transition-colors duration-200">
                            <a 
                              href={item.href}
                              className="flex items-center justify-between group"
                            >
                              <div className="flex items-center space-x-2 md:space-x-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    {index === 0 && (
                                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    )}
                                    {index === 1 && (
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    )}
                                    {index === 2 && (
                                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                                    )}
                                    {index === 3 && (
                                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    )}
                                    {index === 4 && (
                                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                    )}
                                    {index === 5 && (
                                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    )}
                                    {index >= 6 && (
                                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    )}
                                  </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                    {item.name}
                                  </h4>
                                  {item.dropdown.length > 0 && (
                                    <p className="text-xs md:text-sm text-gray-500">{item.dropdown.length} sub menu</p>
                                  )}
                                </div>
                              </div>
                              {item.dropdown.length > 0 && (
                                <ChevronDownIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                              )}
                            </a>
                            
                            {/* Sub Menu */}
                            {item.dropdown.length > 0 && (
                              <div className="mt-2 md:mt-3 ml-6 md:ml-13 space-y-1">
                                {item.dropdown.map((subItem) => (
                                  <a
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                  >
                                    {subItem.name}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

            
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <div key={`${item.name}-${index}`} className="relative">
                  {/* Main Menu Item */}
                  <div 
                    className="text-white hover:text-gray-200 font-semibold text-base py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-white/20 touch-manipulation"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (item.dropdown && item.dropdown.length > 0) {
                        const newActiveDropdown = activeDropdown === item.name ? null : item.name;
                        setActiveDropdown(newActiveDropdown);
                      } else {
                        window.location.href = item.href;
                        setIsMenuOpen(false);
                      }
                    }}
                    onTouchStart={(e) => {
                      // Ensure touch events work properly on mobile
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <span className="flex items-center gap-3">
                      {/* Dynamic Icon untuk setiap menu */}
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        {item.name === 'Beranda' || item.name.includes('Home') ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                        ) : item.name === 'Profil' || item.name.includes('About') ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        ) : item.name === 'Fasilitas' ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        ) : item.name === 'Program Khusus' ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : item.name.includes('Berita') || item.name.includes('News') ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                          </svg>
                        ) : item.name === 'Kegiatan Sekolah' ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        ) : item.name === 'Fitur' ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{item.name}</span>
                      {item.dropdown && item.dropdown.length > 0 && (
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {item.dropdown.length}
                        </span>
                      )}
                    </span>
                    {item.dropdown && item.dropdown.length > 0 && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                  
                  {/* Mobile Dropdown - Enhanced */}
                  {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.name && (
                    <div className="bg-white rounded-lg mt-2 shadow-lg border border-gray-200 overflow-hidden mobile-dropdown-enter" style={{position: 'absolute', left: '16px', right: '16px', width: 'auto', maxWidth: '400px', margin: '0 auto', zIndex: 1000}}>
                      {/* Dropdown Header */}
                      <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 text-sm font-semibold">
                        {item.name} ({item.dropdown.length} items)
                      </div>
                      
                      <div className="py-1 max-h-80 overflow-y-auto">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <a
                            key={`${dropdownItem.name}-${dropdownIndex}`}
                            href={dropdownItem.href}
                            target={dropdownItem.href.startsWith('http') ? "_blank" : "_self"}
                            rel={dropdownItem.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-primary transition-colors duration-200 border-b border-gray-100 last:border-b-0 mobile-dropdown-item flex items-center gap-3"
                            style={{
                              animationDelay: `${dropdownIndex * 50}ms`
                            }}
                            onClick={() => {
                              // Don't close menu immediately for external links
                              if (!dropdownItem.href.startsWith('http')) {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }
                            }}
                          >
                            {/* Enhanced Icon untuk dropdown item */}
                            <div className="w-5 h-5 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              {dropdownItem.name.includes('Pimpinan') ? (
                                <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              ) : dropdownItem.name.includes('Guru') ? (
                                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                              ) : dropdownItem.name.includes('Sejarah') ? (
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                              ) : dropdownItem.name.includes('Visi') ? (
                                <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                              ) : dropdownItem.name.includes('Struktur') ? (
                                <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                              ) : dropdownItem.name.includes('IPM') ? (
                                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : dropdownItem.name.includes('Ekstrakurikuler') ? (
                                <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                              ) : dropdownItem.name.includes('Tapak Suci') ? (
                                <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : dropdownItem.name.includes('Hizbul') || dropdownItem.name.includes('Wathan') ? (
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">{dropdownItem.name}</div>
                              {dropdownItem.href.startsWith('http') && (
                                <div className="text-xs text-gray-500 truncate">External Link</div>
                              )}
                            </div>
                            {dropdownItem.href.startsWith('http') && (
                              <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                              </svg>
                            )}
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
