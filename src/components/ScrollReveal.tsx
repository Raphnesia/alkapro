'use client'

import { ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  preserveLayout?: boolean
}

export const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 600,
  preserveLayout = false
}: ScrollRevealProps) => {
  const [ref, isVisible] = useScrollReveal()

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`
      case 'down':
        return `translateY(-${distance}px)`
      case 'left':
        return `translateX(${distance}px)`
      case 'right':
        return `translateX(-${distance}px)`
      default:
        return `translateY(${distance}px)`
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        transform: isVisible ? 'translate(0)' : getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        // Memastikan tidak mengganggu layout flow
        display: 'block',
        width: '100%',
        height: 'auto',
        position: 'relative'
      }}
    >
      {children}
    </div>
  )
}