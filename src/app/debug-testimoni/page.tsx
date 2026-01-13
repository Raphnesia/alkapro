'use client'

import { useState } from 'react'
import { homeApi } from '@/lib/api'

export default function DebugTestimoni() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testFetch = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Fetching testimonials...')
      const sections = await homeApi.byType('testimonials')
      console.log('Raw response:', sections)
      setResult(sections)
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Testimoni Data</h1>
      
      <button 
        onClick={testFetch}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Test Fetch Testimonials'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Raw Response:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
          
          {Array.isArray(result) && result.length > 0 && result[0]?.config_data && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Config Data:</h2>
              <pre className="bg-blue-50 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(result[0].config_data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}