'use client'

import React, { useMemo, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
// Pagination/Navigation not needed for marquee style

interface FacilityItem {
  name: string
  description: string
  background: React.ReactNode
  className?: string
  cta?: string
}

export default function FacilitiesSwiper({ items = [] as FacilityItem[] }: { items: FacilityItem[] }) {
  const swiperRef = useRef<any>(null)

  // Duplikasi item agar loop marquee selalu punya buffer cukup
  const marqueeItems = useMemo(() => {
    const base = Array.isArray(items) ? items : []
    if (base.length >= 6) return base
    const repeat = Math.max(2, Math.ceil(6 / Math.max(base.length, 1)))
    let out: FacilityItem[] = []
    for (let i = 0; i < repeat; i++) out = out.concat(base)
    return out
  }, [items])

  return (
    <div className="max-w-7xl mx-auto relative px-2 sm:px-0">
      {/* Edge fade for modern look */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-16 lg:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-16 lg:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

      <Swiper
        modules={[Autoplay]}
        slidesPerView={'auto'}
        spaceBetween={16}
        loop={marqueeItems.length > 1}
        loopAdditionalSlides={Math.max(8, marqueeItems.length)}
        speed={9000}
        grabCursor
        allowTouchMove
        centeredSlides={false}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
        breakpoints={{
          640: { spaceBetween: 24 },
          1024: { spaceBetween: 32 },
          1280: { spaceBetween: 40 }
        }}
        className="facilities-swiper"
        onSwiper={(sw) => { swiperRef.current = sw }}
        onReachEnd={(sw) => {
          try { sw.slideToLoop(0, 0) } catch {}
          try { sw.autoplay.start() } catch {}
        }}
        onAutoplayStop={(sw) => { try { sw.autoplay.start() } catch {} }}
      >
        {marqueeItems.map((item, idx) => (
          <SwiperSlide key={idx} className="!w-auto">
            <div className="w-[92vw] sm:w-[360px] md:w-[420px] lg:w-[460px] xl:w-[520px]">
              <div className="relative overflow-hidden rounded-2xl h-64 lg:h-80 group transition-transform duration-500 ease-out will-change-transform">
                {/* Glow backdrop */}
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-emerald-400/10 blur-2xl rounded-3xl" />

                {/* Card */}
                <div className="relative h-full rounded-2xl border border-white/10 shadow-xl shadow-black/10">
                  <div className="absolute inset-0">
                    {item.background}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.35),transparent_60%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent" />
                  </div>

                {/* Content (no glass/blur) */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <div className="rounded-xl px-4 py-3">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">{item.name}</h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed mt-1 drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)]">{item.description}</p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}


