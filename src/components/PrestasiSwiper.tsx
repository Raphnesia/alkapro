'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import './PrestasiSwiper.css'
import { postApi, Post } from '@/lib/api'
import { getImageUrl } from '@/lib/config'

type PrestasiImage = { url: string; title: string }

// Interface untuk data prestasi dari API
interface PrestasiApiItem {
  id: number
  title: string
  slug?: string
  content?: string | null
  subtitle?: string
  image?: string
  category?: string | null
  type?: string
  author?: string
  tags?: string | string[]
  meta_description?: string | null
  published_at?: string
  created_at?: string
  read_time?: number
}

interface PrestasiApiResponse {
  data?: PrestasiApiItem[]
  pagination?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

const fallbackPrestasiImages: PrestasiImage[] = [
  { url: "/prestasi siswa/'Prestasi gemilangmu tidak hanya mencerminkan bakatmu, tetapi juga dedikasi dan kerja keras yang.jpg", title: 'Prestasi Akademik' },
  { url: "/prestasi siswa/'Prestasi gemilangmu tidak hanya mencerminkan bakatmu, tetapi juga dedikasi dan kerja keras yang (1).jpg", title: 'Prestasi Akademik' },
  { url: "/prestasi siswa/Selamat kepada Ananda Amir Zaki El S. yang telah mendapat JUARA 2 dalam Kejuaraan Karate Pelaja.webp", title: 'Prestasi Olahraga' },
]

export default function PrestasiSwiper() {
  const swiperRef = useRef(null)
  const [images, setImages] = useState<PrestasiImage[]>(fallbackPrestasiImages)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        // Ambil data dari endpoint prestasi/list terlebih dahulu (diutamakan)
        let prestasiListData: PrestasiApiItem[] = []
        try {
          const prestasiListRes = await fetch('https://api.alkapro.id/api/v1/prestasi/list', {
            headers: { Accept: 'application/json' },
            cache: 'no-store',
          })
          if (prestasiListRes.ok) {
            const prestasiListJson = await prestasiListRes.json() as PrestasiApiResponse | PrestasiApiItem[]
            // Handle response format: bisa { data: [...] } atau langsung array
            prestasiListData = Array.isArray(prestasiListJson) 
              ? prestasiListJson 
              : Array.isArray(prestasiListJson?.data) 
                ? prestasiListJson.data 
                : []
            
            // Jika ada pagination dan ada halaman lebih, ambil semua halaman
            if (!Array.isArray(prestasiListJson)) {
              const pagination = prestasiListJson?.pagination
              if (pagination && pagination.last_page > 1) {
                const allPages = await Promise.allSettled(
                  Array.from({ length: pagination.last_page - 1 }, (_, i) => 
                    fetch(`https://api.alkapro.id/api/v1/prestasi/list?page=${i + 2}`, {
                      headers: { Accept: 'application/json' },
                      cache: 'no-store',
                    }).then(async (res) => {
                      if (res.ok) {
                        const json = await res.json() as PrestasiApiResponse | PrestasiApiItem[]
                        return Array.isArray(json) ? json : json?.data || []
                      }
                      return null
                    })
                  )
                )
                
                allPages.forEach((pageRes) => {
                  if (pageRes.status === 'fulfilled' && Array.isArray(pageRes.value)) {
                    prestasiListData = [...prestasiListData, ...pageRes.value]
                  }
                })
              }
            }
            
            console.log('✅ Prestasi list data fetched:', prestasiListData.length, 'items')
          }
        } catch (prestasiError) {
          console.warn('⚠️ Failed to fetch from /prestasi/list:', prestasiError)
        }

        // Ambil data dari news, articles, dan category (sebagai fallback/supplement)
        const [newsRes, articlesRes, byCatRes] = await Promise.allSettled([
          postApi.getNews(1),
          postApi.getArticles(1),
          postApi.getByCategory('achievement', 1),
        ])

        const news = newsRes.status === 'fulfilled' ? newsRes.value.data : []
        const articles = articlesRes.status === 'fulfilled' ? articlesRes.value.data : []
        const byCat = byCatRes.status === 'fulfilled' ? byCatRes.value.data : []
        
        // Convert prestasi list data ke format yang sama dengan Post
        const prestasiListConverted: Post[] = prestasiListData.map((p: PrestasiApiItem) => ({
          id: p.id,
          title: p.title,
          slug: p.slug || `prestasi-${p.id}`,
          content: p.content || p.subtitle || '',
          subtitle: p.subtitle || '',
          image: p.image || '',
          category: p.category || 'achievement',
          type: (p.type || 'news') as 'news' | 'article',
          author: p.author || '',
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : ['prestasi']),
          meta_description: p.meta_description || p.subtitle || '',
          published_at: p.published_at || p.created_at || new Date().toISOString(),
          read_time: p.read_time || 0,
        }))

        // Gabungkan semua data: prestasi/list diutamakan, lalu news/articles
        const combined: Post[] = [...prestasiListConverted, ...news, ...articles, ...byCat]

        const filtered = combined.filter((p: Post) => {
          // Post.tags sudah bertipe string[], jadi langsung gunakan
          const tagsArr: string[] = Array.isArray(p?.tags) 
            ? p.tags.filter((tag): tag is string => typeof tag === 'string' && Boolean(tag))
            : []
          
          const hasPrestasiTag = tagsArr.some((tag: string) => /prestasi/i.test(tag))
          const category = String(p?.category || '').toLowerCase()
          const hasPrestasiCategory = /prestasi|achievement/i.test(category)
          const hasImage = !!(p?.image)
          return hasImage && (hasPrestasiTag || hasPrestasiCategory)
        })
        const mapped = filtered
          .map((p: Post) => ({ url: getImageUrl(p.image), title: p.title }))
          .filter((it: PrestasiImage) => !!it.url)

        // Deduplicate by url
        const unique: PrestasiImage[] = []
        const seen = new Set<string>()
        for (const it of mapped) {
          if (!seen.has(it.url)) {
            seen.add(it.url)
            unique.push(it)
          }
        }

        if (mounted && unique.length) {
          setImages(unique.slice(0, 20))
          console.log('✅ Prestasi images set:', unique.length, 'unique images')
        } else if (mounted) {
          console.warn('⚠️ No prestasi images found, using fallback')
        }
      } catch (e) {
        console.error('❌ Error fetching prestasi data:', e)
        // keep fallback on error
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Islamic Modern Swiper */}
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 150,
            modifier: 1.8,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="prestasi-swiper-coverflow"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} style={{width: '450px'}}>
              <Image
                src={image.url}
                alt={`${image.title} - Image ${index + 1}`}
                width={450}
                height={650}
                className="w-full h-[550px] object-cover rounded-3xl shadow-xl"
                priority={index < 3}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Islamic Navigation Buttons */}
        <div className="swiper-button-prev-custom">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next-custom">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}