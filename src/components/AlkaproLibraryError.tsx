interface AlkaproLibraryErrorProps {
  error?: string
  onRetry?: () => void
}

export function AlkaproLibraryError({ error, onRetry }: AlkaproLibraryErrorProps) {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Gagal Memuat Data Perpustakaan
          </h3>
          <p className="text-gray-600 mb-6">
            {error || 'Terjadi kesalahan saat memuat informasi perpustakaan. Silakan coba lagi.'}
          </p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
