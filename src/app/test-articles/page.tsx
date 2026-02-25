'use client'

import { useState, useEffect } from 'react'
import { postApi } from '@/lib/api'

export default function TestArticlesPage() {
  const [articles, setArticles] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testArticles = async () => {
      try {
        setLoading(true)
        console.log('🧪 Testing articles endpoint...')
        
        // Test 1: Proxy endpoint
        console.log('📡 Test 1: Testing proxy endpoint...')
        const proxyResponse = await fetch('/api/proxy/articles')
        console.log('📡 Proxy Response status:', proxyResponse.status)
        
        if (!proxyResponse.ok) {
          throw new Error(`Proxy HTTP error! status: ${proxyResponse.status}`)
        }
        
        const proxyData = await proxyResponse.json()
        console.log('📊 Proxy data:', proxyData)
        
        // Test 2: postApi.getArticles()
        console.log('📡 Test 2: Testing postApi.getArticles()...')
        const apiResponse = await postApi.getArticles(1)
        console.log('📊 postApi.getArticles() response:', apiResponse)
        
        setArticles({
          proxy: proxyData,
          api: apiResponse
        })
        
      } catch (err) {
        console.error('❌ Error testing articles:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testArticles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Testing articles endpoints...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error Testing Articles</h1>
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
      <h1 className="text-3xl font-bold mb-8">Articles Test Results</h1>
      
      {/* Proxy Response */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Proxy API Response (/api/proxy/articles)</h2>
        <pre className="bg-white p-4 rounded overflow-auto text-sm">
          {JSON.stringify(articles?.proxy, null, 2)}
        </pre>
      </div>

      {/* postApi Response */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">postApi.getArticles() Response</h2>
        <pre className="bg-white p-4 rounded overflow-auto text-sm">
          {JSON.stringify(articles?.api, null, 2)}
        </pre>
      </div>

      {/* Articles List from Proxy */}
      {articles?.proxy?.data && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Articles List (Proxy)</h2>
          <div className="space-y-4">
            {articles.proxy.data.map((article: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded border">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-gray-600 text-sm">Slug: {article.slug}</p>
                <p className="text-gray-600 text-sm">Category: {article.category}</p>
                <p className="text-gray-600 text-sm">Author: {article.author}</p>
                <p className="text-gray-600 text-sm">Type: {article.type || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Articles List from postApi */}
      {articles?.api?.data && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Articles List (postApi)</h2>
          <div className="space-y-4">
            {articles.api.data.map((article: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded border">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-gray-600 text-sm">Slug: {article.slug}</p>
                <p className="text-gray-600 text-sm">Category: {article.category}</p>
                <p className="text-gray-600 text-sm">Author: {article.author}</p>
                <p className="text-gray-600 text-sm">Type: {article.type || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 