'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Users, Settings, Calendar } from 'lucide-react'
import { Header } from '@/components/Header'
import { facilityService, Facility } from '@/services/facilityService'
import { ErrorMessage } from '@/components/ErrorMessage'

interface FacilityDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

const FacilityDetailPage: React.FC<FacilityDetailPageProps> = ({ params }) => {
  const [facility, setFacility] = React.useState<Facility | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [slug, setSlug] = React.useState<string>('')

  React.useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getParams()
  }, [params])

  React.useEffect(() => {
    if (!slug) return
    
    const fetchFacility = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const data = await facilityService.getFacility(slug)
        setFacility(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data')
        console.error('Error fetching facility detail:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFacility()
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  if (!facility) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Fasilitas tidak ditemukan
            </h1>
            <p className="text-gray-600">
              Fasilitas yang Anda cari tidak tersedia
            </p>
          </div>
        </div>
      </div>
    )
  }

  const specifications = Object.entries(facility.specifications || {})

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/fasilitas" className="hover:text-blue-600">
              Fasilitas
            </Link>
            <span>/</span>
            <span className="text-gray-900">{facility.name}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/fasilitas"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Fasilitas
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div>
              {facility.image ? (
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Settings className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div>
              {/* Title and Category */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {facility.name}
                </h1>
                <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  {facility.category}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Deskripsi
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {facility.description}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <MapPin size={20} className="mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Lokasi</div>
                    <div className="text-sm">{facility.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Users size={20} className="mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Kapasitas</div>
                    <div className="text-sm">{facility.capacity} orang</div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              {specifications.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Spesifikasi
                  </h2>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {specifications.map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium text-gray-700 capitalize">
                            {key.replace('_', ' ')}
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/fasilitas"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Lihat Semua Fasilitas
                </Link>
                
                <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={16} className="mr-2" />
                  Jadwalkan Kunjungan
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Informasi Tambahan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <div className="font-medium text-gray-700 mb-1">ID Fasilitas</div>
                <div>{facility.id}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Urutan</div>
                <div>{facility.order_index}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Status</div>
                <div className="text-green-600">Tersedia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacilityDetailPage 