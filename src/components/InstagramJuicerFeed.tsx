'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink } from 'lucide-react'
import Script from 'next/script'

export default function InstagramJuicerFeed() {
  const juicerFeedId = 'smpmuh-alkautsarpk' // Ganti dengan Feed Name dari Juicer.io

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 text-white rounded-2xl text-sm font-medium mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
            <Instagram className="w-5 h-5 mr-2" />
            Ikuti Kami di Instagram
            <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              Instagram Feed
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Lihat aktivitas dan kegiatan terbaru @smpmuh.alkautsarpk
          </p>
        </motion.div>

        {/* Juicer Feed Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            {/* Juicer Feed Widget */}
            <ul className="juicer-feed" data-feed-id={juicerFeedId} data-per="12" data-pages="1"></ul>
          </div>
        </motion.div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/smpmuh.alkautsarpk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 group"
          >
            <Instagram className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
            Follow @smpmuh.alkautsarpk
            <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Setup Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto mt-8 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6"
        >
          <h4 className="text-white font-bold mb-3 flex items-center text-lg">
            <span className="text-2xl mr-2">📋</span>
            Cara Setup Juicer.io:
          </h4>
          <ol className="text-gray-300 space-y-3 text-sm">
            <li className="flex items-start">
              <span className="font-bold text-pink-400 mr-2">1.</span>
              <span>Kunjungi <a href="https://www.juicer.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">juicer.io</a> dan buat akun gratis</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-pink-400 mr-2">2.</span>
              <span>Klik &quot;Create a New Feed&quot; dan beri nama (contoh: smpmuh-alkautsarpk)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-pink-400 mr-2">3.</span>
              <span>Tambahkan Instagram source dengan username: <strong className="text-white">smpmuh.alkautsarpk</strong></span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-pink-400 mr-2">4.</span>
              <span>Copy &quot;Feed Name&quot; dari dashboard Juicer</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-pink-400 mr-2">5.</span>
              <span>Ganti <code className="bg-white/10 px-2 py-1 rounded text-pink-300">juicerFeedId</code> di komponen ini dengan Feed Name Anda</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-pink-400 mr-2">6.</span>
              <span>Tambahkan script Juicer ke layout.tsx (lihat instruksi di bawah)</span>
            </li>
          </ol>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto mt-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
        >
          <h4 className="text-white font-bold mb-3 text-sm">Tambahkan ke src/app/layout.tsx:</h4>
          <pre className="text-gray-300 text-xs overflow-x-auto bg-black/30 p-4 rounded-lg">
{`<Script
  src="https://assets.juicer.io/embed.js"
  strategy="lazyOnload"
/>`}
          </pre>
        </motion.div>
      </div>

      {/* Load Juicer Script */}
      <Script
        src="https://assets.juicer.io/embed.js"
        strategy="lazyOnload"
      />
    </section>
  )
}
