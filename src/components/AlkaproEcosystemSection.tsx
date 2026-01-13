'use client'

import React, { useEffect, useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { useI18n } from '@/hooks/useI18n'
import { homeApi, HomeSection } from '@/lib/api'

const AlkaproEcosystemSection = () => {
  const { t } = useI18n();
  
  const [sectionTitle, setSectionTitle] = useState<string | null>(null)
  const [sectionContentHtml, setSectionContentHtml] = useState<string | null>(null)

  const [ecosystemApps, setEcosystemApps] = useState<any[]>([
    {
      id: 1,
      name: t('alkapro.apps.portal.name'),
      description: t('alkapro.apps.portal.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-1.png",
      url: "https://alkapro.dsd.co.id/",
      gradient: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      accent: "from-emerald-400 to-teal-500"
    },
    {
      id: 2,
      name: t('alkapro.apps.information_management.name'),
      description: t('alkapro.apps.information_management.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-2.png", 
      url: "https://sim-alkapro.dsd.co.id/",
      gradient: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
      accent: "from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      name: t('alkapro.apps.golden_habits.name'),
      description: t('alkapro.apps.golden_habits.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-3.png",
      url: "https://alkapro.dsd.co.id/gobit/",
      gradient: "bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900",
      accent: "from-amber-400 to-orange-500"
    },
    {
      id: 4,
      name: t('alkapro.apps.financial_info.name'),
      description: t('alkapro.apps.financial_info.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-4.png",
      url: "https://alkapro.dsd.co.id/siku/",
      gradient: "bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900",
      accent: "from-emerald-400 to-green-500"
    },
    {
      id: 5,
      name: t('alkapro.apps.digital_ebook.name'),
      description: t('alkapro.apps.digital_ebook.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-5.png",
      url: "https://ebook-alkapro.dsd.co.id/",
      gradient: "bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900",
      accent: "from-purple-400 to-violet-500"
    },
    {
      id: 6,
      name: t('alkapro.apps.smart.name'),
      description: t('alkapro.apps.smart.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-6.png",
      url: "https://alkapro.dsd.co.id/penilaian/",
      gradient: "bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900",
      accent: "from-cyan-400 to-blue-500"
    },
    {
      id: 7,
      name: t('alkapro.apps.smart_cbt.name'),
      description: t('alkapro.apps.smart_cbt.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-7.png",
      url: "http://alkautsarcbt.com/",
      gradient: "bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900",
      accent: "from-indigo-400 to-purple-500"
    },
    {
      id: 8,
      name: t('alkapro.apps.sikap.name'),
      description: t('alkapro.apps.sikap.description'),
      icon: "https://smpalmujahidin.sch.id/agung/assets/img/support/support-8.png",
      url: "https://smpam.site/sikap/",
      gradient: "bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900",
      accent: "from-teal-400 to-cyan-500"
    }
  ])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const sections = await homeApi.byType('alkapro_ecosystem')
        const [eco] = sections as HomeSection[]
        if (mounted) {
          setSectionTitle(eco?.title || null)
          setSectionContentHtml(eco?.content || null)

          const apps = (eco?.config_data?.apps || []) as Array<{ name: string; description: string; icon?: string; icon_upload?: string; url?: string; gradient?: string; accent?: string; card_theme?: string }>
          if (Array.isArray(apps) && apps.length > 0) {
            const themeMap: Record<string, { gradient: string; accent: string }> = {
              slate:   { gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',   accent: 'from-emerald-400 to-teal-500' },
              blue:    { gradient: 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900',   accent: 'from-blue-400 to-indigo-500' },
              amber:   { gradient: 'bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900', accent: 'from-amber-400 to-orange-500' },
              emerald: { gradient: 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900', accent: 'from-emerald-400 to-green-500' },
              purple:  { gradient: 'bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900', accent: 'from-purple-400 to-violet-500' },
              cyan:    { gradient: 'bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900',      accent: 'from-cyan-400 to-blue-500' },
              indigo:  { gradient: 'bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900',accent: 'from-indigo-400 to-purple-500' },
              teal:    { gradient: 'bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900',      accent: 'from-teal-400 to-cyan-500' },
            }

            setEcosystemApps(apps.map((a, i) => {
              const theme = a.card_theme && themeMap[a.card_theme] ? themeMap[a.card_theme] : undefined
              return {
                id: i + 1,
                name: a.name,
                description: a.description,
                icon: a.icon || a.icon_upload || 'https://smpalmujahidin.sch.id/agung/assets/img/support/support-1.png',
                url: a.url || '#',
                gradient: a.gradient || theme?.gradient || 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
                accent: a.accent || theme?.accent || 'from-emerald-400 to-teal-500',
              }
            }))
          }
        }
      } catch (_) {
        // keep fallback
      }
    })()
    return () => { mounted = false }
  }, [])

    return (
    <div className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-slate-100 overflow-hidden">
      {/* Decorative Illustration */}
      <div className="shape-illustration bottom-right">
        <img src="/ilustrasi/mosque.png" alt="Islamic School Illustration" />
      </div>
      {/* Authentic Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.08]">
        {/* Traditional Islamic Geometric Pattern - Khatam & Star-and-Cross */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="khatam-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Central 8-pointed Khatam Star (Seal of Solomon) */}
                <g transform="translate(40,40)">
                  <polygon 
                    points="0,-25 7,-7 25,0 7,7 0,25 -7,7 -25,0 -7,-7"
                    fill="currentColor"
                    className="text-emerald-600"
                  />
                  <polygon 
                    points="0,-15 4,-4 15,0 4,4 0,15 -4,4 -15,0 -4,-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-emerald-700"
                  />
                </g>
                
                {/* Corner Khatam elements */}
                <g transform="translate(10,10)">
                  <polygon 
                    points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3"
                    fill="currentColor"
                    className="text-teal-500"
                  />
                </g>
                <g transform="translate(70,10)">
                  <polygon 
                    points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3"
                    fill="currentColor"
                    className="text-teal-500"
                  />
                </g>
                <g transform="translate(10,70)">
                  <polygon 
                    points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3"
                    fill="currentColor"
                    className="text-teal-500"
                  />
                </g>
                <g transform="translate(70,70)">
                  <polygon 
                    points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3"
                    fill="currentColor"
                    className="text-teal-500"
                  />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#khatam-pattern)"/>
          </svg>
        </div>

        {/* Traditional Moroccan Zellige-inspired Pattern */}
        <div className="absolute top-0 right-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="zellige-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Traditional 4-fold Islamic pattern */}
                <g transform="translate(30,30)">
                  {/* Central cross motif */}
                  <path 
                    d="M-20,0 L-10,-10 L0,0 L10,-10 L20,0 L10,10 L0,0 L-10,10 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-emerald-500"
                  />
                  {/* Inner geometric elements */}
                  <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-400"/>
                  <circle cx="0" cy="0" r="4" fill="currentColor" className="text-emerald-300"/>
                  
                  {/* 4 corner decorative elements */}
                  <circle cx="-15" cy="-15" r="2" fill="currentColor" className="text-teal-600"/>
                  <circle cx="15" cy="-15" r="2" fill="currentColor" className="text-teal-600"/>
                  <circle cx="-15" cy="15" r="2" fill="currentColor" className="text-teal-600"/>
                  <circle cx="15" cy="15" r="2" fill="currentColor" className="text-teal-600"/>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zellige-pattern)"/>
          </svg>
        </div>

        {/* Traditional Islamic Interlacing Pattern (Girih) */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="girih-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Traditional Girih interlacing */}
                <g transform="translate(50,50)">
                  {/* Interlocking geometric shapes */}
                  <path 
                    d="M-30,0 Q-20,-20 0,-20 Q20,-20 30,0 Q20,20 0,20 Q-20,20 -30,0 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-emerald-600"
                  />
                  <path 
                    d="M0,-30 Q20,-20 20,0 Q20,20 0,30 Q-20,20 -20,0 Q-20,-20 0,-30 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-teal-500"
                  />
                  
                  {/* Central Islamic rosette */}
                  <g transform="rotate(45)">
                    <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400"/>
                    <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-400"/>
                  </g>
                </g>
                
                {/* Decorative corner elements */}
                <circle cx="15" cy="15" r="3" fill="currentColor" className="text-emerald-300"/>
                <circle cx="85" cy="15" r="3" fill="currentColor" className="text-teal-300"/>
                <circle cx="15" cy="85" r="3" fill="currentColor" className="text-teal-300"/>
                <circle cx="85" cy="85" r="3" fill="currentColor" className="text-emerald-300"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#girih-pattern)"/>
          </svg>
        </div>

        {/* Traditional Islamic Calligraphy Border Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="calligraphy-border" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
                {/* Stylized Arabic calligraphy-inspired flowing lines */}
                <path 
                  d="M0,20 Q30,5 60,20 Q90,35 120,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  className="text-emerald-400"
                />
                <path 
                  d="M0,20 Q30,35 60,20 Q90,5 120,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-teal-400"
                />
                
                {/* Decorative dots (reminiscent of Arabic diacritics) */}
                <circle cx="30" cy="12" r="1" fill="currentColor" className="text-emerald-500"/>
                <circle cx="90" cy="28" r="1" fill="currentColor" className="text-teal-500"/>
                <circle cx="60" cy="15" r="0.8" fill="currentColor" className="text-emerald-400"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#calligraphy-border)" opacity="0.6"/>
          </svg>
        </div>

        {/* Traditional Islamic Muqarnas-inspired Pattern */}
        <div className="absolute inset-0 transform rotate-45">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="muqarnas-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Honeycomb-like Islamic architectural pattern */}
                <g transform="translate(40,40)">
                  <polygon 
                    points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-emerald-300"
                  />
                  <polygon 
                    points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"
                    fill="currentColor"
                    className="text-teal-200"
                    fillOpacity="0.3"
                  />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#muqarnas-pattern)" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-400/8 to-gray-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Luxury Header */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-12 lg:mb-20">
            <div className="inline-block mb-4 lg:mb-8">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl lg:rounded-2xl px-4 py-2 lg:px-8 lg:py-4 shadow-xl lg:shadow-2xl border border-slate-700/50">
                <div className="flex items-center gap-2 lg:gap-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-sm lg:text-xl">{t('alkapro.header.ecosystem_title')}</h3>
                    <p className="text-slate-300 text-xs lg:text-sm">{t('alkapro.header.platforms_count')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-ubuntu font-bold text-slate-800 mb-4 lg:mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {sectionTitle || t('alkapro.header.title_line2')}
              </span>
            </h2>
            
            <div className="text-base md:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light px-4" dangerouslySetInnerHTML={{ __html: sectionContentHtml || t('alkapro.header.description') }} />
          </div>
        </ScrollReveal>

        {/* Luxury Platform Grid */}
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {ecosystemApps.map((app, index) => (
              <div 
                key={app.id}
                className="group relative"
              >
                                {/* Luxury Card */}
                <div className="relative bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl lg:shadow-2xl border border-slate-200/50 hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-2 lg:group-hover:-translate-y-3">
                  {/* Gradient Border Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${app.accent} rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10">
                    {/* Icon Section */}
                    <div className="mb-4 lg:mb-6 flex justify-center">
                      <div className={`${app.gradient} rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg lg:shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                         <div className="w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center">
                           <img 
                             src={app.icon} 
                             alt={`${app.name} Logo`}
                             className="w-5 h-5 lg:w-8 lg:h-8 object-contain"
                             onError={(e) => {
                               // Fallback to white background with app name initial if image fails
                               e.currentTarget.style.display = 'none';
                               const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                               if (fallback) fallback.style.display = 'flex';
                             }}
                           />
                           <div 
                             className="w-5 h-5 lg:w-8 lg:h-8 bg-white/20 rounded-lg hidden items-center justify-center text-white font-bold text-xs lg:text-sm"
                           >
                             {app.name.charAt(0)}
                           </div>
                         </div>
                       </div>
                     </div>

                                         {/* Text Content */}
                     <div className="text-center space-y-2 lg:space-y-4">
                       <h3 className="text-sm lg:text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors leading-tight">
                         {app.name}
                       </h3>
                       
                       <p className="text-xs lg:text-sm text-slate-600 leading-relaxed h-8 lg:h-12 flex items-center justify-center px-1">
                         {app.description}
                       </p>

                       {/* Access Button */}
                       <a 
                         href={app.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className={`inline-flex items-center gap-1 lg:gap-2 bg-gradient-to-r ${app.accent} text-white px-3 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-semibold hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                       >
                         <span className="hidden sm:inline">{t('alkapro.access_platform')}</span>
                         <span className="sm:hidden">{t('alkapro.access')}</span>
                         <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </div>
                  </div>

                  {/* Luxury Accent */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>


      </div>
    </div>
  )
}

export default AlkaproEcosystemSection