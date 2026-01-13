'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Animasi bertahap
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 500),
      setTimeout(() => setCurrentStep(2), 1200),
      setTimeout(() => setCurrentStep(3), 2000),
    ]

    const exitTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 800) // Delay untuk animasi keluar
    }, 4000) // Tampilkan splash screen selama 4 detik

    return () => {
      stepTimers.forEach(timer => clearTimeout(timer))
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-green-800 overflow-hidden"
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full opacity-20"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Glowing Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 text-center px-4">
            {/* Logo Animation - Much Larger */}
            <motion.div
              initial={{ scale: 0, rotate: -360, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 1 ? 1 : 0, 
                rotate: currentStep >= 1 ? 0 : -360,
                opacity: currentStep >= 1 ? 1 : 0
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="mb-8"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-6">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(34, 197, 94, 0.7)",
                      "0 0 20px rgba(59, 130, 246, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full rounded-full p-4 bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <Image
                    src="/LOGOSEKOLAH.png"
                    alt="Logo SMP Muhammadiyah Al Kautsar"
                    fill
                    className="object-contain drop-shadow-2xl p-2"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* School Name Animation */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: currentStep >= 2 ? 0 : 50, 
                opacity: currentStep >= 2 ? 1 : 0 
              }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                type: "spring",
                stiffness: 80
              }}
              className="text-white text-center mb-6"
            >
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-quicksand mb-3 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                SMP Muhammadiyah Al Kautsar
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-100"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                PK Kartasura
              </motion.p>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ 
                y: currentStep >= 3 ? 0 : 30, 
                opacity: currentStep >= 3 ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut"
              }}
              className="mb-8"
            >
              <motion.p 
                className="text-green-200 text-base md:text-lg lg:text-xl font-medium px-4"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Membentuk Generasi Berakhlak Mulia dan Berprestasi
              </motion.p>
            </motion.div>

            {/* Modern Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center items-center space-x-1"
            >
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Progress Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="flex justify-center space-x-2 mt-6"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: currentStep > index ? "#ffffff" : "#ffffff40",
                    scale: currentStep === index + 1 ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: currentStep === index + 1 ? Infinity : 0
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen