'use client'

import { useState, useEffect } from 'react'
import { getApiUrl, getImageUrl } from '@/lib/config'
import Image from 'next/image'

export default function TestKegiatanPage() {
  const [kegiatan, setKegiatan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testKegiatan = async () => {
      try {
        setLoading(true)
        console.log('🧪 Testing kegiatan endpoint...')
        
        // Test complete endpoint
        const response = await fetch(getApiUrl('/activities/complete'))
        console.log('📡 Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📊 Kegiatan data:', data)
        
        // Process activities with image URLs
        if (data?.data?.activities) {
          const processedActivities = data.data.activities.map((activity: any) => ({
            ...activity,
            imageUrl: getImageUrl(activity.image),
            originalImage: activity.image
          }))
          
          setKegiatan({
            settings: data.data.settings,
            activities: processedActivities
          })
        }
        
      } catch (err) {
        console.error('❌ Error testing kegiatan:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testKegiatan()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Testing kegiatan endpoint...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error Testing Kegiatan</h1>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Kegiatan Test Results</h1>
      
      {/* Settings */}
      {kegiatan?.settings && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Settings Data</h2>
          <pre className="bg-white p-4 rounded overflow-auto text-sm">
            {JSON.stringify(kegiatan.settings, null, 2)}
          </pre>
        </div>
      )}

      {/* Activities */}
      {kegiatan?.activities && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Activities List</h2>
          <div className="space-y-4">
            {kegiatan.activities.map((activity: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded border">
                <h3 className="font-semibold">{activity.title}</h3>
                <p className="text-gray-600 text-sm">Category: {activity.category}</p>
                <p className="text-gray-600 text-sm">Original Image: {activity.originalImage}</p>
                <p className="text-gray-600 text-sm">Processed Image: {activity.imageUrl}</p>
                
                {/* Test Image Display */}
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Image Preview:</h4>
                  <div className="relative w-32 h-32 border rounded overflow-hidden">
                    <Image
                      src={activity.imageUrl || '/pace.jpeg'}
                      alt={activity.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.error('❌ Image failed to load:', activity.imageUrl)
                      }}
                      onLoad={() => {
                        console.log('✅ Image loaded successfully:', activity.imageUrl)
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw API Response */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Raw API Response</h2>
        <pre className="bg-white p-4 rounded overflow-auto text-sm">
          {JSON.stringify(kegiatan, null, 2)}
        </pre>
      </div>
    </div>
  )
} 