// src/components/FacilityPhotoCollage.tsx
// Komponen photo collage untuk sub-fasilitas

import React from 'react';
import { FacilityPhoto, SubFacilityPhoto } from '@/services/facilityService';

interface FacilityPhotoCollageProps {
  photos?: (FacilityPhoto | SubFacilityPhoto)[];
  title?: string;
}

export const FacilityPhotoCollage: React.FC<FacilityPhotoCollageProps> = ({ 
  photos = [],
  title = "Galeri Foto Fasilitas" 
}) => {
  // Fallback images jika tidak ada data dari API
  const fallbackPhotos = [
    {
      id: 1,
      title: "Ruang Kelas Modern",
      description: "Ruang kelas dengan fasilitas teknologi terdepan",
      image: "/Programkhusus/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg",
      alt_text: "Ruang kelas modern dengan proyektor dan AC"
    },
    {
      id: 2,
      title: "Laboratorium Komputer",
      description: "Lab komputer dengan perangkat terkini",
      image: "/Programkhusus/6-1.png",
      alt_text: "Laboratorium komputer dengan PC modern"
    },
    {
      id: 3,
      title: "Area Olahraga",
      description: "Lapangan serbaguna untuk berbagai aktivitas",
      image: "/Programkhusus/photo-1553063085-dbbf64d936ea.jpeg",
      alt_text: "Lapangan olahraga sekolah"
    },
    {
      id: 4,
      title: "Perpustakaan Digital",
      description: "Perpustakaan modern dengan koleksi lengkap",
      image: "/Programkhusus/canva-background-qz8kedi3hsiz0ok3.png",
      alt_text: "Perpustakaan dengan fasilitas digital"
    },
    {
      id: 5,
      title: "Fasilitas Teknologi",
      description: "Fasilitas teknologi untuk pembelajaran modern",
      image: "/Programkhusus/google-logo-redesign-uhd-4k-wallpaper.jpg",
      alt_text: "Fasilitas teknologi sekolah"
    },
    {
      id: 6,
      title: "Ruang Kreatif",
      description: "Ruang untuk pengembangan kreativitas siswa",
      image: "/Programkhusus/156354-building-a-custom-wordpress-theme.png",
      alt_text: "Ruang kreatif untuk siswa"
    }
  ];

  // Filter dan sort photos yang aktif
  const activePhotos = photos.length > 0 
    ? photos
        .filter(photo => photo.is_active)
        .sort((a, b) => a.order_index - b.order_index)
    : fallbackPhotos;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePhotos.map((photo) => (
            <div 
              key={photo.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
            >
              <img 
                src={photo.image}
                alt={photo.alt_text || photo.title}
                title={photo.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay with title and description */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {photo.title}
                </h3>
                {photo.description && (
                  <p className="text-white/90 text-sm line-clamp-2">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 