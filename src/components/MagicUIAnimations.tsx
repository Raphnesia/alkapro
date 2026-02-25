'use client'

import { useState, useEffect } from 'react'
import React from 'react'

interface TypingAnimationProps {
  text: string
  className?: string
  duration?: number
  repeat?: boolean
}

export function TypingAnimation({ text, className = '', duration = 100, repeat = true }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(text.slice(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
      } else if (!isDeleting && currentIndex === text.length && repeat) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && currentIndex === 0 && repeat) {
        setTimeout(() => setIsDeleting(false), 500)
      }
    }, isDeleting ? duration / 2 : duration)

    return () => clearTimeout(timer)
  }, [currentIndex, isDeleting, text, duration, repeat])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface FlipTextProps {
  text: string
  className?: string
  duration?: number
  repeat?: boolean
}

export function FlipText({ text, className = '', duration = 3000, repeat = true }: FlipTextProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!repeat) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIsVisible(true)
      }, 300) // Durasi animasi fade
    }, duration)

    return () => clearInterval(interval)
  }, [duration, repeat])

  return (
    <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'} ${className}`}>
      {text}
    </div>
  )
}

interface WordRotateProps {
  words: string[]
  className?: string
  duration?: number
}

export function WordRotate({ words, className = '', duration = 2500 }: WordRotateProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration])

  return (
    <span className={`transition-all duration-500 ${className}`}>
      {words[currentWordIndex]}
    </span>
  )
}

interface InteractiveGridPatternProps {
  width?: number
  height?: number
  numSquares?: number
  className?: string
}

export function InteractiveGridPattern({ 
  width = 120, // Perbesar grid drastis
  height = 120, 
  numSquares = 3, // Kurangi ke minimum
  className = '' 
}: InteractiveGridPatternProps) {
  const [squares, setSquares] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])

  useEffect(() => {
    // Delay initial render
    const timeout = setTimeout(() => {
      const generateSquares = () => {
        const newSquares = []
        for (let i = 0; i < numSquares; i++) {
          newSquares.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0.1 // Fixed low opacity
          })
        }
        setSquares(newSquares)
      }

      generateSquares()
      const interval = setInterval(generateSquares, 10000) // 10 detik

      return () => clearInterval(interval)
    }, 1000) // Delay 1 detik

    return () => clearTimeout(timeout)
  }, [numSquares])

  return (
    <svg
      className={`absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {squares.map((square) => (
        <rect
          key={square.id}
          x={`${square.x}%`}
          y={`${square.y}%`}
          width={width}
          height={height}
          fill="#fbbf24"
          opacity={square.opacity}
        />
      ))}
    </svg>
  )
}

// Bento Grid Components
interface BentoCardProps {
  name: string
  description: string
  background: React.ReactNode
  className?: string
  href?: string
  cta?: string
}

// Shine Border Component
interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  borderRadius?: number
  borderWidth?: number
  duration?: number
}

// Shine Border Component with Performance Optimization
export function ShineBorder({
  children,
  className = '',
  borderRadius = 12,
  borderWidth = 1,
  duration = 16 // Perlambat animasi
}: ShineBorderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        padding: `${borderWidth}px`
      }}
    >
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `conic-gradient(from 0deg, 
            #ff0000 0%, #ffff00 25%, #00ff00 50%, #00ffff 75%, #ff0000 100%)`, // Simplified gradient
          animation: `shine ${duration}s linear infinite`,
          willChange: 'auto'
        }}
      />
      <div
        className="relative z-10 h-full w-full rounded-xl bg-white"
        style={{
          borderRadius: `${borderRadius - borderWidth}px`
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Optimized Bento Card
export function BentoCard({ name, description, background, className = '', href, cta }: BentoCardProps) {
  return (
    <ShineBorder className={`group ${className}`} duration={12}>
      <div className="relative overflow-hidden rounded-xl p-8 lg:p-10 h-64 lg:h-72 transition-all duration-300 ease-out hover:shadow-md bento-card">
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{name}</h3>
            <p className="text-base lg:text-lg text-gray-600 mb-4 leading-relaxed">{description}</p>
          </div>
          {cta && (
            <button className="text-blue-600 text-base lg:text-lg font-medium hover:text-blue-700 transition-colors duration-300 ease-out self-start">
              {cta} →
            </button>
          )}
        </div>
        <div className="absolute inset-0">
          {background}
        </div>
      </div>
    </ShineBorder>
  )
}

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 ${className}`}>
      {children}
    </div>
  )
}

// Video Background Component for Bento
interface VideoBackgroundProps {
  src: string
  className?: string
}

// Optimized Video Background Component
export function VideoBackground({ src, className = '' }: VideoBackgroundProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

// Box Reveal Animation Component - Optimized for Performance
interface BoxRevealProps {
  children: React.ReactNode
  width?: 'fit-content' | '100%'
  boxColor?: string
  duration?: number
  delay?: number
  className?: string
}

export function BoxReveal({ 
  children, 
  width = 'fit-content', 
  boxColor = '#5046e6', 
  duration = 0.3, // Reduced from 0.5s to 0.3s
  delay = 0,
  className = ''
}: BoxRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [slideVisible, setSlideVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideVisible(true)
      setTimeout(() => {
        setIsVisible(true)
      }, 150) // Reduced from 250ms to 150ms
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width,
        willChange: 'transform, opacity' // Performance optimization
      }}
    >
      <div
        className={`transition-all ease-out ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-[50px]'
        }`}
        style={{
          transitionDuration: `${duration}s`,
          transitionDelay: '0.15s', // Reduced from 0.25s
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </div>
      
      <div
        className={`absolute top-1 bottom-1 left-0 right-0 z-20 transition-transform ease-out ${
          slideVisible ? 'transform translate-x-full' : 'transform translate-x-0'
        }`}
        style={{
          background: boxColor,
          transitionDuration: `${duration}s`,
          willChange: 'transform'
        }}
      />
    </div>
  )
}

// Marquee Component for scrolling text
interface MarqueeProps {
  children: React.ReactNode
  className?: string
  pauseOnHover?: boolean
  vertical?: boolean
  reverse?: boolean
  repeat?: boolean
}

export function Marquee({ children, className = '', pauseOnHover = false, vertical = false, reverse = false, repeat = true }: MarqueeProps) {
  const getAnimationClass = () => {
    const suffix = repeat ? '' : '-once'
    if (vertical) {
      return reverse ? `animate-marquee-vertical-reverse${suffix}` : `animate-marquee-vertical${suffix}`
    }
    return reverse ? `animate-marquee-reverse${suffix}` : `animate-marquee${suffix}`
  }

  return (
    <div className={`${vertical ? 'flex flex-col h-full' : 'flex'} overflow-hidden ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''} ${className}`}>
      <div className={`${vertical ? 'flex flex-col h-full' : 'flex whitespace-nowrap'} ${getAnimationClass()}`}>
        {children}
        {/* Duplicate for seamless loop only if repeat is true */}
        {repeat && children}
      </div>
    </div>
  )
}