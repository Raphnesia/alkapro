// src/components/FacilityContentSections.tsx
// Komponen untuk menampilkan content sections dari API fasilitas dengan modern design

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FacilityContent, FacilityPhoto, SubFacilityPhoto, Facility } from '@/services/facilityService';

interface FacilityContentSectionsProps {
  content: FacilityContent[];
  photos: (FacilityPhoto | SubFacilityPhoto)[];
  facilities?: Facility[]; // Add facilities prop
}

export const FacilityContentSections: React.FC<FacilityContentSectionsProps> = ({ 
  content, 
  photos,
  facilities = []
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<Array<{id: number, url: string, title: string}>>([]);

  if (!content || content.length === 0) {
    return null;
  }

  // Sort content by order_index
  const sortedContent = content
    .filter(section => section.is_active)
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <>
      {sortedContent.map((section) => {
        // Try to find matching facility by name similarity
        const matchingFacility = facilities.find(f => 
          f.name.toLowerCase().includes(section.section_title.toLowerCase()) ||
          section.section_title.toLowerCase().includes(f.name.toLowerCase())
        );

        // Get images from matching facility or use photos as fallback
        const facilityImages = matchingFacility ? [
          { id: 1, url: matchingFacility.image || '', title: matchingFacility.name }
        ] : [];
        
        const photoImages = photos
          .filter(photo => photo.is_active)
          .slice(0, 4)
          .map(photo => ({ id: photo.id, url: photo.image, title: photo.title }));

        const sectionImages = facilityImages.length > 0 ? facilityImages : photoImages;

        return (
          <React.Fragment key={section.id}>
            {/* Modern Content Section */}
            <section className="py-12 px-4 bg-white">
              <div className="mx-auto" style={{ maxWidth: '1243.2px' }}>
                <div className="flex flex-col gap-12">
                  {/* Top: Title and Description in 2 columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Title */}
                    {section.section_title && (
                      <div className="pr-4 pl-8">
                        <h2 
                          className="text-5xl md:text-6xl leading-tight text-left"
                          style={{ 
                            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 700
                          }}
                        >
                          <span className="text-gray-900">{section.section_title}</span>
                          <br />
                          <span className="text-orange-500">(School Lobby)</span>
                        </h2>
                      </div>
                    )}

                    {/* Right: Description with dashed border on left */}
                    <div className="border-l border-dashed border-gray-400 pl-6">
                      <div className="space-y-6">
                        {section.display_type === 'wysiwyg' && (
                          <div 
                            dangerouslySetInnerHTML={{ __html: section.content }}
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px' }}
                          />
                        )}
                        
                        {section.display_type === 'simple_text' && (
                          <p 
                            className="text-gray-700 leading-relaxed text-justify"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '18px' }}
                          >
                            {section.content}
                          </p>
                        )}
                        
                        {section.display_type === 'grid' && (
                          <div 
                            dangerouslySetInnerHTML={{ __html: section.content }}
                            className="text-gray-700 leading-relaxed"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '18px' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Images Grid */}
                  {sectionImages.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {sectionImages.map((img, index) => (
                          <motion.div
                            key={img.id}
                            className="relative group cursor-pointer overflow-hidden rounded-2xl"
                            style={{ aspectRatio: '1/1' }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => {
                              setSelectedImage(index);
                              setSelectedImages(sectionImages);
                            }}
                          >
                            {/* Background Pattern */}
                            <div 
                              className="absolute inset-0 z-0 opacity-20"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='126'%3E%3Cpath d='M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z' fill='rgb(136, 136, 136)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                backgroundSize: '64px',
                                backgroundRepeat: 'repeat'
                              }}
                            />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 z-20">
                              <div className="bg-white rounded-full px-4 py-1.5 shadow-sm">
                                <span 
                                  className="text-orange-500 text-[10px] font-semibold"
                                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                                >
                                  {section.section_title || 'Facility'}
                                </span>
                              </div>
                            </div>

                            {/* Image Container with Border */}
                            <div className="absolute inset-0 z-10">
                              <div className="relative w-full h-full border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <Image
                                  src={img.url}
                                  alt={img.title || section.section_title || 'Facility'}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                            </div>

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Caption */}
                            <div className="absolute bottom-4 left-4 right-4 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-sm font-medium">{img.title}</p>
                            </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Placeholder images if no photos available */}
                      {[1, 2, 3, 4].map((num) => (
                        <div
                          key={num}
                          className="relative overflow-hidden rounded-2xl bg-gray-100"
                          style={{ aspectRatio: '1/1' }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No Image</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </React.Fragment>
        );
      })}

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage !== null && selectedImages[selectedImage] && (
                <Image
                  src={selectedImages[selectedImage].url}
                  alt={selectedImages[selectedImage].title || 'Facility'}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 