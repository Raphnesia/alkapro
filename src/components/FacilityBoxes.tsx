// src/components/FacilityBoxes.tsx
// Komponen untuk menampilkan facility boxes

import React from 'react';
import Link from 'next/link';
import { FacilityBox, SubFacilityBox } from '@/services/facilityService';

interface FacilityBoxesProps {
  boxes: FacilityBox[] | SubFacilityBox[];
  isSubFacility?: boolean;
}

export const FacilityBoxes: React.FC<FacilityBoxesProps> = ({ 
  boxes, 
  isSubFacility = false 
}) => {
  const activeBoxes = boxes.filter(box => box.is_active);

  if (activeBoxes.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-wrap bg-blue-600">
        {activeBoxes.map((box, index) => {
          const isEven = index % 2 === 0;
          const orderClass = isEven ? 
            `order-${index + 1} lg:order-${index + 1}` : 
            `order-${index + 2} lg:order-${index + 2}`;
          
          const backgroundOrderClass = isEven ? 
            `order-${index + 2} lg:order-${index + 2}` : 
            `order-${index + 1} lg:order-${index + 1}`;

          return (
            <React.Fragment key={box.id}>
              {/* Box Content */}
              <Link 
                href={isSubFacility ? '#' : `/fasilitas/${(box as FacilityBox).link_slug}`}
                className={`w-1/2 lg:w-1/3 ${orderClass} p-1 sm:p-2 md:p-3 lg:p-4 text-center text-white flex items-center hover:${box.hover_bg_color} transition-colors ${box.bg_color}`}
              >
                <div className="w-full py-2 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-2 md:px-3 lg:px-3 text-white">
                  {/* Icon */}
                  {box.icon && (
                    <img 
                      alt=""
                      draggable={false}
                      src={box.icon}
                      className="w-12 h-12 mx-auto mb-2"
                    />
                  )}
                  
                  {/* Title */}
                  <span className="text-xl font-bold block">
                    {box.title}
                  </span>
                  
                  {/* Description */}
                  <p className="mt-2 md:mt-3 text-sm font-semibold">
                    {box.description}
                  </p>
                </div>
              </Link>
              
              {/* Background Image */}
              {box.background_image && (
                <div 
                  className={`w-1/2 lg:w-1/3 ${backgroundOrderClass} h-64`}
                  style={{
                    background: `url('${box.background_image}') center center / cover`
                  }}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}; 