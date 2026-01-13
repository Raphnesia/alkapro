'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Marquee } from './MagicUIAnimations'
import { ScrollReveal } from './ScrollReveal'
import { homeApi, HomeSection } from '@/lib/api'

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

export default function TestimoniSection() {
  const [testimoniData, setTestimoniData] = useState<TestimoniData[]>(fallbackTestimoniData)

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
      } catch (_) {
        // keep fallback
      }
    })()
    return () => { mounted = false }
  }, [])

  const leftTestimonis = testimoniData.slice(0, 4)
  const rightTestimonis = testimoniData.slice(4, 8)

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden">
      {/* Decorative Illustration */}
      <div className="shape-illustration bottom-left">
        <img src="/ilustrasi/puteri.png" alt="Student Testimonial Illustration" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Modern Bento Grid Container */}
        <ScrollReveal delay={200}>
          <div className="bg-primary rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[300px]">
              {/* Left Content */}
              <ScrollReveal delay={300} direction="left">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="p-8 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-800"
                >
                  <div className="space-y-8">
                    {/* Badge */}
                    <ScrollReveal delay={400}>
                      <div className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium mb-6">
                        <span className="mr-2">⭐</span>
                        5000+ Orang Tua Puas
                      </div>
                    </ScrollReveal>

                    {/* Main Heading */}
                    <ScrollReveal delay={500}>
                      <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-quicksand">
                          Apa yang dikatakan para Abi dan Bunda tentang Al Kautsar?
                        </h2>
                        
                        <p className="text-lg text-white leading-relaxed font-quicksand">
                          Kami bangga dengan kepercayaan para orang tua yang telah menyekolahkan putra-putrinya di SMP Muhammadiyah Al Kautsar PK Kartasura. Berikut testimoni dan pengalaman mereka.
                        </p>
                      </div>
                    </ScrollReveal>

                    {/* Decorative Element */}
                    <ScrollReveal delay={600}>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <div className="w-4 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                      </div>
                    </ScrollReveal>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Right Content - Responsive Marquee */}
              <ScrollReveal delay={400} direction="right">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 h-[300px]"
                >
                  {/* Mobile: Single Marquee */}
                  <div className="h-full w-full lg:hidden">
                    <Marquee
                      className="h-full w-full"
                      pauseOnHover
                      vertical
                      repeat={true}
                    >
                      {testimoniData.map((testimoni, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 mx-0.5 my-1 w-full border border-gray-100 backdrop-blur-sm"
                        >
                          {/* Header */}
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                              {testimoni.avatar}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-xs">{testimoni.nama}</h4>
                              <p className="text-xs text-gray-500">{testimoni.tahun}</p>
                            </div>
                          </div>
                          
                          {/* Testimoni Text */}
                          <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                            {testimoni.testimoni}
                          </p>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center mt-2 space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs">⭐</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </Marquee>
                  </div>

                  {/* Desktop: Dual Dynamic Marquee */}
                  <div className="hidden lg:grid lg:grid-cols-2 h-full">
                    {/* Left Marquee - Moving Up */}
                    <Marquee
                      className="h-full"
                      pauseOnHover
                      vertical
                      repeat={true}
                    >
                      {leftTestimonis.map((testimoni, index) => (
                        <motion.div
                          key={`${testimoni.nama}-${index}`}
                          className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 mx-0.5 my-1 w-full border border-gray-100 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Header */}
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                              {testimoni.avatar}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-xs">{testimoni.nama}</h4>
                              <p className="text-xs text-gray-500">{testimoni.tahun}</p>
                            </div>
                          </div>
                          
                          {/* Testimoni Text */}
                          <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                            {testimoni.testimoni}
                          </p>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center mt-2 space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs">⭐</span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </Marquee>

                    {/* Right Marquee - Moving Down */}
                    <Marquee
                      className="h-full"
                      pauseOnHover
                      vertical
                      reverse
                      repeat={true}
                    >
                      {rightTestimonis.map((testimoni, index) => (
                        <motion.div
                          key={`${testimoni.nama}-${index}`}
                          className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 mx-0.5 my-1 w-full border border-gray-100 backdrop-blur-sm"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Header */}
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                              {testimoni.avatar}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-xs">{testimoni.nama}</h4>
                              <p className="text-xs text-gray-500">{testimoni.tahun}</p>
                            </div>
                          </div>
                          
                          {/* Testimoni Text */}
                          <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                            {testimoni.testimoni}
                          </p>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center mt-2 space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs">⭐</span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </Marquee>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}