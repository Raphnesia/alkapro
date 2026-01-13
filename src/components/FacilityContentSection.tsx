// src/components/FacilityContentSection.tsx
// Komponen untuk content section pada sub-fasilitas

import React from 'react';
import { SubFacilitySettings } from '@/services/facilityService';

interface FacilityContentSectionProps {
  settings: SubFacilitySettings;
}

export const FacilityContentSection: React.FC<FacilityContentSectionProps> = ({ 
  settings 
}) => {
  if (!settings.content_section_title && !settings.content_section_text) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          {settings.content_section_title && (
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {settings.content_section_title}
              </h2>
              <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          )}
          
          {/* Content */}
          {settings.content_section_text && (
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: settings.content_section_text 
                }}
                className="text-gray-700 leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 