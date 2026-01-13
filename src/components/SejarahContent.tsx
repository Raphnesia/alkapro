// src/components/SejarahContent.tsx
// Komponen untuk menampilkan konten sejarah singkat dengan grid system dan list items

import React from 'react';
import { SejarahSingkat } from '@/services/sejarahService';
import { ScrollReveal } from './ScrollReveal';

interface SejarahContentProps {
  content: SejarahSingkat[];
}

export function SejarahContent({ content }: SejarahContentProps) {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Belum ada konten sejarah yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {content.map((section, index) => (
        <ScrollReveal 
          key={section.id}
          direction="up" 
          delay={200 + (index * 100)} 
          duration={600}
        >
          <div 
            className={`${section.background_color} ${section.border_color} p-6 rounded-lg shadow-lg border`}
          >
            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {section.title}
            </h3>
            
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: section.content }}
                className="text-gray-700 leading-relaxed"
              />
            </div>
            
            {/* List Items */}
            {section.use_list_disc && section.list_items && section.list_items.length > 0 && (
              <div className="mt-6">
                <ul className="list-disc pl-6 space-y-2">
                  {section.list_items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="text-gray-700 leading-relaxed"
                    >
                      {item.item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

// Komponen untuk menampilkan konten dengan grid system
export function SejarahGridContent({ content }: SejarahContentProps) {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Belum ada konten sejarah yang tersedia.</p>
      </div>
    );
  }

  // Group content by grid type
  const contentByGridType = content.reduce((acc, section) => {
    if (!acc[section.grid_type]) {
      acc[section.grid_type] = [];
    }
    acc[section.grid_type].push(section);
    return acc;
  }, {} as Record<string, SejarahSingkat[]>);

  return (
    <div className="space-y-12">
      {Object.entries(contentByGridType).map(([gridType, sections]) => (
        <div key={gridType}>
          <div className={`grid ${gridType} gap-6`}>
            {sections.map((section, index) => (
              <ScrollReveal 
                key={section.id}
                direction="up" 
                delay={200 + (index * 100)} 
                duration={600}
              >
                <div 
                  className={`${section.background_color} ${section.border_color} p-6 rounded-lg shadow-lg border h-full`}
                >
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                    {section.title}
                  </h3>
                  
                  {/* Content */}
                  <div className="prose prose-sm max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ __html: section.content }}
                      className="text-gray-700 leading-relaxed text-sm"
                    />
                  </div>
                  
                  {/* List Items */}
                  {section.use_list_disc && section.list_items && section.list_items.length > 0 && (
                    <div className="mt-4">
                      <ul className="list-disc pl-4 space-y-1">
                        {section.list_items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex}
                            className="text-gray-700 leading-relaxed text-sm"
                          >
                            {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 