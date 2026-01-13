// src/lib/i18n.ts
// Sistem internationalization untuk multi-bahasa

export type Locale = 'id' | 'en' | 'ar';

export interface TranslationKeys {
  // Header
  header: {
    home: string;
    about: string;
    news: string;
    contact: string;
  };
  
  // Pimpinan SMP
  pimpinan: {
    title: string;
    subtitle: string;
    keunggulan_title: string;
    keunggulan_subtitle: string;
    kepala_sekolah: string;
    wakil_kepala_sekolah: string;
    pendidikan: string;
    pengalaman: string;
  };
  
  // Programs
  programs: {
    header: {
      title: string;
      subtitle: string;
    };
    tabs: {
      tahfidz: string;
      ict: string;
    };
    badge: {
      program: string;
    };
    learn_button: string;
    tahfidz: {
      title: string;
      subtitle: string;
      materials: {
        tilawati: {
          title: string;
          description: string;
        };
        tahsin: {
          title: string;
          description: string;
        };
        murojaah: {
          title: string;
          description: string;
        };
        bimbingan: {
          title: string;
          description: string;
        };
      };
    };
    ict: {
      title: string;
      subtitle: string;
      materials: {
        office: {
          title: string;
          description: string;
        };
        web: {
          title: string;
          description: string;
        };
        design: {
          title: string;
          description: string;
        };
        robotics: {
          title: string;
          description: string;
        };
      };
    };
  };
  
  // Why Choose Us
  why_choose_us: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      character: {
        title: string;
        description: string;
      };
      facilities: {
        title: string;
        description: string;
      };
      teachers: {
        title: string;
        description: string;
      };
      programs: {
        title: string;
        description: string;
      };
    };
  };
  
  // Alkapro Ecosystem
  alkapro: {
    header: {
      ecosystem_title: string;
      platforms_count: string;
      title_line1: string;
      title_line2: string;
      description: string;
    };
    access_platform: string;
    access: string;
    apps: {
      portal: {
        name: string;
        description: string;
      };
      information_management: {
        name: string;
        description: string;
      };
      golden_habits: {
        name: string;
        description: string;
      };
      financial_info: {
        name: string;
        description: string;
      };
      digital_ebook: {
        name: string;
        description: string;
      };
      smart: {
        name: string;
        description: string;
      };
      smart_cbt: {
        name: string;
        description: string;
      };
      sikap: {
        name: string;
        description: string;
      };
    };
  };
  
  // Common
  common: {
    read_more: string;
    share: string;
    loading: string;
    error: string;
    retry: string;
    welcome_message: string;
    school_name: string;
    explore_programs: string;
    explore_school: string;
    principal_greeting: string;
    principal_name: string;
    principal_position: string;
    greeting_arabic: string;
    greeting_message: string;
    greeting_we_say: string;
    greeting_welcome: string;
    greeting_closing: string;
    facilities_title: string;
    bismillah_translation: string;
    achievements_title: string;
    achievements_subtitle: string;
    achievements_description: string;
    islamic_quote: string;
    explore: string;
    view_facilities: string;
    view_schedule: string;
    view_menu: string;
    view_works: string;
    consult: string;
    facilities: {
      lab_computer: string;
      lab_computer_desc: string;
      digital_library: string;
      digital_library_desc: string;
      smart_classroom: string;
      smart_classroom_desc: string;
      science_lab: string;
      science_lab_desc: string;
      mosque: string;
      mosque_desc: string;
      sports_field: string;
      sports_field_desc: string;
      healthy_canteen: string;
      healthy_canteen_desc: string;
      art_music_room: string;
      art_music_room_desc: string;
      counseling_room: string;
      counseling_room_desc: string;
    };
  };
  
  // Extracurricular
  extracurricular: {
    title: string;
    description: string;
    viewAll: string;
    sports: {
      name: string;
      title: string;
      subtitle: string;
      activities: {
        archery: ActivityTrans;
        basketball: ActivityTrans;
        futsal: ActivityTrans;
        badminton: ActivityTrans;
        swimming: ActivityTrans;
        karate: ActivityTrans;
      };
    };
    arts: {
      name: string;
      title: string;
      subtitle: string;
      activities: {
        vocal: ActivityTrans;
        graphicDesign: ActivityTrans;
        cooking: ActivityTrans;
        dance: ActivityTrans;
        theater: ActivityTrans;
        music: ActivityTrans;
      };
    };
    technology: {
      name: string;
      title: string;
      subtitle: string;
      activities: {
        chess: ActivityTrans;
        coding: ActivityTrans;
      };
    };
  };
}

interface ActivityTrans {
  name: string;
  description: string;
  level: string;
  schedule: string;
}

const translations: Record<Locale, TranslationKeys> = {
  id: {
    header: {
      home: 'Beranda',
      about: 'Tentang Kami',
      news: 'Berita',
      contact: 'Kontak'
    },
    pimpinan: {
      title: 'Pimpinan SMP Muhammadiyah Al Kautsar PK Kartasura',
      subtitle: 'Kepemimpinan yang visioner dan berpengalaman dalam mengembangkan pendidikan berkualitas dengan nilai-nilai Islami.',
      keunggulan_title: 'Keunggulan Kepemimpinan SMP Muhammadiyah Al Kautsar PK Kartasura',
      keunggulan_subtitle: 'Tim pimpinan yang handal dan berpengalaman dalam mengelola sekolah',
      kepala_sekolah: 'Kepala Sekolah',
      wakil_kepala_sekolah: 'Wakil Kepala Sekolah',
      pendidikan: 'Pendidikan',
      pengalaman: 'Pengalaman'
    },
    programs: {
      header: {
        title: 'Digital School, Sekolahku Surgaku',
        subtitle: 'Inilah Program Khusus Sekolahku'
      },
      tabs: {
        tahfidz: 'Kelas Tahfidz',
        ict: 'Kelas ICT'
      },
      badge: {
        program: 'Program'
      },
      learn_button: 'Pelajari Program',
      tahfidz: {
        title: 'Kelas Tahfidz Al-Qur\'an',
        subtitle: 'Program unggulan menghafal Al-Qur\'an dengan metode pembelajaran yang sistematis dan menyenangkan',
        materials: {
          tilawati: {
            title: 'Metode Tilawati & Qiroati',
            description: 'Pembelajaran membaca Al-Qur\'an dengan metode yang mudah dan menyenangkan'
          },
          tahsin: {
            title: 'Tahsin & Tajwid',
            description: 'Perbaikan bacaan dan penguasaan kaidah tajwid yang benar'
          },
          murojaah: {
            title: 'Muroja\'ah Harian',
            description: 'Pengulangan hafalan setiap hari untuk menjaga kualitas hafalan'
          },
          bimbingan: {
            title: 'Bimbingan Intensif',
            description: 'Pendampingan personal dari ustadz berpengalaman'
          }
        }
      },
      ict: {
        title: 'Kelas ICT (Information & Communication Technology)',
        subtitle: 'Membekali siswa dengan keterampilan digital masa depan dari dasar hingga mahir',
        materials: {
          office: {
            title: 'Microsoft Office & Google Workspace',
            description: 'Menguasai aplikasi perkantoran modern untuk produktivitas maksimal'
          },
          web: {
            title: 'HTML, CSS & JavaScript',
            description: 'Dasar-dasar pemrograman web untuk membangun website interaktif'
          },
          design: {
            title: 'Desain Grafis & Video Editing',
            description: 'Kreativitas digital dengan tools profesional untuk konten visual'
          },
          robotics: {
            title: 'Robotika & Arduino',
            description: 'Pembelajaran teknologi masa depan melalui proyek robotika'
          }
        }
      }
    },
    extracurricular: {
      title: 'Ekstrakurikuler',
      description: 'Beragam kegiatan pengembangan minat dan bakat siswa.',
      viewAll: 'Lihat Semua',
      sports: {
        name: 'Olahraga',
        title: 'Ekstrakurikuler Olahraga',
        subtitle: 'Melatih fisik, disiplin, dan sportivitas.',
        activities: {
          archery:   { name: 'Panahan', description: 'Latihan teknik panahan dan konsentrasi.', level: 'Semua level', schedule: 'Setiap pekan' },
          basketball:{ name: 'Basket', description: 'Pengembangan teknik dribble, shooting, dan teamwork.', level: 'Semua level', schedule: 'Setiap pekan' },
          futsal:    { name: 'Futsal', description: 'Latihan fisik dan taktik permainan futsal.', level: 'Semua level', schedule: 'Setiap pekan' },
          badminton: { name: 'Bulu tangkis', description: 'Teknik dasar dan lanjutan bulu tangkis.', level: 'Semua level', schedule: 'Setiap pekan' },
          swimming:  { name: 'Renang', description: 'Peningkatan stamina dan teknik renang.', level: 'Semua level', schedule: 'Setiap pekan' },
          karate:    { name: 'Karate', description: 'Beladiri, disiplin, dan etika olahraga.', level: 'Semua level', schedule: 'Setiap pekan' },
        }
      },
      arts: {
        name: 'Seni',
        title: 'Ekstrakurikuler Seni',
        subtitle: 'Menumbuhkan kreativitas dan ekspresi.',
        activities: {
          vocal:         { name: 'Vokal', description: 'Teknik olah vokal dan kepercayaan diri.', level: 'Semua level', schedule: 'Setiap pekan' },
          graphicDesign: { name: 'Desain Grafis', description: 'Desain visual dan dasar-dasar komposisi.', level: 'Semua level', schedule: 'Setiap pekan' },
          cooking:       { name: 'Memasak', description: 'Dasar memasak dan higienitas dapur.', level: 'Semua level', schedule: 'Setiap pekan' },
          dance:         { name: 'Tari', description: 'Gerak, ritme, dan koreografi dasar.', level: 'Semua level', schedule: 'Setiap pekan' },
          theater:       { name: 'Teater', description: 'Peran, ekspresi, dan kolaborasi pentas.', level: 'Semua level', schedule: 'Setiap pekan' },
          music:         { name: 'Musik', description: 'Instrumental dasar dan ensemble.', level: 'Semua level', schedule: 'Setiap pekan' },
        }
      },
      technology: {
        name: 'Teknologi',
        title: 'Ekstrakurikuler Teknologi',
        subtitle: 'Mengasah logika dan keterampilan digital.',
        activities: {
          chess:  { name: 'Catur', description: 'Strategi, analisis, dan konsentrasi.', level: 'Semua level', schedule: 'Setiap pekan' },
          coding: { name: 'Coding', description: 'Logika pemrograman dan proyek mini.', level: 'Semua level', schedule: 'Setiap pekan' },
        }
      }
    },
    why_choose_us: {
      title: 'Mengapa Memilih Kami',
      subtitle: 'Alasan yang membuat SMP Muhammadiyah Al Kautsar PK Kartasura menjadi pilihan terbaik',
      description: 'Kami adalah sekolah yang berdedikasi untuk memberikan pendidikan berkualitas dan berbasis nilai-nilai Islami. Dengan fasilitas lengkap dan guru-guru yang berpengalaman, kami siap membantu siswa-siswa kami mencapai potensi terbaik mereka.',
      features: {
        character: {
          title: 'Karakter Islami',
          description: 'Kami menegakkan nilai-nilai Islami dan moralitas dalam setiap aspek pendidikan, sehingga siswa-siswa kami menjadi pribadi yang beriman dan berakhlak.'
        },
        facilities: {
          title: 'Fasilitas Lengkap',
          description: 'Kami memiliki fasilitas yang lengkap untuk mendukung kegiatan belajar mengajar, termasuk laboratorium komputer, perpustakaan digital, kelas pintar, dan ruang konseling.'
        },
        teachers: {
          title: 'Guru Berpengalaman',
          description: 'Guru-guru kami adalah tenaga pengajar yang berpengalaman dan berdedikasi untuk memberikan pembelajaran yang berkualitas.'
        },
        programs: {
          title: 'Program Unggulan',
          description: 'Kami menawarkan program-program unggulan yang terintegrasi, termasuk kelas tahfidz, kelas ICT, dan program bimbingan intensif.'
        }
      }
    },
    alkapro: {
      header: {
        ecosystem_title: 'Alkapro Ecosystem',
        platforms_count: 'Platforms',
        title_line1: 'Your',
        title_line2: 'Digital School',
        description: 'Empowering education with technology and innovation.'
      },
      access_platform: 'Access Platform',
      access: 'Access',
      apps: {
        portal: {
          name: 'Alkapro Portal',
          description: 'Central hub for all Alkapro services and resources.'
        },
        information_management: {
          name: 'Information Management',
          description: 'Efficiently manage student data, attendance, and academic records.'
        },
        golden_habits: {
          name: 'Golden Habits',
          description: 'Promote positive habits and character development for students.'
        },
        financial_info: {
          name: 'Financial Information',
          description: 'Manage school finances, budgets, and financial reports.'
        },
        digital_ebook: {
          name: 'Digital E-book',
          description: 'Access a vast collection of digital textbooks and educational materials.'
        },
        smart: {
          name: 'Smart Learning',
          description: 'Personalized learning experiences and adaptive content.'
        },
        smart_cbt: {
          name: 'Smart CBT',
          description: 'Interactive computer-based testing and assessment.'
        },
        sikap: {
          name: 'Sikap',
          description: 'Student behavior and discipline management system.'
        }
      }
    },
    common: {
      read_more: 'Baca Selengkapnya',
      share: 'Bagikan',
      loading: 'Memuat...',
      error: 'Terjadi kesalahan',
      retry: 'Coba Lagi',
      welcome_message: 'Selamat Datang di SMP Muhammadiyah Al Kautsar PK Kartasura',
      school_name: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
      explore_programs: 'Jelajahi Program',
      explore_school: 'Jelajahi Sekolah',
      principal_greeting: 'Halo,',
      principal_name: 'Kepala Sekolah',
      principal_position: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
      greeting_arabic: 'أهلاً وسهلاً بكم في',
      greeting_message: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
      greeting_we_say: 'Kami mengucapkan selamat datang kepada Anda',
      greeting_welcome: 'Selamat Datang',
      greeting_closing: 'Terima kasih telah mengunjungi SMP Muhammadiyah Al Kautsar PK Kartasura.',
      facilities_title: 'Fasilitas',
      bismillah_translation: 'بسم الله الرحمن الرحيم',
      achievements_title: 'Prestasi',
      achievements_subtitle: 'Kesuksesan SMP Muhammadiyah Al Kautsar PK Kartasura',
      achievements_description: 'Prestasi dan kesuksesan yang telah diraih oleh SMP Muhammadiyah Al Kautsar PK Kartasura.',
      islamic_quote: '“Sesungguhnya kekuatan dan keberuntungan terdapat di sisi Allah.” (QS. Al-Baqarah: 214)',
      explore: 'Jelajahi',
      view_facilities: 'Lihat Fasilitas',
      view_schedule: 'Lihat Jadwal',
      view_menu: 'Lihat Menu',
      view_works: 'Lihat Pekerjaan',
      consult: 'Konsultasi',
      facilities: {
        lab_computer: 'Laboratorium Komputer',
        lab_computer_desc: 'Laboratorium komputer yang lengkap dengan peralatan terbaru.',
        digital_library: 'Perpustakaan Digital',
        digital_library_desc: 'Perpustakaan digital yang menyediakan berbagai buku dan sumber daya.',
        smart_classroom: 'Kelas Pintar',
        smart_classroom_desc: 'Kelas yang dilengkapi dengan teknologi terkini untuk pembelajaran interaktif.',
        science_lab: 'Laboratorium Sains',
        science_lab_desc: 'Laboratorium sains yang memiliki peralatan dan fasilitas lengkap.',
        mosque: 'Masjid',
        mosque_desc: 'Masjid yang nyaman dan bersih untuk ibadah.',
        sports_field: 'Lapangan Olahraga',
        sports_field_desc: 'Lapangan olahraga yang luas dan bersih untuk kegiatan fisik.',
        healthy_canteen: 'Canteen Sehat',
        healthy_canteen_desc: 'Canteen yang menyediakan makanan sehat dan higienis.',
        art_music_room: 'Ruang Seni dan Musik',
        art_music_room_desc: 'Ruang yang memiliki fasilitas untuk kegiatan seni dan musik.',
        counseling_room: 'Ruang Konseling',
        counseling_room_desc: 'Ruang yang tersedia untuk mendengarkan dan memberikan konseling.'
      }
    }
  },
  en: {
    header: {
      home: 'Home',
      about: 'About Us',
      news: 'News',
      contact: 'Contact'
    },
    pimpinan: {
      title: 'SMP Muhammadiyah Al Kautsar PK Kartasura Leadership',
      subtitle: 'Visionary and experienced leadership in developing quality education with Islamic values.',
      keunggulan_title: 'Leadership Excellence of SMP Muhammadiyah Al Kautsar PK Kartasura',
      keunggulan_subtitle: 'Competent and experienced leadership team in school management',
      kepala_sekolah: 'Principal',
      wakil_kepala_sekolah: 'Vice Principal',
      pendidikan: 'Education',
      pengalaman: 'Experience'
    },
    programs: {
      header: {
        title: 'Digital School, My Paradise School',
        subtitle: 'These are Our Special Programs'
      },
      tabs: {
        tahfidz: 'Tahfidz Class',
        ict: 'ICT Class'
      },
      badge: {
        program: 'Program'
      },
      learn_button: 'Learn Program',
      tahfidz: {
        title: 'Quran Memorization Class',
        subtitle: 'Premium program for memorizing the Quran with systematic and enjoyable learning methods',
        materials: {
          tilawati: {
            title: 'Tilawati & Qiroati Method',
            description: 'Learning to read the Quran with easy and enjoyable methods'
          },
          tahsin: {
            title: 'Tahsin & Tajwid',
            description: 'Improving recitation and mastering correct tajwid rules'
          },
          murojaah: {
            title: 'Daily Review',
            description: 'Daily repetition of memorization to maintain quality'
          },
          bimbingan: {
            title: 'Intensive Guidance',
            description: 'Personal mentoring from experienced ustadz'
          }
        }
      },
      ict: {
        title: 'ICT (Information & Communication Technology) Class',
        subtitle: 'Equipping students with future digital skills from basic to advanced',
        materials: {
          office: {
            title: 'Microsoft Office & Google Workspace',
            description: 'Mastering modern office applications for maximum productivity'
          },
          web: {
            title: 'HTML, CSS & JavaScript',
            description: 'Web programming basics for building interactive websites'
          },
          design: {
            title: 'Graphic Design & Video Editing',
            description: 'Digital creativity with professional tools for visual content'
          },
          robotics: {
            title: 'Robotics & Arduino',
            description: 'Future technology learning through robotics projects'
          }
        }
      }
    },
    extracurricular: {
      title: 'Extracurricular',
      description: 'Various activities to nurture students’ interests and talents.',
      viewAll: 'View All',
      sports: {
        name: 'Sports',
        title: 'Sports Extracurricular',
        subtitle: 'Build physical fitness, discipline, and sportsmanship.',
        activities: {
          archery:   { name: 'Archery', description: 'Archery techniques and focus practice.', level: 'All levels', schedule: 'Weekly' },
          basketball:{ name: 'Basketball', description: 'Dribbling, shooting, and teamwork.', level: 'All levels', schedule: 'Weekly' },
          futsal:    { name: 'Futsal', description: 'Endurance and futsal tactics.', level: 'All levels', schedule: 'Weekly' },
          badminton: { name: 'Badminton', description: 'Fundamentals and advanced techniques.', level: 'All levels', schedule: 'Weekly' },
          swimming:  { name: 'Swimming', description: 'Stamina and swimming techniques.', level: 'All levels', schedule: 'Weekly' },
          karate:    { name: 'Karate', description: 'Martial arts, discipline, and ethics.', level: 'All levels', schedule: 'Weekly' },
        }
      },
      arts: {
        name: 'Arts',
        title: 'Arts Extracurricular',
        subtitle: 'Grow creativity and expression.',
        activities: {
          vocal:         { name: 'Vocal', description: 'Vocal techniques and confidence.', level: 'All levels', schedule: 'Weekly' },
          graphicDesign: { name: 'Graphic Design', description: 'Visual design and composition basics.', level: 'All levels', schedule: 'Weekly' },
          cooking:       { name: 'Cooking', description: 'Cooking fundamentals and hygiene.', level: 'All levels', schedule: 'Weekly' },
          dance:         { name: 'Dance', description: 'Movement, rhythm, and choreography.', level: 'All levels', schedule: 'Weekly' },
          theater:       { name: 'Theater', description: 'Acting, expression, and collaboration.', level: 'All levels', schedule: 'Weekly' },
          music:         { name: 'Music', description: 'Basic instruments and ensemble.', level: 'All levels', schedule: 'Weekly' },
        }
      },
      technology: {
        name: 'Technology',
        title: 'Technology Extracurricular',
        subtitle: 'Sharpen logic and digital skills.',
        activities: {
          chess:  { name: 'Chess', description: 'Strategy, analysis, and focus.', level: 'All levels', schedule: 'Weekly' },
          coding: { name: 'Coding', description: 'Programming logic and mini projects.', level: 'All levels', schedule: 'Weekly' },
        }
      }
    },
    why_choose_us: {
      title: 'Why Choose Us',
      subtitle: 'Reasons that make SMP Muhammadiyah Al Kautsar PK Kartasura the best choice',
      description: 'We are a school dedicated to providing quality education and based on Islamic values. With comprehensive facilities and experienced teachers, we are ready to help our students achieve their best potential.',
      features: {
        character: {
          title: 'Islamic Character',
          description: 'We uphold Islamic values and morality in every aspect of education, so that our students become people who believe and have good character.'
        },
        facilities: {
          title: 'Comprehensive Facilities',
          description: 'We have comprehensive facilities to support learning activities, including computer laboratories, digital libraries, smart classrooms, and counseling rooms.'
        },
        teachers: {
          title: 'Experienced Teachers',
          description: 'Our teachers are experienced educators and dedicated to providing quality education.'
        },
        programs: {
          title: 'Excellent Programs',
          description: 'We offer excellent integrated programs, including Tahfidz classes, ICT classes, and intensive guidance programs.'
        }
      }
    },
    alkapro: {
      header: {
        ecosystem_title: 'Alkapro Ecosystem',
        platforms_count: 'Platforms',
        title_line1: 'Your',
        title_line2: 'Digital School',
        description: 'Empowering education with technology and innovation.'
      },
      access_platform: 'Access Platform',
      access: 'Access',
      apps: {
        portal: {
          name: 'Alkapro Portal',
          description: 'Central hub for all Alkapro services and resources.'
        },
        information_management: {
          name: 'Information Management',
          description: 'Efficiently manage student data, attendance, and academic records.'
        },
        golden_habits: {
          name: 'Golden Habits',
          description: 'Promote positive habits and character development for students.'
        },
        financial_info: {
          name: 'Financial Information',
          description: 'Manage school finances, budgets, and financial reports.'
        },
        digital_ebook: {
          name: 'Digital E-book',
          description: 'Access a vast collection of digital textbooks and educational materials.'
        },
        smart: {
          name: 'Smart Learning',
          description: 'Personalized learning experiences and adaptive content.'
        },
        smart_cbt: {
          name: 'Smart CBT',
          description: 'Interactive computer-based testing and assessment.'
        },
        sikap: {
          name: 'Sikap',
          description: 'Student behavior and discipline management system.'
        }
      }
    },
    common: {
      read_more: 'Read More',
      share: 'Share',
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      welcome_message: 'Welcome to SMP Muhammadiyah Al Kautsar PK Kartasura',
      school_name: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
      explore_programs: 'Explore Programs',
      explore_school: 'Explore School',
      principal_greeting: 'Hello,',
      principal_name: 'Principal',
      principal_position: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
      greeting_arabic: 'أهلاً وسهلاً بكم في',
      greeting_message: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
      greeting_we_say: 'We welcome you with open arms',
      greeting_welcome: 'Welcome',
      greeting_closing: 'Thank you for visiting SMP Muhammadiyah Al Kautsar PK Kartasura.',
      facilities_title: 'Facilities',
      bismillah_translation: 'بسم الله الرحمن الرحيم',
      achievements_title: 'Achievements',
      achievements_subtitle: 'Success of SMP Muhammadiyah Al Kautsar PK Kartasura',
      achievements_description: 'Achievements and success achieved by SMP Muhammadiyah Al Kautsar PK Kartasura.',
      islamic_quote: '“Sesungguhnya kekuatan dan keberuntungan terdapat di sisi Allah.” (QS. Al-Baqarah: 214)',
      explore: 'Explore',
      view_facilities: 'View Facilities',
      view_schedule: 'View Schedule',
      view_menu: 'View Menu',
      view_works: 'View Works',
      consult: 'Consult',
      facilities: {
        lab_computer: 'Computer Lab',
        lab_computer_desc: 'Computer lab with modern equipment.',
        digital_library: 'Digital Library',
        digital_library_desc: 'Digital library offering various books and resources.',
        smart_classroom: 'Smart Classroom',
        smart_classroom_desc: 'Classroom equipped with modern technology for interactive learning.',
        science_lab: 'Science Lab',
        science_lab_desc: 'Science lab with comprehensive equipment and facilities.',
        mosque: 'Mosque',
        mosque_desc: 'Comfortable and clean mosque for worship.',
        sports_field: 'Sports Field',
        sports_field_desc: 'Large and clean sports field for physical activities.',
        healthy_canteen: 'Healthy Canteen',
        healthy_canteen_desc: 'Canteen offering healthy and hygienic food.',
        art_music_room: 'Art and Music Room',
        art_music_room_desc: 'Room equipped with facilities for art and music activities.',
        counseling_room: 'Counseling Room',
        counseling_room_desc: 'Room available for listening and providing counseling.'
      }
    }
  },
  ar: {
    header: {
      home: 'الرئيسية',
      about: 'من نحن',
      news: 'الأخبار',
      contact: 'اتصل بنا'
    },
    pimpinan: {
      title: 'قيادة مدرسة SMP محمدية الكوثر PK كارتاسورا',
      subtitle: 'قيادة رؤيوية وخبيرة في تطوير التعليم الجيد مع القيم الإسلامية.',
      keunggulan_title: 'تميز القيادة في مدرسة SMP محمدية الكوثر PK كارتاسورا',
      keunggulan_subtitle: 'فريق قيادي كفء وذو خبرة في إدارة المدرسة',
      kepala_sekolah: 'مدير المدرسة',
      wakil_kepala_sekolah: 'نائب مدير المدرسة',
      pendidikan: 'التعليم',
      pengalaman: 'الخبرة'
    },
    programs: {
      header: {
        title: 'المدرسة الرقمية، مدرستي الجنة',
        subtitle: 'هذه برامجنا الخاصة'
      },
      tabs: {
        tahfidz: 'فصل التحفيظ',
        ict: 'فصل تكنولوجيا المعلومات'
      },
      badge: {
        program: 'البرنامج'
      },
      learn_button: 'تعلم البرنامج',
      tahfidz: {
        title: 'فصل حفظ القرآن الكريم',
        subtitle: 'برنامج متميز لحفظ القرآن الكريم بطرق تعليمية منهجية وممتعة',
        materials: {
          tilawati: {
            title: 'طريقة تلاواتي وقيرواتي',
            description: 'تعلم قراءة القرآن الكريم بطرق سهلة وممتعة'
          },
          tahsin: {
            title: 'تحسين والتجويد',
            description: 'تحسين التلاوة وإتقان قواعد التجويد الصحيحة'
          },
          murojaah: {
            title: 'المراجعة اليومية',
            description: 'تكرار الحفظ يومياً للحفاظ على الجودة'
          },
          bimbingan: {
            title: 'الإرشاد المكثف',
            description: 'التوجيه الشخصي من الأستاذ ذو الخبرة'
          }
        }
      },
      ict: {
        title: 'فصل تكنولوجيا المعلومات والاتصالات',
        subtitle: 'تجهيز الطلاب بمهارات رقمية مستقبلية من الأساسيات إلى المتقدم',
        materials: {
          office: {
            title: 'مايكروسوفت أوفيس وجوجل وركسبيس',
            description: 'إتقان تطبيقات المكتب الحديثة للإنتاجية القصوى'
          },
          web: {
            title: 'HTML و CSS و JavaScript',
            description: 'أساسيات برمجة الويب لبناء مواقع تفاعلية'
          },
          design: {
            title: 'التصميم الجرافيكي وتحرير الفيديو',
            description: 'الإبداع الرقمي بأدوات احترافية للمحتوى المرئي'
          },
          robotics: {
            title: 'الروبوتات وأردوينو',
            description: 'تعلم تكنولوجيا المستقبل من خلال مشاريع الروبوتات'
          }
        }
      }
    },
    extracurricular: {
      title: 'الأنشطة اللامنهجية',
      description: 'أنشطة متنوعة لتنمية اهتمامات ومواهب الطلاب.',
      viewAll: 'عرض الكل',
      sports: {
        name: 'الرياضة',
        title: 'أنشطة الرياضة',
        subtitle: 'اللياقة والانضباط والروح الرياضية.',
        activities: {
          archery:   { name: 'الرماية', description: 'تقنيات الرماية والتركيز.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          basketball:{ name: 'كرة السلة', description: 'المراوغة والتسديد والعمل الجماعي.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          futsal:    { name: 'فوتسال', description: 'اللياقة وتكتيك اللعب.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          badminton: { name: 'الريشة', description: 'الأساسيات والتقنيات المتقدمة.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          swimming:  { name: 'السباحة', description: 'القدرة البدنية وتقنيات السباحة.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          karate:    { name: 'كاراتيه', description: 'فنون قتالية وانضباط وأخلاق.', level: 'كل المستويات', schedule: 'أسبوعياً' },
        }
      },
      arts: {
        name: 'الفنون',
        title: 'أنشطة الفنون',
        subtitle: 'تنمية الإبداع والتعبير.',
        activities: {
          vocal:         { name: 'الغناء', description: 'تقنيات الصوت وبناء الثقة.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          graphicDesign: { name: 'التصميم الجرافيكي', description: 'التصميم البصري وأساسيات التكوين.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          cooking:       { name: 'الطبخ', description: 'أساسيات الطبخ ونظافة المطبخ.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          dance:         { name: 'الرقص', description: 'الحركة والإيقاع والكوريغرافيا.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          theater:       { name: 'المسرح', description: 'التمثيل والتعبير والتعاون.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          music:         { name: 'الموسيقى', description: 'أساسيات العزف والعمل الجماعي.', level: 'كل المستويات', schedule: 'أسبوعياً' },
        }
      },
      technology: {
        name: 'التقنية',
        title: 'أنشطة التقنية',
        subtitle: 'صقل المنطق والمهارات الرقمية.',
        activities: {
          chess:  { name: 'الشطرنج', description: 'استراتيجية وتحليل وتركيز.', level: 'كل المستويات', schedule: 'أسبوعياً' },
          coding: { name: 'البرمجة', description: 'منطق البرمجة ومشاريع صغيرة.', level: 'كل المستويات', schedule: 'أسبوعياً' },
        }
      }
    },
    why_choose_us: {
      title: 'لماذا نحن؟',
      subtitle: 'الأسباب التي تجعل مدرسة SMP محمدية الكوثر PK كارتاسورا الخيار الأفضل',
      description: 'نحن مدرسة تجديدية مختصة في تقديم التعليم الجيد والمستند إلى القيم الإسلامية. مع المرافق الكاملة والمعلمين الذين لديهم خبرة، نحن جاهزون لمساعدة الطلاب في تحقيق أفضل إمكاناتهم.',
      features: {
        character: {
          title: 'الشخصية الإسلامية',
          description: 'نحن نطبق القيم الإسلامية والأخلاق في كل جانب من جوانب التعليم، بحيث يصبح الطلاب أفراداً يؤمنون ولديهم شخصية جيدة.'
        },
        facilities: {
          title: 'المرافق الكاملة',
          description: 'لدينا مرافق كاملة لدعم النشاطات التعليمية، بما في ذلك مختبرات الكمبيوتر، المكتبة الرقمية، الفصل الذكي، والغرف الاستشارية.'
        },
        teachers: {
          title: 'المعلمون الذين لديهم خبرة',
          description: 'المعلمون لدينا هم معلمون ذوو خبرة في تقديم التعليم الجيد.'
        },
        programs: {
          title: 'البرامج المميزة',
          description: 'نقدم برامجاً مميزة متكاملة، بما في ذلك فصول التحفيظ، فصول تكنولوجيا المعلومات، وبرامج الاستشارة المكثفة.'
        }
      }
    },
    alkapro: {
      header: {
        ecosystem_title: 'نظام التكنولوجيا الرقمية للتعليم',
        platforms_count: 'المنصات',
        title_line1: 'مدرستك',
        title_line2: 'الجنة',
        description: 'تمكين التعليم من خلال التكنولوجيا والابتكار.'
      },
      access_platform: 'الوصول إلى المنصة',
      access: 'الوصول',
      apps: {
        portal: {
          name: 'بوابة Alkapro',
          description: 'مركز مركزي لخدمات وموارد جميع خدمات Alkapro.'
        },
        information_management: {
          name: 'إدارة المعلومات',
          description: 'إدارة البيانات الطلابية، الحضور، والمعلومات الأكاديمية بكفاءة.'
        },
        golden_habits: {
          name: 'العادات الذهبية',
          description: 'تشجيع العادات الإيجابية وتطوير الشخصية للطلاب.'
        },
        financial_info: {
          name: 'معلومات مالية',
          description: 'إدارة المالية للمدرسة، الموازنات، وتقارير المالية.'
        },
        digital_ebook: {
          name: 'كتاب إلكتروني',
          description: 'الوصول إلى مجموعة واسعة من الكتب الإلكترونية والمواد التعليمية.'
        },
        smart: {
          name: 'التعلم الذكي',
          description: 'تجربة التعلم الشخصية والمحتوى المناسب.'
        },
        smart_cbt: {
          name: 'Smart CBT',
          description: 'اختبار كمبيوتري بناء على الاستشارات.'
        },
        sikap: {
          name: 'سيكاب',
          description: 'نظام إدارة السلوك والتنظيم للطلاب.'
        }
      }
    },
    common: {
      read_more: 'اقرأ المزيد',
      share: 'شارك',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      retry: 'إعادة المحاولة',
      welcome_message: 'مرحباً بكم في مدرسة SMP محمدية الكوثر PK كارتاسورا',
      school_name: 'مدرسة SMP محمدية الكوثر PK كارتاسورا',
      explore_programs: 'استكشف البرامج',
      explore_school: 'استكشف المدرسة',
      principal_greeting: 'أهلاً وسهلاً بكم في',
      principal_name: 'المدير',
      principal_position: 'مدرسة SMP محمدية الكوثر PK كارتاسورا',
      greeting_arabic: 'أهلاً وسهلاً بكم في',
      greeting_message: 'مدرسة SMP محمدية الكوثر PK كارتاسورا',
      greeting_we_say: 'نرحب بكم بأيدينا المفتوحة',
      greeting_welcome: 'مرحباً',
      greeting_closing: 'شكراً لزيارة مدرسة SMP محمدية الكوثر PK كارتاسورا.',
      facilities_title: 'المرافق',
      bismillah_translation: 'بسم الله الرحمن الرحيم',
      achievements_title: 'الإنجازات',
      achievements_subtitle: 'نجاح مدرسة SMP محمدية الكوثر PK كارتاسورا',
      achievements_description: 'الإنجازات والنجاح الذي تم تحقيقه من قبل مدرسة SMP محمدية الكوثر PK كارتاسورا.',
      islamic_quote: '“Sesungguhnya kekuatan وkeberuntungan terdapat di sisi Allah.” (QS. Al-Baqarah: 214)',
      explore: 'استكشف',
      view_facilities: 'عرض المرافق',
      view_schedule: 'عرض الجدول',
      view_menu: 'عرض القائمة',
      view_works: 'عرض العمل',
      consult: 'استشارة',
      facilities: {
        lab_computer: 'مختبر الكمبيوتر',
        lab_computer_desc: 'مختبر الكمبيوتر المزود بالمعدات الحديثة.',
        digital_library: 'المكتبة الرقمية',
        digital_library_desc: 'المكتبة الرقمية التي تقدم كتباً وموارد متنوعة.',
        smart_classroom: 'الفصل الذكي',
        smart_classroom_desc: 'الفصل المزود بتكنولوجيا حديثة للتعليم التفاعلي.',
        science_lab: 'مختبر العلوم',
        science_lab_desc: 'مختبر العلوم المزود بالمعدات والمرافق الكاملة.',
        mosque: 'المسجد',
        mosque_desc: 'المسجد المريح والنظيف للإقامة.',
        sports_field: 'الملعب',
        sports_field_desc: 'الملعب الواسع والنظيف للنشاطات البدنية.',
        healthy_canteen: 'المطعم الصحي',
        healthy_canteen_desc: 'المطعم الذي يقدم طعاماً صحياً ونظيفاً.',
        art_music_room: 'الغرفة الفنية والموسيقية',
        art_music_room_desc: 'الغرفة المزودة بالمرافق للنشاطات الفنية والموسيقية.',
        counseling_room: 'الغرفة الاستشارية',
        counseling_room_desc: 'الغرفة المتاحة للاستماع وتقديم الاستشارة.'
      }
    }
  }
};

export class I18nService {
  private currentLocale: Locale = 'id';

  constructor(initialLocale: Locale = 'id') {
    this.currentLocale = initialLocale;
  }

  setLocale(locale: Locale) {
    this.currentLocale = locale;
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLocale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value || key;
  }

  getAvailableLocales(): Locale[] {
    return Object.keys(translations) as Locale[];
  }

  getLocaleName(locale: Locale): string {
    const names = {
      id: 'Indonesia',
      en: 'English',
      ar: 'العربية'
    };
    return names[locale];
  }
}

// Singleton instance
export const i18n = new I18nService();

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedLocale = localStorage.getItem('locale') as Locale;
  if (savedLocale && ['id', 'en', 'ar'].includes(savedLocale)) {
    i18n.setLocale(savedLocale);
  }
} 