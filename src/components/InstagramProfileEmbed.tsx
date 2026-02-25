'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink } from 'lucide-react'

export default function InstagramProfileEmbed() {
  const username = 'smpmuh.alkautsarpk'

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
            Lihat aktivitas dan kegiatan terbaru SMP Muhammadiyah Al Kautsar PK
          </p>
        </motion.div>

        {/* Instagram Embed Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            {/* Instagram Widget Placeholder */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-8 text-center">
              <Instagram className="w-16 h-16 mx-auto mb-4 text-pink-400" />
              <h3 className="text-2xl font-bold text-white mb-2">@{username}</h3>
              <p className="text-gray-300 mb-6">
                Klik tombol di bawah untuk melihat feed Instagram kami
              </p>
              
              {/* Direct Link to Instagram */}
              <a
                href={`https://www.instagram.com/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <Instagram className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Lihat Instagram Kami
                <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Instagram Grid Preview */}
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mt-8 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6"
        >
          <h4 className="text-white font-bold mb-2 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Cara Menampilkan Feed Instagram:
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• <strong>Opsi 1:</strong> Gunakan widget pihak ketiga seperti Juicer.io, SnapWidget, atau Behold.so</li>
            <li>• <strong>Opsi 2:</strong> Embed post individual (perlu update manual URL post)</li>
            <li>• <strong>Opsi 3:</strong> Gunakan Instagram Basic Display API (perlu setup Facebook Developer)</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
