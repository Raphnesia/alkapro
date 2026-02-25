'use client';

import { useEffect, useState } from 'react';
import { dataFetchers, helpers } from '@/lib/site-config';
import { homeApi } from '@/lib/api'

interface ApiStatus {
  endpoint: string;
  status: 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
}

export default function TestConnectionPage() {
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([]);
  const [overallStatus, setOverallStatus] = useState<'loading' | 'connected' | 'failed'>('loading');
  const [instagramStatus, setInstagramStatus] = useState<string>('')
  const [instagramData, setInstagramData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    testAllConnections();
  }, []);

  const testAllConnections = async () => {
    const endpoints = [
      { name: 'Home Sections', fetcher: dataFetchers.getHomePageData },
      { name: 'Teachers', fetcher: () => dataFetchers.getProfilePageData() },
      { name: 'News', fetcher: () => dataFetchers.getNewsPageData(1) },
      { name: 'Articles', fetcher: () => dataFetchers.getArticlesPageData(1) },
      { name: 'Facilities', fetcher: dataFetchers.getFacilitiesPageData },
      { name: 'Activities', fetcher: () => dataFetchers.getActivitiesPageData(1) },
    ];

    const statuses: ApiStatus[] = [];
    let successCount = 0;

    for (const endpoint of endpoints) {
      try {
        setApiStatuses(prev => [...prev, { endpoint: endpoint.name, status: 'loading' }]);
        
        const data = await endpoint.fetcher();
        statuses.push({
          endpoint: endpoint.name,
          status: 'success',
          data: Array.isArray(data) 
            ? data.length 
            : 'data' in data 
              ? data.data?.length || 0
              : Object.values(data).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
        });
        successCount++;
      } catch (error) {
        statuses.push({
          endpoint: endpoint.name,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      
      setApiStatuses(statuses);
    }

    setOverallStatus(successCount === endpoints.length ? 'connected' : 'failed');
  };

  const testInstagramAPI = async () => {
    setLoading(true)
    setInstagramStatus('Testing Instagram API...')
    
    try {
      console.log('🔍 Testing Instagram API...')
      const data = await homeApi.social.instagram()
      console.log('📱 Instagram API Response:', data)
      
      if (Array.isArray(data) && data.length > 0) {
        setInstagramStatus(`✅ Instagram API berhasil! Ditemukan ${data.length} posts`)
        setInstagramData(data.slice(0, 3)) // Show first 3 posts
      } else {
        setInstagramStatus('⚠️ Instagram API berhasil tapi tidak ada data')
        setInstagramData(data)
      }
    } catch (error: any) {
      console.error('❌ Instagram API Error:', error)
      setInstagramStatus(`❌ Instagram API Error: ${error.message}`)
      setInstagramData(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading': return '🔄';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loading': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Koneksi API
          </h1>
          <p className="text-gray-600 mb-6">
            Halaman ini digunakan untuk memverifikasi koneksi antara Next.js frontend dengan Laravel backend
          </p>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            overallStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
            overallStatus === 'connected' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {overallStatus === 'loading' && '🔄 Testing...'}
            {overallStatus === 'connected' && '✅ All Connected'}
            {overallStatus === 'failed' && '❌ Connection Failed'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status Koneksi API</h2>
          <div className="space-y-3">
            {apiStatuses.map((status, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(status.status)}</span>
                  <span className="font-medium">{status.endpoint}</span>
                </div>
                <div className={`text-sm ${getStatusColor(status.status)}`}>
                  {status.status === 'success' && `${status.data} items found`}
                  {status.status === 'error' && status.error}
                  {status.status === 'loading' && 'Loading...'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram API Test */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Instagram API Test</h2>
          
          <button
            onClick={testInstagramAPI}
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Testing...' : 'Test Instagram API'}
          </button>
          
          {instagramStatus && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <p className="font-medium">{instagramStatus}</p>
            </div>
          )}
          
          {instagramData && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Sample Data:</h3>
              <pre className="bg-black/50 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(instagramData, null, 2)}
              </pre>
            </div>
          )}

          {/* Instagram Configuration Guide */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="font-medium text-yellow-300 mb-3">📱 Cara Konfigurasi Instagram di Backend</h3>
            <div className="text-sm text-yellow-200/80 space-y-2">
              <p>1. <strong>Login ke Backend Admin</strong> → Social Media → Settings</p>
              <p>2. <strong>Masukkan Instagram User ID</strong> (bukan username)</p>
              <p>3. <strong>Masukkan Instagram Access Token</strong> dari Facebook Developer</p>
              <p>4. <strong>Save Settings</strong> dan test ulang</p>
            </div>
            <div className="mt-3 text-xs text-yellow-300/60">
              <p>💡 <strong>Note:</strong> Jika backend belum dikonfigurasi, sistem akan otomatis menggunakan fallback local API</p>
            </div>
          </div>

          {/* Instagram Error Fix Guide */}
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h3 className="font-medium text-red-300 mb-3">🚨 Fix Instagram API Error</h3>
            <div className="text-sm text-red-200/80 space-y-2">
              <p><strong>Error yang ditemukan:</strong> "Object with ID 'raphnesiastore' does not exist"</p>
              <p><strong>Penyebab:</strong> Instagram User ID salah atau permissions tidak cukup</p>
            </div>
            
            <div className="mt-3 text-sm text-red-200/80">
              <p className="font-medium mb-2">🔧 Langkah Perbaikan:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li><strong>Dapatkan Instagram User ID yang benar</strong> (bukan username)</li>
                <li><strong>Generate Access Token baru</strong> dengan permissions yang tepat</li>
                <li><strong>Update di backend</strong> dengan credentials yang benar</li>
                <li><strong>Test ulang</strong> Instagram API</li>
              </ol>
            </div>

            <div className="mt-3 text-xs text-red-300/60">
              <p>💡 <strong>Solusi Sementara:</strong> Sistem sudah menggunakan fallback data lokal</p>
            </div>
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">NEXT_PUBLIC_API_BASE_URL</p>
              <p className="font-mono text-sm">{process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">NODE_ENV</p>
              <p className="font-mono text-sm">{process.env.NODE_ENV}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Cara Menggunakan</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>1. Backend Laravel:</strong> Pastikan Laravel backend sudah berjalan di <code className="bg-blue-100 px-2 py-1 rounded">http://api.alkapro.id</code></p>
            <p><strong>2. Frontend Next.js:</strong> Jalankan Next.js dengan perintah: <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code></p>
            <p><strong>3. Environment:</strong> Pastikan file <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> sudah dikonfigurasi dengan benar</p>
            <p><strong>4. Database:</strong> Pastikan database sudah di-migrate dan ada data</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
}