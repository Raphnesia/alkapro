'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useI18n } from '@/hooks/useI18n'

type EkstrakurikulerType = 'olahraga' | 'seni' | 'teknologi'

const EkstrakurikulerSection = () => {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<EkstrakurikulerType>('olahraga')
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setActiveCategory(prev => {
        if (prev === 'olahraga') return 'seni'
        if (prev === 'seni') return 'teknologi'
        return 'olahraga'
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoplay])

  const handleTabClick = useCallback((tab: EkstrakurikulerType) => {
    setActiveCategory(tab)
    setIsAutoplay(false)
    
    setTimeout(() => {
      setIsAutoplay(true)
    }, 15000)
  }, [])

  const categories = useMemo(() => ({
    olahraga: {
      title: t('extracurricular.sports.title'),
      subtitle: t('extracurricular.sports.subtitle'),
      background: 'from-emerald-400 via-green-500 to-teal-500',
      accentColor: 'emerald',
      icon: '🏆',
      activities: [
        { 
          icon: '🏹', 
          text: t('extracurricular.sports.activities.archery.name'),
          description: t('extracurricular.sports.activities.archery.description'),
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.sports.activities.archery.level'),
          schedule: t('extracurricular.sports.activities.archery.schedule')
        },
        { 
          icon: '🏀', 
          text: t('extracurricular.sports.activities.basketball.name'),
          description: t('extracurricular.sports.activities.basketball.description'),
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.sports.activities.basketball.level'),
          schedule: t('extracurricular.sports.activities.basketball.schedule')
        },
        { 
          icon: '⚽', 
          text: t('extracurricular.sports.activities.futsal.name'),
          description: t('extracurricular.sports.activities.futsal.description'),
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.sports.activities.futsal.level'),
          schedule: t('extracurricular.sports.activities.futsal.schedule')
        },
        { 
          icon: '🏸', 
          text: t('extracurricular.sports.activities.badminton.name'),
          description: t('extracurricular.sports.activities.badminton.description'),
          image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.sports.activities.badminton.level'),
          schedule: t('extracurricular.sports.activities.badminton.schedule')
        },
        { 
          icon: '🏊', 
          text: t('extracurricular.sports.activities.swimming.name'),
          description: t('extracurricular.sports.activities.swimming.description'),
          image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.sports.activities.swimming.level'),
          schedule: t('extracurricular.sports.activities.swimming.schedule')
        },
        { 
          icon: '🥋', 
          text: t('extracurricular.sports.activities.karate.name'),
          description: t('extracurricular.sports.activities.karate.description'),
          image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.sports.activities.karate.level'),
          schedule: t('extracurricular.sports.activities.karate.schedule')
        }
      ]
    },
    seni: {
      title: t('extracurricular.arts.title'),
      subtitle: t('extracurricular.arts.subtitle'),
      background: 'from-cyan-400 via-blue-400 to-indigo-500',
      accentColor: 'cyan',
      icon: '🎨',
      activities: [
        { 
          icon: '��', 
          text: t('extracurricular.arts.activities.vocal.name'),
          description: t('extracurricular.arts.activities.vocal.description'),
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.arts.activities.vocal.level'),
          schedule: t('extracurricular.arts.activities.vocal.schedule')
        },
        { 
          icon: '🎨', 
          text: t('extracurricular.arts.activities.graphicDesign.name'),
          description: t('extracurricular.arts.activities.graphicDesign.description'),
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.arts.activities.graphicDesign.level'),
          schedule: t('extracurricular.arts.activities.graphicDesign.schedule')
        },
        { 
          icon: '🍳', 
          text: t('extracurricular.arts.activities.cooking.name'),
          description: t('extracurricular.arts.activities.cooking.description'),
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.arts.activities.cooking.level'),
          schedule: t('extracurricular.arts.activities.cooking.schedule')
        },
        { 
          icon: '💃', 
          text: t('extracurricular.arts.activities.dance.name'),
          description: t('extracurricular.arts.activities.dance.description'),
          image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.arts.activities.dance.level'),
          schedule: t('extracurricular.arts.activities.dance.schedule')
        },
        { 
          icon: '🎭', 
          text: t('extracurricular.arts.activities.theater.name'),
          description: t('extracurricular.arts.activities.theater.description'),
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.arts.activities.theater.level'),
          schedule: t('extracurricular.arts.activities.theater.schedule')
        },
        { 
          icon: '🎸', 
          text: t('extracurricular.arts.activities.music.name'),
          description: t('extracurricular.arts.activities.music.description'),
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.arts.activities.music.level'),
          schedule: t('extracurricular.arts.activities.music.schedule')
        }
      ]
    },
    teknologi: {
      title: t('extracurricular.technology.title'),
      subtitle: t('extracurricular.technology.subtitle'),
      background: 'from-emerald-400 via-teal-500 to-cyan-500',
      accentColor: 'emerald',
      icon: '💻',
      activities: [
        { 
          icon: '♟️', 
          text: t('extracurricular.technology.activities.chess.name'),
          description: t('extracurricular.technology.activities.chess.description'),
          image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.technology.activities.chess.level'),
          schedule: t('extracurricular.technology.activities.chess.schedule')
        },
        { 
          icon: '💻', 
          text: t('extracurricular.technology.activities.coding.name'),
          description: t('extracurricular.technology.activities.coding.description'),
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=400&fit=crop&crop=center',
          level: t('extracurricular.technology.activities.coding.level'),
          schedule: t('extracurricular.technology.activities.coding.schedule')
        }
      ]
    }
  }), [])

  const currentCategory = categories[activeCategory]

  return (
    <div className={`py-24 bg-gradient-to-br ${currentCategory.background} relative overflow-hidden transition-all duration-1000`}>
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Islamic Geometric Pattern */}
         <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='islamic-pattern' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.6'%3E%3Cpath d='M30,0 L45,15 L30,30 L15,15 Z'/%3E%3Cpath d='M0,30 L15,45 L30,30 L15,15 Z'/%3E%3Cpath d='M30,30 L45,45 L30,60 L15,45 Z'/%3E%3Cpath d='M60,30 L45,45 L30,30 L45,15 Z'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none'/%3E%3Cpath d='M22,22 L38,38 M38,22 L22,38'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='120' height='120' fill='url(%23islamic-pattern)'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
        </div>
        
        {/* Crescent and Star Pattern */}
         <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='crescent-star' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cg fill='%23ffffff' opacity='0.4'%3E%3Cpath d='M40,20 C35,20 30,25 30,30 C30,35 35,40 40,40 C37,40 35,37 35,33 C35,29 37,26 40,26 Z'/%3E%3Cpath d='M45,25 L47,30 L52,30 L48,33 L50,38 L45,35 L40,38 L42,33 L38,30 L43,30 Z'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23crescent-star)'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Simplified Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/8 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/10 rounded-full blur-md"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/12 rounded-full blur-sm"></div>
        
        {/* Decorative Illustration */}
        <div className="shape-illustration bottom-left">
          <img src="/ilustrasi/lanang.png" alt="Student Illustration" />
        </div>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <div className="text-center">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">{currentCategory.icon}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-ubuntu">
              {t('extracurricular.title')}
            </h2>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t('extracurricular.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/15 backdrop-blur-lg rounded-2xl p-3 flex space-x-3 shadow-2xl border border-white/20"
          >
            <motion.button
              onClick={() => handleTabClick('olahraga')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === 'olahraga'
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105 border-2 border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/20 hover:shadow-lg border-2 border-transparent'
              }`}
            >
              <span className="text-xl">🏆</span>
              <span className="text-sm md:text-base">{t('extracurricular.sports.name')}</span>
              {activeCategory === 'olahraga' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => handleTabClick('seni')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === 'seni'
                  ? 'bg-purple-500 text-white shadow-lg transform scale-105 border-2 border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/20 hover:shadow-lg border-2 border-transparent'
              }`}
            >
              <span className="text-xl">🎨</span>
              <span className="text-sm md:text-base">{t('extracurricular.arts.name')}</span>
              {activeCategory === 'seni' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => handleTabClick('teknologi')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === 'teknologi'
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105 border-2 border-white/30'
                  : 'text-white/80 hover:text-white hover:bg-white/20 hover:shadow-lg border-2 border-transparent'
              }`}
            >
              <span className="text-xl">💻</span>
              <span className="text-sm md:text-base">{t('extracurricular.technology.name')}</span>
              {activeCategory === 'teknologi' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Category Title and Subtitle */}
        <AnimatePresence mode="wait">
          <div
            key={activeCategory}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-1 bg-white/60 mr-4 rounded-full`}></div>
              <span className="text-5xl">{currentCategory.icon}</span>
              <div className={`w-16 h-1 bg-white/60 ml-4 rounded-full`}></div>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-ubuntu">
              {currentCategory.title}
            </h3>
            
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {currentCategory.subtitle}
            </p>
            
            <div className={`w-32 h-1 bg-white/80 mx-auto mt-6 rounded-full`}></div>
          </div>
        </AnimatePresence>
        
        {/* Activities Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentCategory.activities.map((activity, index) => (
              <motion.div
                key={activity.text}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group cursor-pointer"
              >
                <div className="relative group/card">
                  {/* Modern Glassmorphism Card */}
                  <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/30 group-hover:border-white/50">
                    {/* Dynamic Gradient Border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    {/* Inner Card */}
                    <div className="relative bg-gradient-to-br from-white/15 via-white/8 to-white/5 backdrop-blur-2xl rounded-3xl p-6 h-full">
                      {/* Floating Particles */}
                      <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse"></div>
                      <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-bounce"></div>
                      
                      {/* Holographic Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                      
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Image Section with Modern Frame */}
                        <div className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl group-hover:shadow-cyan-500/20 transition-all duration-500">
                          {/* Image Container */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={activity.image}
                              alt={activity.text}
                              width={500}
                              height={400}
                              loading="lazy"
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            
                            {/* Dynamic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                            
                            {/* Holographic Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                          </div>
                          
                          {/* Floating Icon with Glow */}
                          <div className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/40 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-cyan-400/30">
                            <span className="text-2xl filter drop-shadow-lg">{activity.icon}</span>
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          
                          {/* Status Indicator */}
                          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                            <span className="text-white/90 text-xs font-medium">Active</span>
                          </div>
                        </div>
                        
                        {/* Text Content with Modern Typography */}
                        <div className="space-y-4 flex-1 flex flex-col">
                          <div className="space-y-3">
                            <h4 className="text-white font-bold text-xl leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-500">
                              {activity.text}
                            </h4>
                            
                            <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/95 transition-colors duration-500 line-clamp-3">
                              {activity.description}
                            </p>
                          </div>
                          
                          {/* Modern Activity Details */}
                          <div className="mt-auto space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
                                  <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-30"></div>
                                </div>
                                <span className="text-white/80 text-xs font-medium">{activity.level}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                <span className="text-white/70 text-xs font-medium">{activity.schedule}</span>
                              </div>
                            </div>
                            
                            {/* Interactive Progress Bar */}
                            <div className="relative">
                              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg shadow-purple-400/50"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Modern Background Elements */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-80 transition-all duration-700"></div>
                      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl group-hover:scale-125 group-hover:opacity-70 transition-all duration-500"></div>
                      
                      {/* Mesh Gradient Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-3xl" style={{
                        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)'
                      }}></div>
                    </div>
                  </div>
                  
                  {/* External Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* View All Button */}
        <div className="text-center">
          <button className="relative bg-white/20 backdrop-blur-lg text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-white/30 hover:scale-105">
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
            
            {/* Button Content */}
            <div className="relative z-10 flex items-center space-x-3">
              <span>{t('extracurricular.viewAll')}</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EkstrakurikulerSection