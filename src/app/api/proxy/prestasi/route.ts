import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://api.alkapro.id/api/v1'

export async function GET() {
  try {
    console.log('🔍 Proxy prestasi request to:', `${API_BASE_URL}/prestasi`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(`${API_BASE_URL}/prestasi`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'School-Website/1.0'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error: any) {
    console.error('Proxy Prestasi API Error:', error)
    
    // Return fallback data when backend is down
    if (error.name === 'AbortError') {
      return NextResponse.json({ 
        error: 'Request timeout', 
        fallback: true,
        settings: null,
        right_image: null,
        list_prestasi: [],
        list_tahfidz: []
      }, { status: 408 })
    }

    return NextResponse.json({ 
      error: error.message || 'Backend unavailable', 
      fallback: true,
      settings: null,
      right_image: null,
      list_prestasi: [],
      list_tahfidz: []
    }, { status: 503 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    }
  })
} 