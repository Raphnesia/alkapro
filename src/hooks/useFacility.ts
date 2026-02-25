// src/hooks/useFacility.ts
// Hook untuk mengelola state dan data fetching fasilitas dinamis

import { useState, useEffect } from 'react';
import { facilityService, FacilityCompleteData, SubFacilityCompleteData } from '@/services/facilityService';

export interface UseFacilityReturn {
  data: FacilityCompleteData | null;
  settings: FacilityCompleteData['settings'] | null;
  content: FacilityCompleteData['content'];
  photos: FacilityCompleteData['photos'];
  boxes: FacilityCompleteData['boxes'];
  facilities: FacilityCompleteData['facilities'];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export interface UseSubFacilityReturn {
  data: SubFacilityCompleteData | null;
  settings: SubFacilityCompleteData['settings'] | null;
  boxes: SubFacilityCompleteData['boxes'];
  photos: SubFacilityCompleteData['photos'];
  facilities: SubFacilityCompleteData['facilities'];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export function useFacility(): UseFacilityReturn {
  const [data, setData] = useState<FacilityCompleteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const completeData = await facilityService.getCompleteData();
      
      // Jika facilities kosong, gunakan fallback data
      if (completeData.facilities.length === 0) {
        const fallbackFacilities = [
          {
            id: 1,
            name: "Laboratorium Komputer",
            slug: "laboratorium-komputer",
            description: "Laboratorium komputer modern dengan perangkat terkini untuk mendukung pembelajaran teknologi informasi dan komunikasi.",
            image: "/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg",
            category: "Akademik",
            capacity: 40,
            location: "Lantai 2, Gedung A",
            specifications: {
              "komputer": "40 unit",
              "proyektor": "1 unit", 
              "ac": "2 unit"
            },
            order_index: 1
          },
          {
            id: 2,
            name: "Perpustakaan Digital",
            slug: "perpustakaan-digital",
            description: "Perpustakaan modern dengan koleksi buku digital dan fisik yang lengkap untuk mendukung kegiatan belajar mengajar.",
            image: "/Programkhusus/6-1.png",
            category: "Akademik",
            capacity: 100,
            location: "Lantai 1, Gedung B",
            specifications: {
              "meja_baca": "20 unit",
              "komputer": "10 unit",
              "ac": "3 unit"
            },
            order_index: 2
          },
          {
            id: 3,
            name: "Lapangan Olahraga",
            slug: "lapangan-olahraga", 
            description: "Lapangan serbaguna untuk berbagai aktivitas olahraga seperti basket, voli, dan futsal.",
            image: "/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg",
            category: "Olahraga",
            capacity: 50,
            location: "Area Outdoor",
            specifications: {
              "lapangan_basket": "1 unit",
              "lapangan_voli": "1 unit",
              "tribun": "200 tempat duduk"
            },
            order_index: 3
          },
          {
            id: 4,
            name: "Aula Serbaguna",
            slug: "aula-serbaguna",
            description: "Aula besar untuk berbagai kegiatan sekolah seperti seminar, acara wisuda, dan pertunjukan seni.",
            image: "/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png",
            category: "Umum",
            capacity: 300,
            location: "Lantai 1, Gedung C",
            specifications: {
              "panggung": "1 unit",
              "sound_system": "1 set",
              "ac": "5 unit",
              "kursi": "300 unit"
            },
            order_index: 4
          },
          {
            id: 5,
            name: "Masjid Sekolah",
            slug: "masjid-sekolah",
            description: "Masjid sekolah yang nyaman untuk beribadah dan kegiatan keagamaan siswa dan guru.",
            image: "/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg",
            category: "Ibadah",
            capacity: 200,
            location: "Lantai 2, Gedung D",
            specifications: {
              "karpet": "200 meter",
              "ac": "4 unit",
              "sound_system": "1 set",
              "tempat_wudhu": "20 unit"
            },
            order_index: 5
          }
        ];
        
        completeData.facilities = fallbackFacilities as any;
        
        // Tambahkan fallback content jika kosong
        if (completeData.content.length === 0) {
          completeData.content = [
            {
              id: 1,
              section_title: "Fasilitas Unggulan Sekolah Kami",
              content: "<p>Sekolah kami berkomitmen untuk menyediakan fasilitas terbaik guna mendukung proses pembelajaran yang berkualitas. Dengan berbagai fasilitas modern dan lengkap, kami memastikan siswa dapat belajar dengan nyaman dan optimal.</p>",
              display_type: 'wysiwyg' as const,
              show_photo_collage: true,
              order_index: 1,
              is_active: true
            }
          ] as any;
        }
        
        // Tambahkan fallback photos jika kosong
        if (completeData.photos.length === 0) {
          completeData.photos = [
            {
              id: 1,
              title: "Ruang Kelas Modern",
              description: "Ruang kelas dengan fasilitas teknologi terdepan",
              image: "/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg",
              alt_text: "Ruang kelas modern dengan proyektor dan AC",
              order_index: 1,
              is_active: true
            },
            {
              id: 2,
              title: "Laboratorium Komputer",
              description: "Lab komputer dengan perangkat terkini untuk pembelajaran IT",
              image: "/Programkhusus/6-1.png",
              alt_text: "Laboratorium komputer dengan PC modern",
              order_index: 2,
              is_active: true
            },
            {
              id: 3,
              title: "Perpustakaan Digital",
              description: "Perpustakaan modern dengan koleksi digital lengkap",
              image: "/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png",
              alt_text: "Perpustakaan dengan fasilitas digital",
              order_index: 3,
              is_active: true
            },
            {
              id: 4,
              title: "Area Olahraga",
              description: "Lapangan serbaguna untuk berbagai aktivitas olahraga",
              image: "/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg",
              alt_text: "Lapangan olahraga sekolah",
              order_index: 4,
              is_active: true
            }
          ] as any;
        }
        
        console.log('Using fallback facilities data');
      }
      
      setData(completeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data');
      console.error('Error fetching facility data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  // Helper computed values
  const settings = data?.settings || null;
  const content = data?.content || [];
  const photos = data?.photos || [];
  const boxes = data?.boxes || [];
  const facilities = data?.facilities || [];

  return {
    data,
    settings,
    content,
    photos,
    boxes,
    facilities,
    isLoading,
    error,
    refreshData
  };
}

export function useSubFacility(parentSlug: string): UseSubFacilityReturn {
  const [data, setData] = useState<SubFacilityCompleteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const completeData = await facilityService.getSubFacilityCompleteData(parentSlug);
      setData(completeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data');
      console.error('Error fetching sub-facility data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (parentSlug) {
      fetchData();
    }
  }, [parentSlug]);

  const refreshData = async () => {
    await fetchData();
  };

  // Helper computed values
  const settings = data?.settings || null;
  const boxes = data?.boxes || [];
  const photos = data?.photos || [];
  const facilities = data?.facilities || [];

  return {
    data,
    settings,
    boxes,
    photos,
    facilities,
    isLoading,
    error,
    refreshData
  };
} 