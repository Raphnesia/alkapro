import React from 'react'

const ProgramKhususLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        
        {/* Desktop Overlay Skeleton */}
        <div className="absolute inset-0 hidden md:flex md:items-end">
          <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="container mx-auto px-8 pb-16">
              <div className="max-w-3xl">
                {/* Title Panel Skeleton */}
                <div className="d-block">
                  <div className="bg-gray-400 animate-pulse d-inline-flex p-5">
                    <div className="h-8 w-48 bg-gray-500 animate-pulse rounded"></div>
                  </div>
                </div>
                
                {/* Subtitle Panel Skeleton */}
                <div className="bg-gray-500 animate-pulse p-4 opacity-90 d-inline-flex rounded-b-lg mt-2">
                  <div className="h-6 w-96 bg-gray-600 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Section Skeleton */}
      <div className="w-full bg-gray-400 animate-pulse py-6 md:hidden">
        <div className="container mx-auto px-4">
          <div className="d-block">
            <div className="bg-gray-500 animate-pulse d-inline-flex p-4">
              <div className="h-6 w-32 bg-gray-600 animate-pulse rounded"></div>
            </div>
            
            <div className="bg-gray-600 animate-pulse mb-0 p-4 opacity-90 d-inline-flex mt-2">
              <div className="h-4 w-80 bg-gray-700 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Overview Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-80 bg-gray-300 animate-pulse rounded mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Program Image Skeleton */}
                <div className="relative h-64 bg-gray-300 animate-pulse">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-8 w-3/4 bg-gray-400 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-400 animate-pulse rounded"></div>
                  </div>
                </div>

                {/* Program Content Skeleton */}
                <div className="p-6">
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mb-6"></div>

                  {/* Features Skeleton */}
                  <div className="mb-6">
                    <div className="h-5 w-40 bg-gray-300 animate-pulse rounded mb-3"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse mt-2 mr-3 flex-shrink-0"></div>
                          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button Skeleton */}
                  <div className="h-12 w-full bg-gray-300 animate-pulse rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan Section Skeleton */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="h-12 w-96 bg-gray-300 animate-pulse rounded mx-auto mb-6"></div>
            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="relative group">
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-gray-200/50 h-full">
                  <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-2xl mb-6"></div>
                  <div className="h-6 w-32 bg-gray-300 animate-pulse rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-gray-400 animate-pulse">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="h-10 w-80 bg-gray-500 animate-pulse rounded mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-gray-500 animate-pulse rounded mx-auto mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 w-40 bg-gray-500 animate-pulse rounded-lg"></div>
            <div className="h-12 w-40 bg-gray-500 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgramKhususLoading