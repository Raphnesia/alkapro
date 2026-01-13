'use client'

import React from 'react'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function ArtikelDetailPage() {
  // Sample artikel data
  const artikel = {
    id: 2,
    title: 'Strategi Efektif Mendampingi Anak Belajar di Rumah',
    content: [
      'Mendampingi anak belajar di rumah menjadi tantangan tersendiri bagi para orang tua, terutama di era pendidikan yang terus berubah seperti saat ini. Banyak orang tua yang merasa kesulitan dalam membimbing anak-anak mereka, baik karena keterbatasan waktu, pengetahuan, maupun strategi yang tepat.',
      'Sebagai orang tua, kita perlu memahami bahwa mendampingi anak belajar bukan sekadar memastikan mereka mengerjakan PR atau tugas sekolah. Lebih dari itu, pendampingan belajar di rumah bertujuan untuk menumbuhkan kemandirian, disiplin, dan kecintaan anak terhadap proses belajar itu sendiri.',
      'Artikel ini akan membahas beberapa strategi efektif yang dapat diterapkan orang tua dalam mendampingi anak belajar di rumah, dengan mempertimbangkan berbagai aspek perkembangan anak dan dinamika keluarga modern.',
    ],
    sections: [
      {
        title: 'Menciptakan Lingkungan Belajar yang Kondusif',
        content: [
          'Lingkungan fisik memiliki pengaruh signifikan terhadap konsentrasi dan efektivitas belajar anak. Beberapa hal yang perlu diperhatikan dalam menciptakan lingkungan belajar yang kondusif di rumah:',
          '**1. Ruang Belajar Khusus**',
          'Sediakan area khusus untuk belajar yang bebas dari gangguan. Area ini tidak harus berupa ruangan terpisah, bisa juga berupa sudut di kamar atau ruang keluarga yang disiapkan khusus untuk aktivitas belajar.',
          '**2. Pencahayaan yang Baik**',
          'Pastikan area belajar mendapatkan pencahayaan yang cukup untuk mengurangi kelelahan mata. Pencahayaan alami dari jendela adalah yang terbaik, namun jika tidak memungkinkan, gunakan lampu dengan intensitas yang tepat.',
          '**3. Minimalisir Distraksi**',
          'Jauhkan gadget yang tidak diperlukan untuk belajar, matikan TV, dan batasi kebisingan selama jam belajar. Jika perlu, gunakan aplikasi pengatur waktu pada gadget untuk membatasi akses ke aplikasi yang tidak berhubungan dengan pembelajaran.',
          '**4. Perlengkapan Belajar yang Terorganisir**',
          'Siapkan semua perlengkapan belajar yang diperlukan (buku, alat tulis, laptop, dll) dengan rapi dan mudah dijangkau. Ajarkan anak untuk mengembalikan perlengkapan ke tempatnya setelah digunakan untuk membangun kebiasaan teratur.',
        ]
      },
      {
        title: 'Memahami Gaya Belajar Anak',
        content: [
          'Setiap anak memiliki gaya belajar yang unik. Memahami gaya belajar anak akan membantu orang tua menyesuaikan pendekatan pembelajaran yang paling efektif. Tiga gaya belajar utama yang perlu dikenali:',
          '**1. Visual (Belajar dengan Melihat)**',
          'Anak dengan gaya belajar visual cenderung lebih mudah memahami informasi melalui gambar, diagram, video, atau teks tertulis. Mereka sering membuat catatan berwarna dan menggunakan penanda visual untuk mengingat informasi.',
          'Strategi pendampingan: Gunakan peta konsep, diagram, flashcard berwarna, atau video pembelajaran. Dorong anak untuk membuat catatan dengan warna-warna berbeda atau menggambar konsep yang dipelajari.',
          '**2. Auditori (Belajar dengan Mendengar)**',
          'Anak dengan gaya belajar auditori lebih mudah menyerap informasi melalui pendengaran. Mereka biasanya senang berdiskusi, mendengarkan penjelasan lisan, atau membaca dengan suara keras.',
          'Strategi pendampingan: Ajak anak berdiskusi tentang materi yang dipelajari, gunakan audiobook, rekam penjelasan untuk didengarkan kembali, atau dorong anak untuk menjelaskan kembali apa yang telah dipelajari dengan kata-katanya sendiri.',
          '**3. Kinestetik (Belajar dengan Bergerak dan Menyentuh)**',
          'Anak dengan gaya belajar kinestetik memahami informasi melalui pengalaman langsung, gerakan, dan sentuhan. Mereka sulit duduk diam dalam waktu lama dan lebih suka pembelajaran yang melibatkan aktivitas fisik.',
          'Strategi pendampingan: Integrasikan gerakan dalam belajar, gunakan permainan edukatif, eksperimen langsung, atau model 3D. Izinkan anak untuk berjalan-jalan saat menghafal atau belajar sambil memainkan benda di tangan mereka.',
        ]
      },
      {
        title: 'Menerapkan Rutinitas Belajar yang Konsisten',
        content: [
          'Rutinitas yang konsisten membantu anak mengembangkan disiplin dan kemandirian dalam belajar. Beberapa tips untuk menerapkan rutinitas belajar yang efektif:',
          '**1. Jadwal yang Terstruktur**',
          'Buat jadwal belajar harian yang jelas dengan mempertimbangkan waktu optimal anak untuk belajar. Beberapa anak lebih fokus di pagi hari, sementara yang lain lebih produktif di sore atau malam hari. Sesuaikan dengan ritme alami anak.',
          '**2. Pembagian Waktu yang Realistis**',
          'Bagi waktu belajar menjadi sesi-sesi pendek dengan jeda istirahat. Untuk anak SD, sesi belajar 20-30 menit dengan istirahat 5-10 menit di antaranya lebih efektif daripada belajar terus-menerus selama berjam-jam.',
          '**3. Prioritaskan Mata Pelajaran**',
          'Mulai dengan mata pelajaran yang paling menantang saat anak masih segar dan energik, kemudian lanjutkan dengan mata pelajaran yang lebih mudah atau yang lebih disukai anak.',
          '**4. Konsistensi Tanpa Kekakuan**',
          'Pertahankan konsistensi dalam rutinitas, namun tetap fleksibel untuk menyesuaikan dengan kondisi dan kebutuhan khusus. Misalnya, jadwal bisa berbeda di hari libur atau saat ada acara keluarga penting.',
        ]
      },
      {
        title: 'Membangun Komunikasi Positif dengan Anak',
        content: [
          'Komunikasi yang positif antara orang tua dan anak menjadi kunci keberhasilan pendampingan belajar di rumah. Beberapa pendekatan komunikasi yang efektif:',
          '**1. Mendengarkan Aktif**',
          'Luangkan waktu untuk benar-benar mendengarkan anak saat mereka berbicara tentang kesulitan atau keberhasilan belajar mereka. Tunjukkan empati dan hindari menghakimi atau menyela.',
          '**2. Memberikan Umpan Balik Konstruktif**',
          'Saat memberikan umpan balik, fokus pada upaya dan proses, bukan hanya pada hasil. Misalnya, "Ibu melihat kamu sudah berusaha keras mengerjakan soal matematika ini" daripada sekadar "Bagus" atau "Salah".',
          '**3. Menggunakan Pertanyaan Terbuka**',
          'Ajukan pertanyaan yang mendorong anak untuk berpikir dan mengekspresikan pemahaman mereka, seperti "Bagaimana menurutmu cara menyelesaikan masalah ini?" atau "Apa yang kamu pelajari dari cerita ini?"',
          '**4. Menghindari Perbandingan**',
          'Hindari membandingkan anak dengan saudara, teman, atau diri Anda sendiri saat seusia mereka. Setiap anak memiliki kecepatan dan gaya belajar yang berbeda.',
          '**5. Merayakan Kemajuan**',
          'Akui dan rayakan setiap kemajuan, sekecil apapun. Penghargaan tidak harus berupa hadiah materi, bisa berupa pujian tulus, pelukan, atau aktivitas menyenangkan bersama.',
        ]
      }
    ],
    conclusion: [
      'Mendampingi anak belajar di rumah memang bukan tugas yang mudah, tetapi dengan strategi yang tepat, konsistensi, dan kesabaran, orang tua dapat menciptakan pengalaman belajar yang positif dan bermakna bagi anak.',
      'Ingatlah bahwa tujuan utama pendampingan belajar bukan hanya untuk memastikan nilai bagus, tetapi juga untuk menumbuhkan kecintaan terhadap proses belajar, kemandirian, dan keterampilan belajar sepanjang hayat yang akan bermanfaat bagi anak di masa depan.',
      'Sebagai orang tua, kita juga perlu terus belajar dan menyesuaikan strategi pendampingan seiring dengan pertumbuhan dan perkembangan anak. Dengan komunikasi yang baik, pengamatan yang cermat, dan kesediaan untuk beradaptasi, kita dapat menjadi pendamping belajar yang efektif bagi anak-anak kita.',
    ],
    author: 'Dra. Siti Aminah, M.Pd.',
    authorRole: 'Guru BK',
    date: '15 Juli 2023',
    image: '/guru/Umi-Nur-Jannah-S.Pd_-300x400.jpg',
    category: 'Parenting'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/berita-dan-artikel" className="text-blue-600 hover:text-blue-800 mr-2">
            <span>Berita dan Artikel</span>
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <Link href="/berita-dan-artikel/artikel-sekolah" className="text-blue-600 hover:text-blue-800 mr-2">
            <span>Artikel Sekolah</span>
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="text-gray-700">Detail Artikel</span>
        </div>
        
        <article className="prose max-w-none">
          {/* Article Header */}
          <div className="mb-8">
            <div className="inline-block bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded mb-4">
              {artikel.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{artikel.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image 
                  src={artikel.image} 
                  alt={artikel.author}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <p className="text-gray-800 font-medium">{artikel.author}</p>
                <p className="text-gray-500 text-sm">{artikel.authorRole}</p>
              </div>
              <div className="ml-auto text-gray-500 text-sm">
                Dipublikasikan pada {artikel.date}
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
            <Image 
              src={artikel.image} 
              alt={artikel.title}
              fill
              className="object-cover object-center"
            />
          </div>
          
          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            {/* Introduction */}
            <div className="mb-8">
              {artikel.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-black leading-relaxed">{paragraph}</p>
              ))}
            </div>
            
            {/* Sections */}
            {artikel.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">{section.title}</h2>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4 text-black leading-relaxed">
                    {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                      <strong>{paragraph.replace(/\*\*/g, '')}</strong>
                    ) : paragraph}
                  </p>
                ))}
              </div>
            ))}
            
            {/* Conclusion */}
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Kesimpulan</h2>
              {artikel.conclusion.map((paragraph, index) => (
                <p key={index} className="mb-4 text-black leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Share Buttons */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Bagikan Artikel Ini</h3>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                Facebook
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
                Twitter
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Artikel Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 3, 5].map((id) => (
                <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/berita-dan-artikel/artikel-sekolah/${id}`}>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                        {id === 1 ? 'Pentingnya Pendidikan Karakter dalam Membentuk Generasi Unggul' : 
                         id === 3 ? 'Memahami Gaya Belajar Anak untuk Optimalkan Potensi' :
                         'Membangun Kebiasaan Membaca pada Anak di Era Digital'}
                      </h4>
                      <p className="text-gray-500 text-sm mb-2">
                        {id === 1 ? '20 Juni 2023' : 
                         id === 3 ? '5 Agustus 2023' :
                         '25 September 2023'}
                      </p>
                      <span className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center">
                        Baca Artikel
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}