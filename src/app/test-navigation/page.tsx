'use client'

import { useHeader, useFooter } from '@/hooks/useNavigation'

export default function TestNavigationPage() {
  const { headerData, loading: headerLoading, error: headerError } = useHeader()
  const { footerData, loading: footerLoading, error: footerError } = useFooter()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Test Navigation API</h1>
      
      {/* Header API Test */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Header API Test</h2>
        
        {headerLoading && (
          <div className="text-blue-600 mb-4">Loading header data...</div>
        )}
        
        {headerError && (
          <div className="text-red-600 mb-4 p-3 bg-red-50 rounded border border-red-200">
            Error: {headerError}
          </div>
        )}
        
        {headerData && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Branding</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Logo:</strong> {headerData.branding.header_logo || 'Tidak ada logo'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Marquee ({headerData.marquee?.length || 0} items)</h3>
              <div className="bg-gray-50 p-3 rounded space-y-2">
                {headerData.marquee && headerData.marquee.length > 0 ? (
                  headerData.marquee.map((item, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-3">
                      <p><strong>Text:</strong> {item.text}</p>
                      <p className="text-sm text-gray-600">
                        Color: <span style={{ color: item.color }}>{item.color}</span> | 
                        Speed: {item.speed}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Tidak ada data marquee</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Menu Items ({headerData.menu.length})</h3>
              <div className="bg-gray-50 p-3 rounded space-y-2">
                {headerData.menu.map((item) => (
                  <div key={item.id} className="border-l-4 border-blue-500 pl-3">
                    <p><strong>{item.name}</strong> - {item.href}</p>
                    <p className="text-sm text-gray-600">Target: {item.target}, Order: {item.order_index}</p>
                    {item.dropdown.length > 0 && (
                      <div className="ml-4 mt-2">
                        <p className="text-sm font-medium text-gray-700">Dropdown ({item.dropdown.length}):</p>
                        {item.dropdown.map((subItem) => (
                          <div key={subItem.id} className="ml-4 text-sm text-gray-600">
                            • {subItem.name} - {subItem.href}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer API Test */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Footer API Test</h2>
        
        {footerLoading && (
          <div className="text-blue-600 mb-4">Loading footer data...</div>
        )}
        
        {footerError && (
          <div className="text-red-600 mb-4 p-3 bg-red-50 rounded border border-red-200">
            Error: {footerError}
          </div>
        )}
        
        {footerData && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Branding</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Tipe:</strong> {footerData.branding.footer_brand_type}</p>
                <p><strong>Teks:</strong> {footerData.branding.footer_brand_text || 'Tidak ada teks'}</p>
                <p><strong>Gambar:</strong> {footerData.branding.footer_brand_image || 'Tidak ada gambar'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">Menu Utama ({footerData.links['menu-utama'].length})</h4>
                  {footerData.links['menu-utama'].map((link) => (
                    <div key={link.id} className="text-sm text-gray-600">
                      • {link.name} - {link.href}
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">Informasi Akademik ({footerData.links['informasi-akademik'].length})</h4>
                  {footerData.links['informasi-akademik'].map((link) => (
                    <div key={link.id} className="text-sm text-gray-600">
                      • {link.name} - {link.href}
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">Sosial Media ({footerData.links.sosial.length})</h4>
                  {footerData.links.sosial.map((link) => (
                    <div key={link.id} className="text-sm text-gray-600">
                      • {link.name} - {link.href}
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">Lainnya ({footerData.links.lainnya.length})</h4>
                  {footerData.links.lainnya.map((link) => (
                    <div key={link.id} className="text-sm text-gray-600">
                      • {link.name} - {link.href}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Status */}
      <div className="p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">API Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-gray-700 mb-2">Header API</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  headerLoading ? 'bg-yellow-100 text-yellow-800' :
                  headerError ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {headerLoading ? 'Loading' : headerError ? 'Error' : 'Success'}
                </span>
              </p>
              <p><strong>Endpoint:</strong> /api/v1/navigation/header</p>
              <p><strong>Data:</strong> {headerData ? 'Tersedia' : 'Tidak tersedia'}</p>
              <p><strong>Marquee:</strong> {headerData?.marquee?.length || 0} items</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-gray-700 mb-2">Footer API</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  footerLoading ? 'bg-yellow-100 text-yellow-800' :
                  footerError ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {footerLoading ? 'Loading' : footerError ? 'Error' : 'Success'}
                </span>
              </p>
              <p><strong>Endpoint:</strong> /api/v1/navigation/footer</p>
              <p><strong>Data:</strong> {footerData ? 'Tersedia' : 'Tidak tersedia'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Cara Penggunaan</h2>
        <div className="space-y-2 text-blue-700">
          <p>1. Pastikan backend server berjalan di <code className="bg-blue-100 px-1 rounded">http://api.alkapro.id</code></p>
          <p>2. Pastikan endpoint <code className="bg-blue-100 px-1 rounded">/api/v1/navigation/header</code> dan <code className="bg-blue-100 px-1 rounded">/api/v1/navigation/footer</code> tersedia</p>
          <p>3. Jika API tidak tersedia, component akan menggunakan fallback data statis</p>
          <p>4. Gunakan halaman ini untuk debugging dan testing Navigation API</p>
          <p>5. <strong>Marquee baru:</strong> Sekarang mendukung teks, warna, dan kecepatan dari API!</p>
        </div>
      </div>
    </div>
  )
} 