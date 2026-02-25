'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

export default function InstagramEmbedFeed() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 text-white rounded-2xl text-sm font-medium mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <Instagram className="w-5 h-5 mr-2" />
            Ikuti Kami di Instagram
            <div className="w-2 h-2 bg-cyan-400 rounded-full ml-3 animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              Instagram Feed
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Lihat aktivitas terbaru kami di Instagram @smpmuh.alkautsarpk
          </p>
        </motion.div>

        {/* Instagram Embed Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Instagram Post Embeds - Ganti URL dengan post terbaru dari akun */}
            {[
              'https://www.instagram.com/p/DVIxB3Gk4E_/',
              'https://www.instagram.com/p/DVGLqnVk2oG/',
              'https://www.instagram.com/p/DVDmiHfE_Xo/',
              'https://www.instagram.com/p/DVBALFbE-Xi/',
              'https://www.instagram.com/p/EXAMPLE5/',
              'https://www.instagram.com/p/EXAMPLE6/',
            ].map((url, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-green-500/20 transition-all duration-300"
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '3px',
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: '1px',
                    maxWidth: '540px',
                    minWidth: '326px',
                    padding: 0,
                    width: 'calc(100% - 2px)',
                  }}
                ></blockquote>
              </div>
            ))}
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
            <svg
              className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm">
            💡 Tip: Ganti URL post di komponen dengan post terbaru dari Instagram
          </p>
        </motion.div>
      </div>
    </section>
  )
}
