'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function HubungiKamiPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl">
              <Mail className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>
              Thank You for Your Interest in{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                SMP Muhammadiyah Al Kautsar PK
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kami berdedikasi untuk mendukung perjalanan pendidikan setiap siswa dan siap menjawab pertanyaan Anda 
              mengenai penerimaan siswa baru, kurikulum, kegiatan ekstrakurikuler, dan lainnya. Silakan hubungi kami 
              melalui telepon, email, atau kunjungi kampus kami secara langsung. Tim kami yang ramah dan profesional 
              siap membantu Anda di setiap langkah. Mari bersama-sama menginspirasi masa depan yang lebih cerah untuk siswa kami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>Get in touch with us</h2>
              <p className="text-gray-600 mb-8">
                Kami senang mendengar dari Anda! Apakah Anda memiliki pertanyaan tentang program akademik kami, 
                proses penerimaan, atau acara sekolah, jangan ragu untuk menghubungi kami.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:info@alkapro.sch.id"
                  className="group flex items-center gap-4 p-6 bg-gradient-to-r from-white via-green-50 to-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-orange-600 font-semibold mb-1">Email us</p>
                    <p className="text-gray-900 font-semibold">info@alkapro.sch.id</p>
                  </div>
                  <Send className="w-5 h-5 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-6 bg-gradient-to-r from-white via-green-50 to-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-orange-600 font-semibold mb-1">WhatsApp Chat</p>
                    <p className="text-gray-900 font-semibold">0812 3456 7890</p>
                  </div>
                  <Send className="w-5 h-5 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Location */}
                <a
                  href="https://maps.google.com/?q=SMP+Muhammadiyah+Al+Kautsar+PK+Kartasura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-6 bg-gradient-to-r from-white via-green-50 to-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-orange-600 font-semibold mb-1">Locations</p>
                    <p className="text-gray-900 font-semibold">Get Directions</p>
                  </div>
                  <Send className="w-5 h-5 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Office Hours */}
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-green-700 font-semibold mb-1">Jam Operasional</p>
                    <p className="text-gray-900 font-semibold">Senin - Jumat: 07:00 - 16:00</p>
                    <p className="text-gray-700 text-sm">Sabtu: 07:00 - 12:00</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <p className="text-gray-900 font-semibold mb-4" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>Follow Us</p>
                <div className="flex gap-3">
                  <a href="#" className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg flex items-center justify-center text-blue-600 hover:text-blue-700 transition-all hover:scale-110">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all hover:scale-110">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg flex items-center justify-center text-red-600 hover:text-red-700 transition-all hover:scale-110">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg flex items-center justify-center text-blue-400 hover:text-blue-500 transition-all hover:scale-110">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Silakan isi formulir di bawah ini untuk pertanyaan mengenai penerimaan, kurikulum, 
                  atau kegiatan sekolah. Tim kami akan segera menghubungi Anda!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@gmail.com"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Place your question here"
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center">
                      Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.0!2d110.7!3d-7.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzAnMDAuMCJTIDExMMKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
