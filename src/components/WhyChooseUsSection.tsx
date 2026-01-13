'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/hooks/useI18n'
import { homeApi, HomeSection } from '@/lib/api'
import { translateIfNeeded } from '@/lib/translate'

type WhyFeature = { number?: string; title: string; image?: string; description?: string }
type WhyInitial = { title?: string; subtitle?: string; description?: string; features?: WhyFeature[] }

const WhyChooseUsSection = ({ initial }: { initial?: WhyInitial }) => {
  const { t, currentLocale } = useI18n();
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [sectionHeight, setSectionHeight] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const scrollTotalRef = useRef<number>(0)
  const progressRef = useRef<number>(0) // 0..1 progres geser horizontal
  const speedRef = useRef<number>(0.0009) // akan diubah sesuai breakpoint
  const easeRef = useRef<number>(0.15) // smoothing progres (0..1)
  const mobileScaleRef = useRef<number>(1) // skala tambahan untuk memperlambat di mobile
  const stepCapRef = useRef<number>(120) // batas delta per frame agar tidak lompat
  const progressTargetRef = useRef<number>(0)
  const END_PAD_RATIO_MOBILE = 0.08
  const END_PAD_RATIO_DESKTOP = 0.12

  // Fallback features (i18n)
  const defaultFeatures = [
    {
      number: '[01]',
      title: t('why_choose_us.features.character.title'),
      image: '/img-2835-1-688d24f0c925c438072c5b22.png',
      description: t('why_choose_us.features.character.description')
    },
    {
      number: '[02]',
      title: t('why_choose_us.features.facilities.title'),
      image: '/images(6).png',
      description: t('why_choose_us.features.facilities.description')
    },
    {
      number: '[03]',
      title: t('why_choose_us.features.teachers.title'),
      image: '/perpustakaan-sekolah.webp',
      description: t('why_choose_us.features.teachers.description')
    },
    {
      number: '[04]',
      title: t('why_choose_us.features.programs.title'),
      image: '/kelasku.jpeg',
      description: t('why_choose_us.features.programs.description')
    }
  ]

  // Backend-driven state
  const [backendTitle, setBackendTitle] = useState<string | null>(initial?.title ?? null)
  const [backendSubtitle, setBackendSubtitle] = useState<string | null>(initial?.subtitle ?? null)
  const [backendDescription, setBackendDescription] = useState<string | null>(initial?.description ?? null)
  const [apiFeatures, setApiFeatures] = useState<Array<{ number: string; title: string; image?: string; description?: string }>>(
    (initial?.features || []).map((it, idx) => ({
      number: it.number || `[${String(idx + 1).padStart(2, '0')}]`,
      title: it.title,
      image: it.image,
      description: it.description,
    }))
  )

  // Sinkronkan state jika parent mengirim initial (termasuk update setelah load)
  useEffect(() => {
    if (!initial) return
    ;(async () => {
      const target = currentLocale
      setBackendTitle(await translateIfNeeded(initial.title || null, target) || null)
      setBackendSubtitle(await translateIfNeeded(initial.subtitle || null, target) || null)
      setBackendDescription(await translateIfNeeded(initial.description || null, target) || null)
      if (Array.isArray(initial.features)) {
        const mapped = await Promise.all(initial.features.map(async (it, idx) => ({
          number: it.number || `[${String(idx + 1).padStart(2, '0')}]`,
          title: await translateIfNeeded(it.title, target) || '',
          image: it.image,
          description: await translateIfNeeded(it.description, target) || '',
        })))
        setApiFeatures(mapped)
      }
    })()
  }, [initial])

  // Fetch Why Choose Us section dari komponen hanya jika parent TIDAK memberikan initial
  useEffect(() => {
    if (initial) return // parent supply -> jangan fetch dari komponen
    let mounted = true
    ;(async () => {
      try {
        const types = ['why_choose_us', 'why-choose-us', 'whychooseus']
        // request semua variasi sekaligus; pilih yang paling cepat berisi data
        const results = await Promise.allSettled(types.map(tp => homeApi.byType(tp)))
        const picked = results.find(r => r.status === 'fulfilled' && Array.isArray(r.value) && r.value.length)
        const section: HomeSection | null = picked ? ((picked as PromiseFulfilledResult<HomeSection[]>).value[0] as HomeSection) : null
        if (!mounted || !section) return
        const cfg: any = (section as any).config_data || {}

        // Helper: convert HTML to plain text (for content)
        const htmlToText = (html?: string | null): string => {
          if (!html) return ''
          try {
            const div = document.createElement('div')
            div.innerHTML = html
            return (div.textContent || div.innerText || '').trim()
          } catch {
            return html.replace(/<[^>]*>/g, ' ').trim()
          }
        }

        // Title: pakai field root title atau cfg.title
        const topTitle = (section as any)?.title || ''
        const topContentText = htmlToText((section as any)?.content || '')
        setBackendTitle(topTitle || cfg.title || null)
        // Subtitle: hanya dari cfg.subtitle (jika ada)
        setBackendSubtitle(cfg.subtitle || null)
        // Description: gunakan CONTENT (plain text) sebagai prioritas
        setBackendDescription(topContentText || cfg.description || cfg.desc || null)
        const items: any[] = Array.isArray(cfg.features) ? cfg.features
          : Array.isArray(cfg.reasons) ? cfg.reasons
          : Array.isArray(cfg.items) ? cfg.items
          : []
        if (items.length) {
          const mapped = items.map((it, idx) => ({
            number: it?.number || `[${String(idx + 1).padStart(2, '0')}]`,
            title: it?.title || it?.name || '',
            image: it?.image || it?.icon || it?.icon_upload || undefined,
            description: it?.description || it?.desc || ''
          }))
          setApiFeatures(mapped)
        }
      } catch (_) { /* silent */ }
    })()
    return () => { mounted = false }
  }, [])

  const features = apiFeatures.length ? apiFeatures : defaultFeatures

  // Title/subtitle/description resolver
  const sectionTitle = backendTitle || t('why_choose_us.title')
  const sectionSubtitle = backendSubtitle || t('why_choose_us.subtitle')
  const sectionDescription = backendDescription || t('why_choose_us.description')

  // Deteksi mobile dan set parameter animasi yang lebih pelan
  useEffect(() => {
    const handle = () => {
      const mobile = window.innerWidth <= 1024 // perlakukan tablet sebagai mobile gesture
      setIsMobile(mobile)
      // Parameter berbeda untuk mobile vs desktop (mobile diperlambat)
      speedRef.current = mobile ? 0.000100 : 0.0012
      easeRef.current = mobile ? 0.20 : 0.15
      stepCapRef.current = mobile ? 20 : 240
    }
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const computeSizes = () => {
      const endPadRatio = isMobile ? END_PAD_RATIO_MOBILE : END_PAD_RATIO_DESKTOP
      const endPad = Math.max(32, Math.round(window.innerWidth * endPadRatio))

      let totalTranslateX = 0
      if (isMobile) {
        // Mobile: hanya geser cards, title diam
        const cards = cardsRef.current
        const title = titleRef.current
        if (!cards || !title) return
        const cardsVisible = cards.clientWidth
        const cardsW = cards.scrollWidth
        totalTranslateX = Math.max(0, cardsW - cardsVisible + endPad)
        // Reset transform; gunakan scrollLeft untuk mobile
        content.style.transform = 'none'
        cards.style.transform = 'none'
        const scrollLeft = progressRef.current * totalTranslateX
        cards.scrollLeft = scrollLeft
      } else {
        // Desktop: geser keseluruhan konten (title + cards)
        const contentWidth = content.scrollWidth
        totalTranslateX = Math.max(0, contentWidth - window.innerWidth + endPad)
        const x = -progressRef.current * totalTranslateX
        content.style.transform = `translate3d(${x}px, 0, 0)`
        // pastikan cards transform nol agar tidak double-apply
        const cards = cardsRef.current
        if (cards) cards.style.transform = 'translate3d(0,0,0)'
      }

      scrollTotalRef.current = totalTranslateX
      setSectionHeight(window.innerHeight)
    }

    const clamp = (val: number, min = 0, max = 1) => Math.max(min, Math.min(max, val))
    let rafId = 0
    const applyProgress = () => {
      if (rafId) cancelAnimationFrame(rafId)
      const tick = () => {
        const target = progressTargetRef.current
        const current = progressRef.current
        const next = current + (target - current) * easeRef.current
        const done = Math.abs(target - next) < (isMobile ? 0.001 : 0.0005)
        progressRef.current = done ? target : next
        const x = -progressRef.current * scrollTotalRef.current
        if (!isMobile) {
          content.style.transform = `translate3d(${x}px, 0, 0)`
        } else {
          const cards = cardsRef.current
          if (cards) {
            cards.scrollLeft = progressRef.current * scrollTotalRef.current
          }
        }
        if (!done) {
          rafId = window.requestAnimationFrame(tick)
        } else {
          rafId = 0
        }
      }
      rafId = window.requestAnimationFrame(tick)
    }

    const inViewport = () => {
      const rect = section.getBoundingClientRect()
      // Anggap aktif jika ada overlap antara section dan viewport
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const onWheel = (e: WheelEvent) => {
      if (!inViewport()) return
      const delta = e.deltaY
      const atStart = progressTargetRef.current <= 0 && delta < 0
      const atEnd = progressTargetRef.current >= 1 && delta > 0
      if (!atStart && !atEnd) {
        e.preventDefault()
        const absDelta = Math.min(stepCapRef.current, Math.abs(delta))
        // Desktop: gunakan delta langsung; Mobile: gunakan normalisasi
        const base = isMobile ? (absDelta / Math.max(1, window.innerHeight)) : absDelta
        const edgeDamping = (progressTargetRef.current > 0.85 || progressTargetRef.current < 0.15) ? 0.7 : 1
        let step = base * speedRef.current * edgeDamping
        if (isMobile) step *= mobileScaleRef.current
        const signed = delta > 0 ? step : -step
        let next = progressTargetRef.current + signed
        // Snap ke ujung jika sudah mendekati
        const snapHigh = isMobile ? 0.995 : 0.98
        const snapLow = isMobile ? 0.005 : 0.02
        if (next > snapHigh) next = 1
        if (next < snapLow) next = 0
        progressTargetRef.current = clamp(next)
        applyProgress()
      }
    }

    let touchStartY = 0
    let touchStartX = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!inViewport()) return
      const currentY = e.touches[0].clientY
      const currentX = e.touches[0].clientX
      const deltaY = touchStartY - currentY
      const deltaX = touchStartX - currentX
      // Only convert vertical intent; if user swipes left/right (horizontal), biarkan native scroll (scrollLeft)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return
      }
      const delta = deltaY
      const atStart = progressTargetRef.current <= 0 && delta < 0
      const atEnd = progressTargetRef.current >= 1 && delta > 0
      if (!atStart && !atEnd) {
        e.preventDefault()
        const absDelta = Math.min(stepCapRef.current, Math.abs(delta))
        // Mobile: normalisasi terhadap tinggi viewport supaya stabil di berbagai device
        const base = absDelta / Math.max(1, window.innerHeight)
        const edgeDamping = (progressTargetRef.current > 0.85 || progressTargetRef.current < 0.15) ? 0.7 : 1
        let step = base * speedRef.current * edgeDamping
        step *= mobileScaleRef.current
        const signed = delta > 0 ? step : -step
        let next = progressTargetRef.current + signed
        const snapHighT = isMobile ? 0.995 : 0.98
        const snapLowT = isMobile ? 0.005 : 0.02
        if (next > snapHighT) next = 1
        if (next < snapLowT) next = 0
        progressTargetRef.current = clamp(next)
        applyProgress()
      }
    }

    const onResize = () => {
      computeSizes()
      applyProgress()
    }

    computeSizes()
    // Aktifkan kontrol sesuai device; untuk mobile, pasang listener pada elemen section & cards
    if (isMobile) {
      // Di mobile: intercept vertical scroll menjadi horizontal shift
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
    } else {
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onResize)
 
    return () => {
      if (isMobile) {
        section.removeEventListener('touchstart', onTouchStart)
        section.removeEventListener('touchmove', onTouchMove)
        const cardsEl = cardsRef.current
        if (cardsEl) {
          cardsEl.removeEventListener('touchstart', onTouchStart)
          cardsEl.removeEventListener('touchmove', onTouchMove)
        }
      } else {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
      }
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isMobile, currentLocale])

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-8 md:py-12 touch-auto md:touch-auto overscroll-contain md:overscroll-auto select-none md:select-auto"
      style={{ background: 'linear-gradient(to bottom right, #013220, #228B22)', height: sectionHeight || '100vh' }}
    >
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.06]">
        {/* Traditional Islamic Star Pattern (Khatam) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="islamic-star-why" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* 8-pointed Islamic star (Khatam) */}
                <g transform="translate(50,50)">
                  <polygon 
                    points="0,-30 8,-8 30,0 8,8 0,30 -8,8 -30,0 -8,-8"
                    fill="currentColor"
                    className="text-white"
                  />
                  <polygon 
                    points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white"
                  />
                </g>
                
                {/* Corner Islamic elements */}
                <g transform="translate(15,15)">
                  <polygon 
                    points="0,-10 4,-4 10,0 4,4 0,10 -4,4 -10,0 -4,-4"
                    fill="currentColor"
                    className="text-white"
                  />
                </g>
                <g transform="translate(85,15)">
                  <polygon 
                    points="0,-10 4,-4 10,0 4,4 0,10 -4,4 -10,0 -4,-4"
                    fill="currentColor"
                    className="text-white"
                  />
                </g>
                <g transform="translate(15,85)">
                  <polygon 
                    points="0,-10 4,-4 10,0 4,4 0,10 -4,4 -10,0 -4,-4"
                    fill="currentColor"
                    className="text-white"
                  />
                </g>
                <g transform="translate(85,85)">
                  <polygon 
                    points="0,-10 4,-4 10,0 4,4 0,10 -4,4 -10,0 -4,-4"
                    fill="currentColor"
                    className="text-white"
                  />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-star-why)"/>
          </svg>
        </div>

        {/* Islamic Geometric Tessellation */}
        <div className="absolute top-0 right-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="islamic-tessellation" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Traditional Islamic geometric tessellation */}
                <g transform="translate(40,40)">
                  {/* Central cross motif */}
                  <path 
                    d="M-25,0 L-12,-12 L0,0 L12,-12 L25,0 L12,12 L0,0 L-12,12 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white"
                  />
                  {/* Inner Islamic pattern */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-white"/>
                  <circle cx="0" cy="0" r="6" fill="currentColor" className="text-white"/>
                  
                  {/* 4 corner decorative elements */}
                  <circle cx="-20" cy="-20" r="3" fill="currentColor" className="text-white"/>
                  <circle cx="20" cy="-20" r="3" fill="currentColor" className="text-white"/>
                  <circle cx="-20" cy="20" r="3" fill="currentColor" className="text-white"/>
                  <circle cx="20" cy="20" r="3" fill="currentColor" className="text-white"/>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-tessellation)"/>
          </svg>
        </div>

        {/* Islamic Calligraphy-inspired Flowing Pattern */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="islamic-flow" x="0" y="0" width="140" height="60" patternUnits="userSpaceOnUse">
                {/* Flowing lines inspired by Arabic calligraphy */}
                <path 
                  d="M0,30 Q35,10 70,30 Q105,50 140,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-white"
                />
                <path 
                  d="M0,30 Q35,50 70,30 Q105,10 140,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  className="text-white"
                />
                
                {/* Decorative dots (like Arabic diacritics) */}
                <circle cx="35" cy="20" r="1.5" fill="currentColor" className="text-white"/>
                <circle cx="105" cy="40" r="1.5" fill="currentColor" className="text-white"/>
                <circle cx="70" cy="25" r="1" fill="currentColor" className="text-white"/>
                <circle cx="20" cy="35" r="1" fill="currentColor" className="text-white"/>
                <circle cx="120" cy="25" r="1" fill="currentColor" className="text-white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-flow)" opacity="0.7"/>
          </svg>
        </div>

        {/* Traditional Islamic Interlacing (Girih) Pattern */}
        <div className="absolute inset-0 transform rotate-12">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="islamic-girih-why" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Traditional Girih interlacing */}
                <g transform="translate(60,60)">
                  {/* Interlocking geometric shapes */}
                  <path 
                    d="M-40,0 Q-25,-25 0,-25 Q25,-25 40,0 Q25,25 0,25 Q-25,25 -40,0 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-white"
                  />
                  <path 
                    d="M0,-40 Q25,-25 25,0 Q25,25 0,40 Q-25,25 -25,0 Q-25,-25 0,-40 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-white"
                  />
                  
                  {/* Central Islamic rosette */}
                  <g transform="rotate(45)">
                    <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-white"/>
                    <circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-white"/>
                  </g>
                </g>
                
                {/* Decorative corner elements */}
                <circle cx="20" cy="20" r="4" fill="currentColor" className="text-white"/>
                <circle cx="100" cy="20" r="4" fill="currentColor" className="text-white"/>
                <circle cx="20" cy="100" r="4" fill="currentColor" className="text-white"/>
                <circle cx="100" cy="100" r="4" fill="currentColor" className="text-white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-girih-why)" opacity="0.4"/>
          </svg>
        </div>

        {/* Subtle Islamic Border Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="islamic-border-why" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Islamic border-like pattern */}
                <g transform="translate(30,30)">
                  <polygon 
                    points="0,-20 15,-10 15,10 0,20 -15,10 -15,-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    className="text-white"
                  />
                  <polygon 
                    points="0,-12 9,-6 9,6 0,12 -9,6 -9,-6"
                    fill="currentColor"
                    className="text-white"
                    fillOpacity="0.4"
                  />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-border-why)" opacity="0.3"/>
          </svg>
        </div>
      </div>

      {/* Decorative Illustration */}
      <div className="shape-illustration bottom-right">
        <img src="/ilustrasi/mosque.png" alt="Islamic School Illustration" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="md:sticky md:top-0 md:h-screen flex items-center">
        <div 
          ref={contentRef}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-3 lg:gap-4 will-change-transform w-full md:w-max"
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          {/* Title Section */}
              <div ref={titleRef} className="w-full md:flex-shrink-0 md:min-w-[34vw] lg:min-w-[30vw] flex flex-col justify-center px-4 md:px-8 md:ml-6 lg:ml-8">
             <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white font-quicksand leading-tight mb-3 sm:mb-4">
              {sectionTitle}
            </h2>
             {/* Subtitle dihilangkan sesuai permintaan */}
              <p className="text-sm sm:text-base text-white/80 font-quicksand max-w-none md:max-w-md mb-6 sm:mb-8 md:mb-2 lg:mb-3">
              {sectionDescription}
            </p>
          </div>

          {/* Card List Box - Horizontal layout with vertical cards */}
             <div ref={cardsRef} className="cardListBox w-full md:w-auto flex gap-4 sm:gap-6 md:gap-6 lg:gap-8 h-full flex-shrink-0 px-4 md:px-4 overflow-x-auto md:overflow-visible">
            {features.map((feature, index) => (
                <div key={index} className="flex flex-col justify-center items-start w-56 sm:w-60 md:w-72 lg:w-72 xl:w-80 flex-shrink-0">
                {/* Card Number */}
                 <div className="cardNumber text-green-400 text-sm sm:text-base md:text-lg font-mono font-bold mb-2 sm:mb-3">
                  {feature.number}
                </div>
                
                {/* Card Title */}
                 <h3 className="cardTitle text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white font-quicksand leading-tight mb-3 sm:mb-5">
                  {feature.title}
                </h3>
                
                {/* Card Image - Vertical orientation */}
                   <div className="cardContent w-full h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg mb-3 sm:mb-5">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    style={{ aspectRatio: '3/4' }}
                    onError={(e) => {
                      console.log('Image failed to load:', feature.image);
                      e.currentTarget.src = '/image (10).png';
                    }}
                  />
                </div>
                
                {/* Card Description */}
                 <p className="cardDesc text-blue-100 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed font-quicksand">
                  {feature.description}
                </p>
              </div>
            ))}
              {/* Extra space kecil agar kartu terakhir tidak terpotong */}
               <div className="flex-shrink-0 w-[10vw] sm:w-[8vw] md:w-[4vw] h-full"></div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection