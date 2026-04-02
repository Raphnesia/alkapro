'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { homeApi, HomeSection } from '@/lib/api'
import Beams from './Beams'

interface TestimoniData {
  nama: string
  tahun: string
  testimoni: string
  avatar: string
}

const fallbackTestimoniData: TestimoniData[] = [
  {
    nama: "Bapak Ahmad Wijaya",
    tahun: "Orang Tua Siswa Kelas 8",
    testimoni: "Alhamdulillah, anak saya berkembang pesat di SMP Muhammadiyah Al Kautsar. Pendidikan agama dan akademiknya sangat seimbang, guru-gurunya juga sangat kompeten.",
    avatar: "👨‍💼"
  },
  {
    nama: "Ibu Siti Fatimah",
    tahun: "Orang Tua Alumni 2023",
    testimoni: "Guru-guru di Al Kautsar sangat perhatian dan sabar dalam mendidik. Anak saya jadi lebih mandiri, berakhlak mulia, dan siap melanjutkan ke jenjang SMA.",
    avatar: "👩‍🎓"
  },
  {
    nama: "Bapak Dedi Kurniawan",
    tahun: "Orang Tua Siswa Kelas 7",
    testimoni: "Program tahfidz di Al Kautsar sangat bagus. Anak saya sudah hafal 5 juz dalam setahun. Fasilitas sekolahnya juga modern dan mendukung pembelajaran.",
    avatar: "👨‍🏫"
  },
  {
    nama: "Ibu Rina Sari",
    tahun: "Orang Tua Siswa Kelas 9",
    testimoni: "Prestasi akademik anak saya meningkat drastis sejak bersekolah di Al Kautsar. Metode pembelajaran yang diterapkan sangat efektif dan menyenangkan.",
    avatar: "👩‍💻"
  },
  {
    nama: "Bapak Hendra Pratama",
    tahun: "Orang Tua Alumni 2022",
    testimoni: "Al Kautsar tidak hanya fokus pada akademik, tapi juga pengembangan karakter islami. Anak saya sekarang lebih disiplin dan bertanggung jawab.",
    avatar: "👨‍🎓"
  },
  {
    nama: "Ibu Dewi Lestari",
    tahun: "Orang Tua Siswa Kelas 8",
    testimoni: "Ekstrakurikuler di Al Kautsar sangat beragam. Anak saya mengikuti robotika dan pramuka, kemampuan leadership-nya berkembang dengan baik.",
    avatar: "👩‍💼"
  },
  {
    nama: "Bapak Rizki Ananda",
    tahun: "Orang Tua Siswa Kelas 7",
    testimoni: "Komunikasi antara sekolah dan orang tua sangat baik. Kami selalu mendapat laporan perkembangan anak secara berkala dan detail.",
    avatar: "👨‍💻"
  },
  {
    nama: "Ibu Nurul Hidayah",
    tahun: "Orang Tua Alumni 2024",
    testimoni: "Terima kasih Al Kautsar telah mendidik anak saya dengan baik. Sekarang dia diterima di SMA favorit dengan nilai yang memuaskan.",
    avatar: "👩‍🎓"
  }
]

// Fixed positions for each card with random spread - avoiding center
const generateCardPositions = () => {
  const basePositions = [
    // Top corners - far from center
    { x: -800, y: -500 },
    { x: 800, y: -500 },
    // Middle sides - far left and right
    { x: -1000, y: -200 },
    { x: 1000, y: -200 },
    { x: -1000, y: 200 },
    { x: 1000, y: 200 },
    // Bottom corners - far from center
    { x: -800, y: 500 },
    { x: 800, y: 500 },
  ]
  
  return basePositions.map(pos => ({
    x: pos.x + (Math.random() * 100 - 50),
    y: pos.y + (Math.random() * 100 - 50),
  }))
}

const cardPositions = generateCardPositions()

export default function TestimoniSection() {
  const [testimoniData, setTestimoniData] = useState<TestimoniData[]>(fallbackTestimoniData)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const sections = await homeApi.byType('testimonials')
        const [testi] = sections as HomeSection[]
        const arr = (testi?.config_data?.testimonials || []) as Array<{ nama: string; tahun: string; testimoni: string; avatar?: string }>
        if (mounted && Array.isArray(arr) && arr.length > 0) {
          setTestimoniData(arr.map(t => ({
            nama: t.nama,
            tahun: t.tahun,
            testimoni: t.testimoni,
            avatar: t.avatar || '⭐',
          })))
        }
      } catch {
        // keep fallback
      }
    })()
    return () => { mounted = false }
  }, [])

  // Auto cycle through cards with camera pan
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => {
        const nextIndex = (prev + 1) % testimoniData.length
        
        // Pan camera to next card position
        const nextPos = cardPositions[nextIndex % cardPositions.length]
        setCameraPosition({
          x: -nextPos.x,
          y: -nextPos.y
        })
        
        return nextIndex
      })
    }, 4000) // Change every 4 seconds

    // Initialize camera to first card
    const firstPos = cardPositions[0]
    setCameraPosition({
      x: -firstPos.x,
      y: -firstPos.y
    })

    return () => clearInterval(interval)
  }, [testimoniData.length])

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Container - Full Screen with Beams */}
      <div className="relative isolate min-h-screen w-full overflow-hidden">
        {/* Beams Background */}
        <div className="absolute inset-0">
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#14dee1"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>

        {/* Cards Container with Camera Pan */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: cameraPosition.x,
            y: cameraPosition.y,
          }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          {testimoniData.map((testimoni, idx) => {
            const pos = cardPositions[idx % cardPositions.length]
            const isHighlighted = idx === highlightedIndex
            
            return (
              <motion.div
                key={idx}
                className="absolute origin-center overflow-hidden rounded-xl bg-white p-5 shadow-lg ring-1 ring-black/5"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  width: '360px',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: isHighlighted ? 1.15 : 0.85,
                  opacity: isHighlighted ? 1 : 0.3,
                  zIndex: isHighlighted ? 50 : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {testimoni.testimoni}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                      {testimoni.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-neutral-700 block">{testimoni.nama}</span>
                      <span className="text-xs text-neutral-500">{testimoni.tahun}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Center Content Overlay - Fixed at top */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-[100] pt-16 pb-32">
          <div className="pointer-events-auto">
            <div className="flex flex-col items-center justify-center px-4">
              <motion.h1 
                className="text-4xl font-medium tracking-tight text-white md:text-6xl text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Dipercaya oleh ribuan <br /> orang tua siswa
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-md text-base text-white/80 md:text-lg text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Berikut ini adalah testimoni orang tua siswa kami untuk mendidik putra-putri tercinta.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
