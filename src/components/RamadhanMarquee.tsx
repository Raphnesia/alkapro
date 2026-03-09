'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

export default function RamadhanMarquee() {
  const items = [
    {
      icon: '🕌',
      text: 'Selamat Menjalani Ibadah Puasa 1447 H'
    },
    {
      icon: '🌙',
      text: 'Selamat Hari Raya Idul Fitri 1447 H'
    },
    {
      icon: '🕌',
      text: 'Selamat Menjalani Ibadah Puasa 1447 H'
    },
    {
      icon: '🌙',
      text: 'Selamat Hari Raya Idul Fitri 1447 H'
    },
  ]

  return (
    <section className="py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 overflow-hidden">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mx-8"
          >
            <span className="text-2xl">{item.icon}</span>
            <p className="text-white text-base font-semibold whitespace-nowrap">
              {item.text}
            </p>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
