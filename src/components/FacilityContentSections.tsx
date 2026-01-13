// src/components/FacilityContentSections.tsx
// Komponen untuk menampilkan content sections dari API fasilitas

import React from 'react';
import { FacilityContent, FacilityPhoto, SubFacilityPhoto } from '@/services/facilityService';
import { FacilityPhotoCollage } from './FacilityPhotoCollage';

interface FacilityContentSectionsProps {
  content: FacilityContent[];
  photos: (FacilityPhoto | SubFacilityPhoto)[];
}

export const FacilityContentSections: React.FC<FacilityContentSectionsProps> = ({ 
  content, 
  photos 
}) => {
  if (!content || content.length === 0) {
    return null;
  }

  // Sort content by order_index
  const sortedContent = content
    .filter(section => section.is_active)
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <>
      {sortedContent.map((section) => (
        <React.Fragment key={section.id}>
          {/* Content Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Section Title */}
                {section.section_title && (
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      {section.section_title}
                    </h2>
                    <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
                  </div>
                )}
                
                {/* Content based on display type */}
                {section.display_type === 'wysiwyg' && (
                  <div className="prose prose-lg max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: section.content 
                      }}
                      className="text-gray-700 leading-relaxed"
                    />
                  </div>
                )}
                
                {section.display_type === 'simple_text' && (
                  <div className="text-gray-700 leading-relaxed text-lg">
                    <p>{section.content}</p>
                  </div>
                )}
                
                {section.display_type === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: section.content 
                      }}
                      className="text-gray-700 leading-relaxed"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Photo Collage Section (if enabled for this section) */}
          {section.show_photo_collage && photos.length > 0 && (
            <FacilityPhotoCollage 
              photos={photos}
              title="Galeri Foto Fasilitas"
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}; 