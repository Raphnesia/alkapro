export function AlkaproLibraryLoading() {
  return (
    <div className="alkapro-library-loading">
      {/* Hero Loading */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-8 bg-white/20 rounded-lg animate-pulse" />
              <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
              <div className="h-6 bg-white/20 rounded-lg animate-pulse w-3/4" />
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-white/20 rounded-lg animate-pulse" />
                <div className="h-12 w-32 bg-white/20 rounded-lg animate-pulse" />
              </div>
            </div>
            <div className="h-64 bg-white/20 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Content Loading */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-6 bg-gray-300 rounded animate-pulse w-1/3" />
              <div className="h-10 bg-gray-300 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-300 rounded animate-pulse w-4/6" />
              </div>
            </div>
            <div className="h-64 bg-gray-300 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Features Loading */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-300 rounded animate-pulse mx-auto w-1/2 mb-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-6">
                <div className="h-8 bg-gray-300 rounded animate-pulse w-1/2" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse flex-shrink-0" />
                      <div className="h-4 bg-gray-300 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Loading */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded animate-pulse mx-auto w-1/3 mb-4" />
            <div className="h-4 bg-gray-300 rounded animate-pulse mx-auto w-1/2" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Service Hours Loading */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-300 rounded animate-pulse mx-auto w-1/2" />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-2xl animate-pulse mx-auto" />
                    <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2 mx-auto" />
                    <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
