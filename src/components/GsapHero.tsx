'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

type CTA = { label?: string; url?: string }

type GsapHeroProps = {
  images: string[]
  heading: string
  subheading?: string
  primary?: CTA
  secondary?: CTA
  heightClass?: string
}

export default function GsapHero({
  images,
  heading,
  subheading,
  primary,
  secondary,
  heightClass = 'min-h-[80vh]'
}: GsapHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const overlayGroupRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.hero-bg',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      )
        .from('.hero-word', { y: 30, opacity: 0, duration: 0.7, stagger: 0.06 }, '-=0.6')
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from(btnRef.current?.children || [], { y: 16, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.4')

      // subtle ken-burns loop
      gsap.to('.hero-bg', { scale: 1.06, x: 20, duration: 12, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const bg = images?.[0]

  // pointer parallax for overlay group
  useEffect(() => {
    const el = overlayGroupRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      const dx = (e.clientX - w / 2) / (w / 2)
      const dy = (e.clientY - h / 2) / (h / 2)
      gsap.to(el, { x: dx * 10, y: dy * 8, duration: 0.4, ease: 'sine.out' })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section ref={rootRef as any} className={`relative w-full overflow-hidden ${heightClass}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={bg} alt="hero" className="hero-bg absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        {/* Ambient glow & noise */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_50%,black,transparent)] bg-white/5" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml;utf8, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '300px 300px' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div ref={overlayGroupRef} className="max-w-5xl will-change-transform">
          <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white leading-tight">
            {heading.split(' ').map((w, i) => (
              <span key={i} className="hero-word inline-block mr-2">{w}</span>
            ))}
          </h1>
          {subheading && (
            <p ref={subRef} className="mt-4 text-white/85 text-lg md:text-xl max-w-3xl">
              {subheading}
            </p>
          )}
          <div ref={btnRef} className="mt-8 flex flex-wrap gap-4">
            {primary?.label && (
              <button
                onClick={() => primary?.url && (window.location.href = primary.url)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
              >
                {primary.label}
              </button>
            )}
            {secondary?.label && (
              <button
                onClick={() => secondary?.url && (window.location.href = secondary.url)}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
              >
                {secondary.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


