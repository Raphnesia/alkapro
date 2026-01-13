'use client'

import React, { useEffect } from 'react'

interface DisqusCommentsProps {
  url: string
  identifier: string
  title: string
}

declare global {
  interface Window {
    DISQUS: any
    disqus_config: any
  }
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({ url, identifier, title }) => {
  useEffect(() => {
    // Konfigurasi Disqus
    (window as any).disqus_config = function(this: any) {
      this.page.url = url
      this.page.identifier = identifier
      this.page.title = title
    }

    // Load Disqus script jika belum ada
    if (!document.getElementById('disqus-script')) {
      const script = document.createElement('script')
      script.id = 'disqus-script'
      script.src = 'https://smp-muhammadiyah-al-kautsar.disqus.com/embed.js'
      script.setAttribute('data-timestamp', String(+new Date()))
      document.body.appendChild(script)
    } else {
      // Reset Disqus jika script sudah ada
      if (window.DISQUS) {
        window.DISQUS.reset({
          reload: true,
          config: window.disqus_config
        })
      }
    }

    // Cleanup function untuk menghapus script saat component unmount
    return () => {
      const script = document.getElementById('disqus-script')
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [url, identifier, title])

  return (
    <div className="w-full islamic-premium-section">
      {/* Islamic Premium Header */}
      <div className="relative mb-12">
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl opacity-70"></div>
        <div className="absolute top-6 right-6 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-teal-600">
            <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <polygon points="50,25 75,50 50,75 25,50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
        
        {/* Header Content */}
        <div className="relative z-10 text-center py-12 px-8">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 rounded-full px-8 py-4 mb-6 shadow-2xl border border-emerald-200/30 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-inner">
              <span className="text-emerald-800 text-lg font-bold">☪</span>
            </div>
            <h3 className="text-white font-ubuntu font-light text-xl tracking-wide">
              Diskusi Akademik Islami
            </h3>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-emerald-800 max-w-3xl mx-auto leading-relaxed text-lg font-light">
            Berbagi pemikiran yang bermakna dalam suasana diskusi yang Islami dan berkualitas tinggi.
          </p>
          <div className="mt-4 text-sm text-emerald-600 italic">
            "وَقُل رَّبِّ زِدْنِي عِلْمًا" - "Dan katakanlah: Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan"
          </div>
        </div>
      </div>
      
      {/* Islamic Premium Container */}
      <div className="relative group">
        {/* Islamic Glow Effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 rounded-3xl blur-sm opacity-20 group-hover:opacity-35 transition-opacity duration-500"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl opacity-40"></div>
        
        {/* Main Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-emerald-200/50 overflow-hidden backdrop-blur-xl">
          {/* Islamic Ornament Header Bar */}
          <div className="h-2 bg-gradient-to-r from-emerald-600 via-amber-400 via-teal-500 to-emerald-600 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Premium Content Area */}
          <div className="p-8 lg:p-12">
            {/* Disqus Integration */}
            <div id="disqus_thread" className="min-h-[500px] w-full islamic-disqus">
              <div className="flex flex-col items-center justify-center py-20">
                {/* Islamic Loading Animation */}
                <div className="relative mb-8">
                  {/* Outer Islamic Pattern Ring */}
                  <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin opacity-60"></div>
                  {/* Middle Ring with Crescent */}
                  <div className="absolute inset-1 w-18 h-18 border-3 border-transparent border-t-emerald-500 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
                  {/* Inner Ring */}
                  <div className="absolute inset-3 w-14 h-14 border-2 border-transparent border-r-amber-400 rounded-full animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
                  {/* Center Islamic Symbol */}
                  <div className="absolute inset-0 w-20 h-20 flex items-center justify-center">
                    <div className="text-emerald-600 text-lg animate-pulse">☪</div>
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <h4 className="text-emerald-800 font-medium text-lg">Memuat Platform Diskusi Islami</h4>
                  <p className="text-emerald-600 text-sm">Menyiapkan ruang berbagi ilmu yang berkah</p>
                  <div className="text-xs text-amber-600 italic mt-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Islamic Values Panel */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Akhlaqul Karimah */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-emerald-200/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🤲</span>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 text-lg">Akhlaqul Karimah</h4>
                <p className="text-xs text-emerald-600">Adab dalam Berdiskusi</p>
              </div>
            </div>
            <p className="text-emerald-700 leading-relaxed text-sm">
              Gunakan bahasa yang santun dan hormat sesuai ajaran Islam. Sampaikan pendapat dengan hikmah dan kebijaksanaan.
            </p>
          </div>
        </div>
        
        {/* Ta'awun wa Tasamuh */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-amber-200/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🤝</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 text-lg">Ta'awun wa Tasamuh</h4>
                <p className="text-xs text-amber-600">Saling Tolong & Toleran</p>
              </div>
            </div>
            <p className="text-amber-700 leading-relaxed text-sm">
              Saling membantu dalam kebaikan dan ilmu. Hormati perbedaan pendapat dengan toleransi yang tinggi.
            </p>
          </div>
        </div>
        
        {/* Baitul Hikmah */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-teal-200/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">📚</span>
              </div>
              <div>
                <h4 className="font-semibold text-teal-800 text-lg">Baitul Hikmah</h4>
                <p className="text-xs text-teal-600">Rumah Kebijaksanaan</p>
              </div>
            </div>
            <p className="text-teal-700 leading-relaxed text-sm">
              Jadikan ruang ini sebagai baitul hikmah modern untuk berbagi ilmu yang bermanfaat dan berkah.
            </p>
          </div>
        </div>
      </div>
      
      {/* Islamic Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-emerald-600 text-sm">
          <span>📿</span>
          <span className="italic">"خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ"</span>
        </div>
        <p className="text-xs text-emerald-500 mt-1">
          "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia"
        </p>
      </div>
    </div>
  )
}

export default DisqusComments 