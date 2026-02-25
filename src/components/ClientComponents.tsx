'use client'

import dynamic from 'next/dynamic'

// Lazy load komponen yang berat dengan ssr: false
export const BentoGrid = dynamic(() => import('./MagicUIAnimations').then(mod => ({ default: mod.BentoGrid })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-xl"></div>,
  ssr: false
})

export const BentoCard = dynamic(() => import('./MagicUIAnimations').then(mod => ({ default: mod.BentoCard })), {
  ssr: false
})

export const InteractiveGridPattern = dynamic(() => import('./MagicUIAnimations').then(mod => ({ default: mod.InteractiveGridPattern })), {
  ssr: false
})