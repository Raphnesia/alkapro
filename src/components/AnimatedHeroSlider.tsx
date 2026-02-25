'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type SliderItem = {
  id?: string | number
  image: string
  title?: string
  subtitle?: string
}

type AnimatedHeroSliderProps = {
  slides: SliderItem[]
  autoPlayMs?: number
  heightClass?: string
  overlay?: React.ReactNode
}

export default function AnimatedHeroSlider({
  slides,
  autoPlayMs = 5000,
  heightClass = 'min-h-[80vh]',
  overlay,
}: AnimatedHeroSliderProps) {
  const items = useMemo(() => slides.filter(Boolean), [slides])
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (items.length <= 1) return
    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, autoPlayMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [items.length, autoPlayMs])

  const goTo = (i: number) => setIndex(((i % items.length) + items.length) % items.length)
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  if (!items.length) return null

  return (
    <section className={`relative w-full overflow-hidden ${heightClass}`}>
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={items[index]?.image || index}
            src={items[index].image}
            alt={items[index]?.title || `slide-${index}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </AnimatePresence>
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="w-full max-w-7xl">
          {overlay}
        </div>
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 grid place-items-center"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 grid place-items-center"
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {items.map((s, i) => (
            <button
              key={s.id || i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}


