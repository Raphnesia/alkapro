'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { VideoBackground } from '@/components/VideoBackground'
import { ScrollReveal } from '@/components/ScrollReveal'
import { TypingAnimation, FlipText, WordRotate, Marquee, BoxReveal } from '@/components/MagicUIAnimations'
import { BentoGrid, BentoCard, InteractiveGridPattern } from '@/components/ClientComponents'
import FacilitiesSwiper from '@/components/FacilitiesSwiper'
import PrestasiSwiper from '@/components/PrestasiSwiper'
import ProgramKhususSection from '@/components/ProgramKhususSection'
import BeritaKegiatanSection from '@/components/BeritaKegiatanSection'
import KegiatanSekolahSection from '@/components/KegiatanSekolahSection'
import TestimoniSection from '@/components/TestimoniSection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'
import SocialMediaFeedSection from '@/components/SocialMediaFeedSection'
import AlkaproEcosystemSection from '@/components/AlkaproEcosystemSection'
import YouTubeSection from '@/components/YouTubeSection'
import { useI18n } from '@/hooks/useI18n'
import { homeApi, HomeSection, InstagramApiPost, SocialSettings, popupApi, PopupSettings } from '@/lib/api'

export default function Home() {
  const { t, currentLocale } = useI18n();
  
  const [hero, setHero] = useState<HomeSection | null>(null)
  const [principal, setPrincipal] = useState<HomeSection | null>(null)
  const [facilities, setFacilities] = useState<HomeSection | null>(null)
  const [achievements, setAchievements] = useState<HomeSection | null>(null)
  const [socialSettings, setSocialSettings] = useState<SocialSettings | null>(null)
  const [igPosts, setIgPosts] = useState<InstagramApiPost[]>([])
  const [whyInitial, setWhyInitial] = useState<any | null>(null)
  const [whyTranslated, setWhyTranslated] = useState<any | null>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupSettings, setPopupSettings] = useState<PopupSettings | null>(null)

  const rotatingWords = [
    (hero?.config_data?.flip_text as string) || t('header.home') + ", Sekolah Surgaku",
    "Mencetak Generasi Islam, Berprestasi dan Berkemajuan"
  ]

  const [currentPrestasiGradient, setCurrentPrestasiGradient] = useState(0)
  
  // Array of gradient combinations for Prestasi section
  const prestasiGradients = [
    'from-blue-600 via-purple-600 to-pink-700',
    'from-green-600 via-teal-600 to-cyan-700', 
    'from-orange-600 via-red-600 to-pink-700',
    'from-purple-600 via-indigo-600 to-blue-700',
    'from-yellow-600 via-orange-600 to-red-700',
    'from-teal-600 via-green-600 to-emerald-700',
    'from-pink-600 via-rose-600 to-red-700',
    'from-indigo-600 via-purple-600 to-pink-700'
  ]

  // Data fasilitas sekolah modern (fallback). Tetap pertahankan layout, hanya swap data jika backend ada
  const schoolFacilities = [
    {
      name: t('common.facilities.lab_computer'),
      description: t('common.facilities.lab_computer_desc'),
      background: (
        <img 
          src="/image (10).png"
          alt={t('common.facilities.lab_computer')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-2",
      cta: t('common.read_more')
    },
    {
      name: t('common.facilities.digital_library'),
      description: t('common.facilities.digital_library_desc'),
      background: (
        <img 
          src="/image (11).png"
          alt={t('common.facilities.digital_library')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-1",
      cta: t('common.explore')
    },
    {
      name: t('common.facilities.smart_classroom'),
      description: t('common.facilities.smart_classroom_desc'),
      background: (
        <img 
          src="/image112.png"
          alt={t('common.facilities.smart_classroom')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-1",
      cta: t('common.view_facilities')
    },
    {
      name: t('common.facilities.science_lab'),
      description: t('common.facilities.science_lab_desc'),
      background: (
        <img 
          src="/image112.png"
          alt={t('common.facilities.science_lab')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-2",
      cta: t('common.explore')
    },
    {
      name: t('common.facilities.mosque'),
      description: t('common.facilities.mosque_desc'),
      background: (
        <img 
          src="/image (10).png"
          alt={t('common.facilities.mosque')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-1",
      cta: t('common.view_schedule')
    },
    {
      name: t('common.facilities.sports_field'),
      description: t('common.facilities.sports_field_desc'),
      background: (
        <img 
          src="/image112.png"
          alt={t('common.facilities.sports_field')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-1",
      cta: t('common.view_schedule')
    },
    {
      name: t('common.facilities.healthy_canteen'),
      description: t('common.facilities.healthy_canteen_desc'),
      background: (
        <img 
          src="/image (11).png"
          alt={t('common.facilities.healthy_canteen')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-1",
      cta: t('common.view_menu')
    },
    {
      name: t('common.facilities.art_music_room'),
      description: t('common.facilities.art_music_room_desc'),
      background: (
        <img 
          src="/image112.png"
          alt={t('common.facilities.art_music_room')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-2",
      cta: t('common.view_works')
    },
    {
      name: t('common.facilities.counseling_room'),
      description: t('common.facilities.counseling_room_desc'),
      background: (
        <img 
          src="/image (10).png"
          alt={t('common.facilities.counseling_room')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: "lg:col-span-1",
      cta: t('common.consult')
    }
  ]

  // Load Popup Settings from backend
  useEffect(() => {
    let mounted = true

    const fetchPopupSettings = async () => {
      try {
        console.log('🔍 Fetching popup settings from API...')
        // Fetch from API - response format: { success: true, data: {...} }
        // Using proxy to avoid CORS issues (proxy already includes /v1 in base URL)
        const response = await fetch('/api/proxy/popup-settings', { cache: 'no-store' })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log('📦 Popup API response:', result)
        
        if (!mounted) return

        // Check if API response is successful
        if (!result.success) {
          console.warn('⚠️ Popup API returned success: false')
          setPopupSettings(null)
          return
        }

        const settings = result.data
        console.log('📋 Popup settings data:', settings)

        // Handle case when no active popup: { is_active: false, image_url: "" }
        if (!settings || !settings.is_active) {
          console.warn('⚠️ Popup is not active')
          setPopupSettings(null)
          return
        }
        
        // Check if image_url exists (either image_url or image_url_full)
        const hasImageUrl = settings.image_url || settings.image_url_full
        if (!hasImageUrl || hasImageUrl === '') {
          console.warn('⚠️ Popup has no image_url')
          setPopupSettings(null)
          return
        }

        // Use image_url_full if available, otherwise use image_url
        let imageUrl = settings.image_url_full || settings.image_url
        console.log('🖼️ Original image URL from API:', imageUrl)
        
        // Add cache busting parameter to ensure fresh image (only if URL is valid)
        try {
          const url = new URL(imageUrl)
          url.searchParams.set('v', settings.updated_at || Date.now().toString())
          imageUrl = url.toString()
        } catch (e) {
          // If URL parsing fails, use original URL
          console.warn('⚠️ Could not parse image URL for cache busting, using original:', imageUrl)
        }
        console.log('🖼️ Using image URL (with cache busting):', imageUrl)

        // Check if popup has expired
        if (settings.expires_at) {
          const expiresAt = new Date(settings.expires_at)
          const now = new Date()
          if (now > expiresAt) {
            setPopupSettings(null)
            return
          }
        }

        // Set settings with the correct image URL
        const finalSettings = {
          ...settings,
          image_url: imageUrl
        }
        setPopupSettings(finalSettings)
        console.log('✅ Popup settings set successfully:', finalSettings)
        console.log('🖼️ Final image URL that will be used:', finalSettings.image_url)

        // Check if should show on first visit only
        if (settings.show_on_first_visit_only) {
          const hasSeenPopup = localStorage.getItem('has_seen_popup')
          if (hasSeenPopup === 'true') {
            return
          }
        }

        // Show popup with delay if specified
        const delay = settings.delay_before_show || 0
        console.log(`⏱️ Will show popup after ${delay}ms delay`)
        setTimeout(() => {
          if (mounted) {
            console.log('✅ Showing popup now')
            setShowPopup(true)
          }
        }, delay)
      } catch (error) {
        console.error('❌ Error fetching popup settings:', error)
        // Don't show popup if API fails - user should fix the API issue
        if (mounted) {
          setPopupSettings(null)
          console.warn('⚠️ Popup will not be shown due to API error. Please check API connection.')
        }
      }
    }

    fetchPopupSettings()

    return () => {
      mounted = false
    }
  }, [])
  
  // Play sound effect separately after popup is shown
  useEffect(() => {
    if (showPopup && popupSettings) {
      // Play sound effect asynchronously without blocking popup display
      const playAudio = async () => {
        try {
          const audio = new Audio('/popupeffect.mp3')
          await audio.play()
        } catch (error) {
          console.log('Audio play failed:', error)
        }
      }
      playAudio()
    }
  }, [showPopup, popupSettings])

  // Load Home sections from backend (update per section begitu selesai, tanpa menunggu semuanya)
  useEffect(() => {
    let mounted = true

    const safeSet = <T,>(setter: (v: T) => void) => (v: T) => { 
      console.log('🔧 SafeSet called with value:', v)
      if (mounted) {
        console.log('🔧 Component still mounted, setting value')
        setter(v)
      } else {
        console.log('🔧 Component unmounted, ignoring set')
      }
    }

    // Hero - ambil dari section 'hero' sesuai dengan response API
    console.log('🚀 Starting hero API call...')
    homeApi.byType('hero')
      .then((heroArr) => {
        console.log('🔍 Hero section data received:', heroArr)
        console.log('🔍 Hero array length:', heroArr?.length)
        console.log('🔍 Hero array type:', typeof heroArr)
        
        const heroSection = heroArr?.[0]
        console.log('🔍 First hero section:', heroSection)
        
        if (heroSection) {
          console.log('✅ Using hero section for video:', heroSection)
          safeSet(setHero)(heroSection)
        } else {
          console.log('❌ No hero section found in array')
          safeSet(setHero)(null)
        }
      })
      .catch((error) => {
        console.error('❌ Error fetching hero section:', error)
        console.error('❌ Error details:', {
          message: error?.message,
          stack: error?.stack,
          name: error?.name
        })
        safeSet(setHero)(null)
      })
      .finally(() => {
        if (mounted) setHeroLoaded(true)
      })

    // Principal Welcome
    homeApi.byType('principal_welcome')
      .then((arr) => safeSet(setPrincipal)(arr?.[0] || null))
      .catch(() => {})

    // Facilities
    homeApi.byType('facilities')
      .then((arr) => safeSet(setFacilities)(arr?.[0] || null))
      .catch(() => {})

    // Achievements
    homeApi.byType('achievements_modern')
      .then((arr) => safeSet(setAchievements)(arr?.[0] || null))
      .catch(() => {})

    // Why Choose Us (prefer canonical, else race alternatif)
    ;(async () => {
      try {
        let arr = await homeApi.byType('why_choose_us')
        if (!Array.isArray(arr) || !arr.length) {
          arr = await homeApi.byTypesFirst(['why-choose-us','whychooseus'], { timeoutMs: 2000 })
        }
        const section = Array.isArray(arr) ? arr[0] : null
        if (!section) return
        const cfg: any = (section as any).config_data || {}
        const strip = (html?: string) => {
          if (!html) return ''
          try {
            const div = document.createElement('div')
            div.innerHTML = html
            return (div.textContent || div.innerText || '').trim()
          } catch {
            return (html || '').replace(/<[^>]*>/g, ' ').trim()
          }
        }
        const items: any[] = Array.isArray(cfg.features) ? cfg.features
          : Array.isArray(cfg.reasons) ? cfg.reasons
          : Array.isArray(cfg.items) ? cfg.items
          : []
        const base = {
          title: (section as any)?.title || cfg.title,
          subtitle: cfg.subtitle,
          description: strip((section as any)?.content) || cfg.description || cfg.desc,
          features: items.map((it: any, idx: number) => ({
            number: it?.number || `[${String(idx + 1).padStart(2, '0')}]`,
            title: it?.title || it?.name || '',
            image: it?.image || it?.icon || it?.icon_upload,
            description: it?.description || it?.desc || ''
          }))
        }
        safeSet(setWhyInitial)(base)
        // Disable client-side auto-translation to remove latency
        safeSet(setWhyTranslated)(null as any)
      } catch {}
    })()

    // Social settings & Instagram (tidak memblok render section lain)
    homeApi.social.settings()
      .then((s) => safeSet(setSocialSettings)(s))
      .catch(() => {})
    homeApi.social.instagram()
      .then((ig) => safeSet(setIgPosts)(Array.isArray(ig) ? ig.slice(0,8) : []))
      .catch(() => {})

    return () => { mounted = false }
  }, [])

  // Auto change gradient for Prestasi section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrestasiGradient(prev => 
        prev === prestasiGradients.length - 1 ? 0 : prev + 1
      )
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [prestasiGradients.length])

  const heroConfig = (hero as any)?.config_data || {}
  const principalConfig = (principal as any)?.config_data || {}
  const facilitiesConfig = (facilities as any)?.config_data || {}
  const achievementsConfig = (achievements as any)?.config_data || {}

  // Debug hero config
  console.log('🔍 Hero config:', heroConfig)
  console.log('🔍 Hero raw data:', hero)
  console.log('🔍 Hero section type:', hero?.section_type)
  console.log('🔍 Hero config data keys:', Object.keys(heroConfig || {}))

  const heroVideoSrc: string | undefined = (() => {
    console.log('🔍 === START VIDEO SOURCE LOGIC ===')
    
    // Cek apakah ada video file desktop dari backend (sudah full URL)
    if (heroConfig?.video_file_desktop) {
      console.log('✅ Found video file desktop from backend:', heroConfig.video_file_desktop)
      return heroConfig.video_file_desktop
    } else {
      console.log('❌ No video_file_desktop found in:', heroConfig)
    }
    
    // Cek apakah ada video file mobile dari backend (sudah full URL)
    if (heroConfig?.video_file_mobile) {
      console.log('✅ Found video file mobile from backend:', heroConfig.video_file_mobile)
      return heroConfig.video_file_mobile
    } else {
      console.log('❌ No video_file_mobile found in:', heroConfig)
    }
    
    // Cek apakah ada video URL dari backend
    if (heroConfig?.video_url_desktop) {
      console.log('✅ Found video URL desktop from backend:', heroConfig.video_url_desktop)
      return heroConfig.video_url_desktop
    } else {
      console.log('❌ No video_url_desktop found in:', heroConfig)
    }
    
    // Fallback ke video default (tapi nanti ditentukan berdasarkan heroLoaded)
    console.log('⚠️ No video found in backend, will determine fallback based on heroLoaded')
    return undefined
  })()

  // Debug video source
  console.log('🔍 Final hero video source:', heroVideoSrc)
  console.log('🔍 Will use fallback video.mp4?', !heroVideoSrc && heroLoaded)
  console.log('🔍 Background mode:', heroConfig?.background_mode)
  console.log('🔍 Video URL desktop:', heroConfig?.video_url_desktop)
  console.log('🔍 Video file desktop:', heroConfig?.video_file_desktop)
  console.log('🔍 === END VIDEO SOURCE LOGIC ===')

  // Tentukan sumber video yang diberikan ke VideoBackground
  const videoSrcToPass = heroVideoSrc ?? (heroLoaded ? '/video.mp4' : undefined)

  const facilityItems: any[] = Array.isArray(facilitiesConfig?.carousel_items)
    ? facilitiesConfig.carousel_items
    : Array.isArray(facilitiesConfig?.bento_items)
      ? facilitiesConfig.bento_items
      : Array.isArray(facilitiesConfig?.items)
        ? facilitiesConfig.items
        : []

  const backendFacilities = facilityItems.map((item: any) => {
    const imageSrc = item?.image || item?.img || item?.photo
    const name = item?.name || item?.title || ''
    const description = item?.description || item?.desc || item?.subtitle || ''
    return {
      name,
      description,
      background: (
        <img 
          src={imageSrc || '/image (10).png'}
          alt={name || 'Facility'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      className: item?.className || '',
      cta: item?.cta || t('common.read_more')
    }
  })

  const facilitiesToRender = backendFacilities?.length ? backendFacilities : schoolFacilities

  return (
    <div className="min-h-screen">
      {/* Welcome Popup */}
      {showPopup && popupSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="relative animate-fade-in">
            <button 
              onClick={() => {
                console.log('❌ Closing popup')
                setShowPopup(false)
                // Mark as seen if first visit only
                if (popupSettings.show_on_first_visit_only) {
                  localStorage.setItem('has_seen_popup', 'true')
                }
              }}
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-3xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            {popupSettings.link_url ? (
              <a
                href={popupSettings.link_url}
                target={popupSettings.open_in_new_tab ? '_blank' : '_self'}
                rel={popupSettings.open_in_new_tab ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  console.log('🔗 Opening popup link:', popupSettings.link_url)
                  setShowPopup(false)
                  if (popupSettings.show_on_first_visit_only) {
                    localStorage.setItem('has_seen_popup', 'true')
                  }
                }}
              >
                <img 
                  key={`popup-img-${popupSettings.id || popupSettings.image_url}`}
                  src={popupSettings.image_url} 
                  alt={popupSettings.image_alt || 'Popup Image'} 
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg cursor-pointer"
                  onLoad={() => console.log('✅ Popup image loaded successfully:', popupSettings.image_url)}
                  onError={(e) => {
                    console.error('❌ Popup image failed to load:', popupSettings.image_url)
                    console.error('Error details:', e)
                    // Try to reload with cache busting
                    const img = e.currentTarget
                    const url = new URL(popupSettings.image_url)
                    url.searchParams.set('t', Date.now().toString())
                    img.src = url.toString()
                  }}
                />
              </a>
            ) : (
              <img 
                key={`popup-img-${popupSettings.id || popupSettings.image_url}`}
                src={popupSettings.image_url} 
                alt={popupSettings.image_alt || 'Popup Image'} 
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg cursor-pointer"
                onLoad={() => console.log('✅ Popup image loaded successfully:', popupSettings.image_url)}
                onError={(e) => {
                  console.error('❌ Popup image failed to load:', popupSettings.image_url)
                  console.error('Error details:', e)
                  // Try to reload with cache busting
                  const img = e.currentTarget
                  const url = new URL(popupSettings.image_url)
                  url.searchParams.set('t', Date.now().toString())
                  img.src = url.toString()
                }}
                onClick={() => {
                  console.log('❌ Closing popup')
                  setShowPopup(false)
                  if (popupSettings.show_on_first_visit_only) {
                    localStorage.setItem('has_seen_popup', 'true')
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
      
      <Header />
      
      {/* Hero Section with Video Background - Digital School, Sekolahku Surgaku */}
      <VideoBackground 
        videoSrc={videoSrcToPass}
        backgroundImageUrl={heroConfig?.background_mode === 'image' ? (heroConfig?.background_image as string) : undefined}
        className="min-h-[80vh]"
      >
        {/* Content Container - Full width approach */}
        <div className="container mx-auto px-4 h-full flex items-center justify-center pt-32">
          <div className="text-center space-y-6 w-full max-w-7xl">
            {/* Text Content Group - Much wider */}
            <div className="p-8 animate-fade-in w-full">
              {/* Typing Animation - Multilingual Welcome - Larger with Repeat */}
              <div className="text-2xl md:text-3xl lg:text-4xl font-plus-jakarta-regular text-white mb-6">
                <TypingAnimation 
                  text={heroConfig?.typing_text || t('common.welcome_message')}
                  className="text-white font-plus-jakarta-regular"
                  duration={100}
                  repeat={true}
                />
              </div>
              
              {/* Flip Text - School Name - Much Larger with Repeat */}
              <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ubuntu font-bold text-white leading-tight mb-6">
                <FlipText 
                  text={heroConfig?.flip_text || t('common.school_name')}
                  className="text-white font-ubuntu font-bold"
                  duration={4000}
                  repeat={true}
                />
              </div>
              
              {/* Word Rotate - School Values - Larger */}
              <div className="text-xl md:text-2xl lg:text-3xl font-plus-jakarta-light text-white mb-8">
                <WordRotate 
                  words={rotatingWords}
                  className="text-white font-plus-jakarta-light"
                  duration={2500}
                />
              </div>
              
              {/* Buttons Group */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(() => {
                  const buttons = Array.isArray(heroConfig?.buttons) ? heroConfig.buttons : []
                  const primary = buttons[0]
                  const secondary = buttons[1]
                  return (
                    <>
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
                        onClick={() => { if (primary?.url) window.location.href = primary.url }}
                      >
                        {primary?.label || t('common.explore_programs')}
                      </button>
                      <button 
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
                        onClick={() => { if (secondary?.url) window.location.href = secondary.url }}
                      >
                        {secondary?.label || t('common.explore_school')}
                      </button>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </VideoBackground>

      {/* Sambutan Kepala Sekolah Section */}
      <div className="relative py-20 bg-white overflow-hidden">
        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          {/* Title */}
          <ScrollReveal delay={200}>
            <div className="text-center mb-16">
              <BoxReveal duration={0.4} delay={0.1} boxColor="#fbbf24" width="100%">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-gray-800 mb-2">
                  {(principal as any)?.title || t('common.principal_greeting')}
                </h2>
              </BoxReveal>
              <div className="flex justify-center w-full">
                <BoxReveal duration={0.3} delay={0.3} boxColor="#2563eb">
                  <div className="w-32 h-1 bg-yellow-400"></div>
                </BoxReveal>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Photo Section */}
            <ScrollReveal delay={400} direction="left">
              <div className="flex justify-center lg:justify-end">
                <BoxReveal duration={0.4} delay={0.5} boxColor="#10b981">
                  <div className="relative">
                    <div className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={principalConfig?.principal_photo || '/image (11).png'} 
                        alt={principalConfig?.principal_name || t('common.principal_name')}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-600 rounded-full opacity-20"></div>
                  </div>
                </BoxReveal>
              </div>
            </ScrollReveal>
            
            {/* Text Content */}
            <ScrollReveal delay={600} direction="right">
              <div className="space-y-3">
                <BoxReveal duration={0.3} delay={0.7} boxColor="#8b5cf6" width="100%">
                  <h3 className="text-xl md:text-2xl font-ubuntu font-semibold text-gray-800">
                    {principalConfig?.principal_name || t('common.principal_name')}
                  </h3>
                </BoxReveal>
                
                <BoxReveal duration={0.3} delay={0.8} boxColor="#f59e0b" width="100%">
                  <p className="text-sm text-gray-600 mb-2">
                    {principalConfig?.principal_position || t('common.principal_position')}
                  </p>
                </BoxReveal>
                
                <BoxReveal duration={0.3} delay={0.9} boxColor="#ef4444" width="100%">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>{principalConfig?.greeting_arabic || t('common.greeting_arabic')}</strong>
                  </p>
                </BoxReveal>
                
                <BoxReveal duration={0.3} delay={1.0} boxColor="#3b82f6" width="100%">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {principalConfig?.greeting_message || t('common.greeting_message')}
                  </p>
                </BoxReveal>
                
                <BoxReveal duration={0.3} delay={1.1} boxColor="#06b6d4" width="100%">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {principalConfig?.greeting_we_say || t('common.greeting_we_say')}
                  </p>
                </BoxReveal>
                
                <BoxReveal duration={0.3} delay={1.2} boxColor="#84cc16" width="100%">
                  <p className="text-gray-700 leading-relaxed mb-2 italic">
                    {principalConfig?.greeting_welcome || t('common.greeting_welcome')}
                  </p>
                </BoxReveal>
                
                <BoxReveal duration={0.3} delay={1.3} boxColor="#f97316" width="100%">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{principalConfig?.greeting_closing || t('common.greeting_closing')}</strong>
                  </p>
                </BoxReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Program Khusus Interactive Section - Dipindah ke atas Fasilitas */}
      <ScrollReveal delay={200}>
        <ProgramKhususSection />
      </ScrollReveal>

      {/* Why Choose Us Section - Dipindah setelah Program Khusus */}
      <WhyChooseUsSection initial={(whyTranslated || whyInitial) || undefined} />

      {/* Fasilitas Sekolah Section dengan Bento Grid */}
      <div className="relative py-24 bg-gray-50 overflow-hidden">
        {/* Interactive Grid Pattern Background */}
        <InteractiveGridPattern
          width={60}
          height={60}
          numSquares={30}
          className="absolute inset-0 h-full w-full"
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-8xl">
          {/* Title */}
          <ScrollReveal delay={200}>
            <div className="text-center mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-gray-800 mb-2">
                {facilities?.title || t('common.facilities_title')}
              </h2>
              <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </ScrollReveal>
          
          {/* Facilities Carousel (Swiper) */}
          <ScrollReveal delay={400}>
            <FacilitiesSwiper items={facilitiesToRender as any} />
          </ScrollReveal>
        </div>
      </div>

      {/* Alkapro Smart School Ecosystem Section */}
      <ScrollReveal delay={200}>
        <AlkaproEcosystemSection />
      </ScrollReveal>

      

      {/* Prestasi Siswa Section - Modern Futuristic Design */}
      <div className={`py-24 bg-gradient-to-br ${prestasiGradients[currentPrestasiGradient]} relative overflow-hidden transition-all duration-1000`}>
        {/* Advanced Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-8">
          {/* Geometric Islamic Patterns */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M60 60c0-22.091-17.909-40-40-40S-20 37.909-20 60s17.909 40 40 40 40-17.909 40-40zm-40-30a30 30 0 1 1 0 60 30 30 0 0 1 0-60z'/%3E%3Cpath d='M60 0c16.569 0 30 13.431 30 30s-13.431 30-30 30-30-13.431-30-30S43.431 0 60 0zm0 10c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
          
          {/* Floating Islamic Elements */}
          <div className="absolute top-20 left-20 w-16 h-16 opacity-20">
            <svg viewBox="0 0 64 64" className="w-full h-full text-white">
              <polygon points="32,8 40,24 56,24 44,36 48,52 32,44 16,52 20,36 8,24 24,24" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute top-40 right-32 w-12 h-12 opacity-15">
            <svg viewBox="0 0 64 64" className="w-full h-full text-white">
              <path d="M32 8 C24 16, 24 32, 32 40 C28 36, 26 32, 26 28 C26 24, 28 20, 32 8 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute bottom-32 left-40 w-20 h-20 opacity-10">
            <svg viewBox="0 0 64 64" className="w-full h-full text-white">
              <rect x="16" y="16" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 32 32)"/>
              <rect x="20" y="20" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 32 32)"/>
            </svg>
          </div>
          
          <div className="absolute bottom-20 right-20 w-14 h-14 opacity-20">
            <svg viewBox="0 0 64 64" className="w-full h-full text-white">
              <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="32" cy="32" r="8" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white/35 rounded-full animate-pulse"></div>
        </div>
        
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Enhanced Title Section */}
          <ScrollReveal delay={200}>
            <div className="text-center mb-20">
              {/* Islamic Bismillah */}
              <div className="mb-6">
                <p className="text-white/60 text-lg font-arabic mb-2">بسم الله الرحمن الرحيم</p>
                <p className="text-white/80 text-sm">{t('common.bismillah_translation')}</p>
              </div>
              
              {/* Main Title with Gradient Text */}
              <div className="relative">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-ubuntu font-bold mb-4">
                  <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    {t('common.achievements_title')}
                  </span>
                  <br />
                  <span className="text-white">
                    {t('common.achievements_subtitle')}
                  </span>
                </h2>
                
                {/* Decorative Elements */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
                </div>
                
                <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
                  {achievementsConfig?.islamic_quote_translation || t('common.achievements_description')}
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Enhanced Prestasi Swiper Component */}
          <ScrollReveal delay={400}>
            <PrestasiSwiper />
          </ScrollReveal>
          
          {/* Islamic Quote Section */}
          <ScrollReveal delay={600}>
            <div className="mt-16 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
                <div className="mb-4">
                  <p className="text-white/90 text-xl md:text-2xl font-arabic leading-relaxed mb-3">
                    {achievementsConfig?.islamic_quote_arabic || 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ'}
                  </p>
                  <p className="text-white/80 text-base italic">
                    {achievementsConfig?.islamic_quote_translation || t('common.islamic_quote')}
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      

      {/* Berita & Kegiatan Section */}
      <ScrollReveal delay={300}>
        <BeritaKegiatanSection />
      </ScrollReveal>

      {/* Kegiatan Sekolah Section */}
      <ScrollReveal delay={200}>
        <KegiatanSekolahSection />
      </ScrollReveal>

      {/* Testimoni Section */}
      <ScrollReveal delay={300}>
        <TestimoniSection />
      </ScrollReveal>
      
      <ScrollReveal delay={200}>
        <SocialMediaFeedSection />
      </ScrollReveal>

      {/* YouTube Section */}
      <ScrollReveal delay={200}>
        <YouTubeSection />
      </ScrollReveal>
      
      {/* Background Footer Section */}
      <ScrollReveal delay={300}>
        <div 
          className="w-full h-80 md:h-64 lg:h-[400px] md:h-[600px] xl:h-[1200px] -mt-20 md:-mt-32 xl:-mt-56 -mb-6 bg-no-repeat bg-center bg-cover relative z-20"
          style={{
            backgroundImage: 'url(/backgroundatasfooter.png)',
            backgroundColor: 'transparent'
          }}
        >
        </div>
      </ScrollReveal>

      
      {/* Import and add Footer component before using it */}
      {/* <Footer /> */}
    </div>
  )
}