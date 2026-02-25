// src/components/IPMCard.tsx
// Komponen untuk menampilkan kartu profil IPM

import React from 'react';
import Image from 'next/image';
import { IPMPengurus } from '@/services/ipmServiceNew';
import { ScrollReveal } from './ScrollReveal';

interface IPMCardProps {
  pengurus: IPMPengurus;
  layout: 'left' | 'right';
}

export function IPMCard({ pengurus, layout }: IPMCardProps) {
  if (!pengurus) {
    return null;
  }

  const {
    name,
    position,
    photo,
    kelas,
    description
  } = pengurus;

  // Fallback image jika photo tidak tersedia
  const imageSrc = photo || '/guru/Adam-Muttaqien-M.Si_.jpg';
  
  // Background pattern untuk section
  const backgroundPattern = "https://www.ums.ac.id/__image__/uploads/KZ4tligbcEdhZFxCLan8FNQMirVQuIYtCOMHLOqd.svg";

  return (
    <section className="relative lg:h-[700px] h-auto overflow-hidden min-h-[600px] max-h-[750px]" style={{fontFamily: 'Ubuntu, sans-serif'}}>
      <img 
        draggable={false} 
        alt="banner" 
        src={backgroundPattern}
        className="w-full absolute inset-0 object-cover h-full" 
      />
      
      <div className="relative lg:relative top-0 w-full h-full flex">
        <div className="w-full lg:relative mt-auto">
          <div className="flex justify-center mx-0 mt-3 lg:mt-5 px-4 overflow-hidden">
            {/* Mobile Layout - Foto di atas, teks di bawah */}
            <div className="w-full lg:hidden flex flex-col items-center text-center py-6 pb-12" style={{fontFamily: 'Ubuntu, sans-serif'}}>
              {/* Mobile Image */}
              <ScrollReveal direction="up" delay={300} duration={600}>
                <div className="mb-6">
                  <Image 
                    src={imageSrc}
                    alt={`${name} image`}
                    width={140}
                    height={140}
                    className="rounded-full bg-gray-300 mx-auto object-cover" 
                    style={{width: '35vw', height: '35vw'}}
                  />
                </div>
              </ScrollReveal>
              
              {/* Mobile Content */}
              <ScrollReveal direction="up" delay={400} duration={600}>
                <div className="px-4 text-left">
                  <h4 className="text-sm mb-2 text-black" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                    Kelas {kelas}
                  </h4>
                  
                  <h3 className="mb-2 font-bold text-black" style={{fontFamily: 'Ubuntu, sans-serif', fontSize: '28px'}}>
                    {name}
                  </h3>
                  
                  <div className="flex mb-3">
                    <span className="w-16 h-1 bg-red-600"></span>
                  </div>
                  
                  <p className="font-semibold text-sm font-regular mb-4 text-black" style={{fontFamily: 'Quicksand, sans-serif'}}>
                    {position}
                  </p>
                  
                  {description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {description}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            </div>
            
            {/* Desktop Layout - Perbaikan untuk container gambar */}
            <div className="hidden lg:grid lg:grid-cols-2 w-full max-w-none mx-auto relative z-20 h-[600px] gap-4">
              {layout === 'left' ? (
                <>
                  {/* Left Column - Image */}
                  <ScrollReveal direction="left" delay={300} duration={700}>
                    <div className="flex items-center justify-center p-4">
                      <div className="w-full max-w-md h-[600px] flex items-start justify-center pt-0">
                        <Image 
                          src={imageSrc}
                          alt={`${name} image`}
                          width={500}
                          height={550}
                          className="object-cover object-top rounded-lg max-w-full max-h-full" 
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  {/* Right Column - Content */}
                  <ScrollReveal direction="right" delay={500} duration={700}>
                    <div className="flex items-center pt-12" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                      <div className="max-w-none pr-4">
                        <h4 className="text-lg font-medium text-black mb-2" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                          Kelas {kelas}
                        </h4>
                        
                        <h3 className="mb-3 text-3xl lg:text-5xl font-bold text-black" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                          {name}
                        </h3>
                        
                        <div className="flex justify-start mb-3">
                          <span className="w-16 h-1 bg-red-600"></span>
                        </div>
                        
                        <p className="font-bold text-xl font-semibold text-black mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
                          {position}
                        </p>
                        
                        {description && (
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                </>
              ) : (
                <>
                  {/* Left Column - Content */}
                  <ScrollReveal direction="left" delay={500} duration={700}>
                    <div className="flex items-center pt-12 pl-16" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                      <div className="max-w-none">
                        <h4 className="text-lg font-medium text-black mb-2" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                          Kelas {kelas}
                        </h4>
                        
                        <h3 className="mb-3 text-3xl lg:text-5xl font-bold text-black" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                          {name}
                        </h3>
                        
                        <div className="flex justify-start mb-3">
                          <span className="w-16 h-1 bg-red-600"></span>
                        </div>
                        
                        <p className="font-bold text-lg font-semibold text-black mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
                          {position}
                        </p>
                        
                        {description && (
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  {/* Right Column - Image */}
                  <ScrollReveal direction="right" delay={300} duration={700}>
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-md h-[600px] flex items-start justify-center">
                        <Image 
                          src={imageSrc}
                          alt={`${name} image`}
                          width={500}
                          height={550}
                          className="object-cover object-top rounded-lg max-w-full max-h-full" 
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                </>
              )}
            </div>
          </div>
          
          {/* Red Bar - Posisi di bottom dengan height yang menyesuaikan */}
          <ScrollReveal direction="up" delay={600} duration={500}>
            <div className="w-full h-8 lg:h-20 bg-red-600 flex justify-center absolute bottom-0 mx-0 z-50">
              {layout === 'left' ? (
                <>
                  <div className="hidden lg:block lg:w-5/12"></div>
                  <div className="w-full lg:w-7/12 text-xs lg:text-sm font-bold text-white py-1 lg:py-3 text-right flex items-center justify-end pr-4" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                    {/* Footer content dapat ditambahkan di sini */}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full lg:w-7/12 text-xs lg:text-sm font-bold text-white py-1 lg:py-3 text-left flex items-center justify-start pl-4" style={{fontFamily: 'Ubuntu, sans-serif'}}>
                    {/* Footer content dapat ditambahkan di sini */}
                  </div>
                  <div className="hidden lg:block lg:w-5/12"></div>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
} 