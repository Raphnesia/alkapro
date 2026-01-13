import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fallback: Make content visible after a short delay if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer)
          setIsVisible(true)
          // Unobserve after animation triggers (optional)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      clearTimeout(fallbackTimer)
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible] as const
}
