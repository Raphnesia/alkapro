'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { InteractiveGridPattern } from './MagicUIAnimations'
import { ScrollReveal } from './ScrollReveal'
import { getApiUrl, getImageUrl } from '@/lib/config'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Custom styles for Swiper
import './KegiatanSekolahSwiper.css'

const KegiatanSekolahSection = () => {
  type ActivityCard = { id: number | string; title: string; image: string; category?: string; type?: string }
  const [activities, setActivities] = useState<ActivityCard[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch activities images (from /activities/complete then fallback /activities)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        
        let ok = false
        // Try complete endpoint (settings + activities)
        try {
          const res = await fetch(getApiUrl('/activities/complete'), { cache: 'no-store' })
          if (res.ok) {
            const json = await res.json()
            const payload = json?.data || json
            const list: any[] = Array.isArray(payload?.activities) ? payload.activities : []
            const mapped: ActivityCard[] = list
              .filter(it => it?.image)
              .map(it => ({
                id: it.id,
                title: it.title,
                image: getImageUrl(it.image),
                category: it.category,
                type: it.type,
              }))
              .slice(0, 12)
            setActivities(mapped)
            ok = true
          }
        } catch {}

        // Fallback: plain activities list
        if (!ok) {
          try {
            const res2 = await fetch(getApiUrl('/activities'), { cache: 'no-store' })
            if (res2.ok) {
              const json2 = await res2.json()
              const list2: any[] = Array.isArray(json2?.data) ? json2.data : (Array.isArray(json2) ? json2 : [])
              const mapped2: ActivityCard[] = list2
                .filter(it => it?.image)
                .map(it => ({
                  id: it.id,
                  title: it.title,
                  image: getImageUrl(it.image),
                  category: it.category,
                  type: it.type,
                }))
                .slice(0, 12)
              setActivities(mapped2)
              ok = true
            }
          } catch {}
        }

        if (!ok) {
          setActivities([])
        }
      } catch (error) {
        console.error('Error fetching images:', error)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchImages()
  }, [])

  return (
    <div className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Decorative Illustration */}
      <div className="shape-illustration top-left">
        <img src="/ilustrasi/puteri.png" alt="Student Achievement Illustration" />
      </div>
      
      {/* Interactive Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        <InteractiveGridPattern 
          width={150} 
          height={150} 
          numSquares={5} 
          className="opacity-20" 
        />
        
        {/* Single gradient overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/5 via-transparent to-green-400/5"
          style={{ willChange: 'auto', backfaceVisibility: 'hidden' }}
        ></div>
        
        {/* Blur circles for depth */}
        <div 
          className="absolute opacity-10"
          style={{ 
            top: '10%', 
            left: '10%', 
            width: '20vmin', 
            height: '20vmin',
            background: 'var(--blue-400, #60a5fa)',
            borderRadius: '9999px',
            filter: 'blur(40px)',
            transform: 'translateZ(0)',
          }}
        ></div>
        <div 
          className="absolute opacity-10"
          style={{ 
            bottom: '10%', 
            right: '10%', 
            width: '25vmin', 
            height: '25vmin',
            background: 'var(--green-400, #4ade80)',
            borderRadius: '9999px',
            filter: 'blur(40px)',
            transform: 'translateZ(0)',
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-gray-800 mb-4">
                Kegiatan Sekolah
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dokumentasi berbagai kegiatan dan prestasi yang telah dicapai oleh siswa-siswi SMP Muhammadiyah Al Kautsar PK Kartasura
              </p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Main Content - Swiper Carousel */}
        <ScrollReveal delay={400}>
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full"
            >
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                </div>
              ) : activities.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={true}
                  className="mySwiper"
                >
                  {activities.map((act, index) => (
                    <SwiperSlide key={act.id || index}>
                      <div className="dz-team style-1 text-center overlay-shine aos-item">
                        <div className="dz-media rounded">
                          <div className="relative w-full">
                            <Image
                              src={act.image || '/placeholder.jpg'}
                              alt={act.title}
                              width={600}
                              height={420}
                              className="shadow border object-cover h-[380px] md:h-[420px] w-full rounded-xl"
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
                            <h5 className="font-semibold text-lg line-clamp-2">{act.title}</h5>
                            <p className="text-sm text-gray-200">{act.category || 'Kegiatan'}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md mx-auto">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Tidak ada gambar kegiatan</h3>
                    <p className="text-sm text-gray-500">Belum ada kegiatan dengan gambar yang tersedia dari API.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default KegiatanSekolahSection