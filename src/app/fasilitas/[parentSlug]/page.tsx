'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Header } from '@/components/Header'
import { useSubFacility } from '@/hooks/useFacility'
import { FacilityLoading } from '@/components/FacilityLoading'
import { FacilityBanner } from '@/components/FacilityBanner'
import { FacilityBoxes } from '@/components/FacilityBoxes'
import { FacilityCard } from '@/components/FacilityCard'
import { FacilityContentSection } from '@/components/FacilityContentSection'
import { FacilityPhotoCollage } from '@/components/FacilityPhotoCollage'
import { ErrorMessage } from '@/components/ErrorMessage'
import { facilityService } from '@/services/facilityService'

interface SubFacilityPageProps {
  params: Promise<{
    parentSlug: string
  }>
}

const SubFacilityPage: React.FC<SubFacilityPageProps> = ({ params }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua Fasilitas')
  const [parentSlug, setParentSlug] = useState<string>('')
  
  React.useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setParentSlug(resolvedParams.parentSlug)
    }
    getParams()
  }, [params])
  
  const { 
    data, 
    settings, 
    boxes, 
    photos,
    facilities, 
    isLoading, 
    error, 
    refreshData 
  } = useSubFacility(parentSlug)

  // Filter fasilitas berdasarkan pencarian
  const filteredFasilitas = facilities.filter(fasilitas => 
    fasilitas.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fasilitas.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fasilitas.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get unique categories
  const categories = ['Semua Fasilitas', ...Array.from(new Set(facilities.map(f => f.category)))]

  // Filter by category
  const filteredByCategory = selectedCategory === 'Semua Fasilitas' 
    ? filteredFasilitas 
    : filteredFasilitas.filter(f => f.category === selectedCategory)

  if (isLoading) {
    return <FacilityLoading />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <ErrorMessage 
          message={error} 
          onRetry={refreshData}
        />
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Sub-fasilitas tidak ditemukan
            </h1>
            <p className="text-gray-600">
              Halaman untuk "{parentSlug}" tidak tersedia
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Banner Section */}
      <FacilityBanner settings={settings} isSubFacility />

      {/* Custom Margin Section */}
      <section id="custom-margin-1" className="">
        <div className="w-full" style={{height: '100px'}}></div>
      </section>

      {/* Content Section */}
      <FacilityContentSection settings={settings} />

      {/* Photo Collage */}
      {settings.show_photo_collage && (
        <FacilityPhotoCollage 
          photos={photos}
          title="Galeri Foto Fasilitas"
        />
      )}

      {/* Sub Facility Boxes Section */}
      {boxes.length > 0 && <FacilityBoxes boxes={boxes} isSubFacility />}
      
      <div className="bg-gray-50 flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Cari ${settings.title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {settings.title}
            </div>
            <div className="w-12 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Menampilkan {filteredByCategory.length} dari {facilities.length} fasilitas
            </p>
          </div>

          {/* Facilities Grid */}
          {filteredByCategory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredByCategory.map((fasilitas) => (
                <FacilityCard 
                  key={fasilitas.id} 
                  facility={fasilitas}
                  isSubFacility
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                Tidak ada fasilitas yang ditemukan
              </div>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Semua Fasilitas')
                }}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubFacilityPage 