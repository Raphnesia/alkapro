// src/components/FacilityCard.tsx
// Komponen kartu fasilitas

import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Settings } from 'lucide-react';
import { Facility, SubFacility } from '@/services/facilityService';

interface FacilityCardProps {
  facility: Facility | SubFacility;
  isSubFacility?: boolean;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ 
  facility, 
  isSubFacility = false 
}) => {
  const specifications = Object.entries(facility.specifications || {});

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {facility.image ? (
          <img 
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Settings className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {facility.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {facility.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {facility.description}
        </p>
        
        {/* Location */}
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin size={14} className="mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{facility.location}</span>
        </div>
        
        {/* Capacity */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Users size={14} className="mr-2 flex-shrink-0" />
          <span>Kapasitas: {facility.capacity} orang</span>
        </div>
        
        {/* Specifications */}
        {specifications.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Spesifikasi:</h4>
            <div className="grid grid-cols-2 gap-2">
              {specifications.slice(0, 4).map(([key, value]) => (
                <div key={key} className="text-xs text-gray-600">
                  <span className="font-medium capitalize">{key}:</span> {value}
                </div>
              ))}
            </div>
            {specifications.length > 4 && (
              <div className="text-xs text-gray-500 mt-1">
                +{specifications.length - 4} spesifikasi lainnya
              </div>
            )}
          </div>
        )}
        
        {/* Action Button */}
        <Link 
          href={isSubFacility 
            ? `/fasilitas/${(facility as SubFacility).parent_slug}/${facility.slug}`
            : `/fasilitas/detail/${facility.slug}`
          }
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Lihat Detail
        </Link>
        
        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>ID: {facility.id}</span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Tersedia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 