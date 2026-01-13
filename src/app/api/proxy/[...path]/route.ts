import { NextRequest, NextResponse } from 'next/server'

// Gunakan environment variable untuk production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.alkapro.id/api/v1'

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params
  return handleRequest(request, params, 'GET')
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params
  return handleRequest(request, params, 'POST')
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params
  return handleRequest(request, params, 'PUT')
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params
  return handleRequest(request, params, 'DELETE')
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    }
  })
}

async function handleRequest(request: NextRequest, params: { path: string[] }, method: string) {
  try {
    const path = params.path.join('/')
    const url = `${API_BASE_URL}/${path}`
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const queryString = searchParams.toString()
    const finalUrl = queryString ? `${url}?${queryString}` : url
    
    console.log(`[PROXY] ${method} ${finalUrl}`)
    
		// Prepare headers (tidak perlu Content-Type untuk GET)
    const headers: HeadersInit = {
			Accept: 'application/json',
      'User-Agent': 'NextJS-Proxy/1.0'
    }
    
    // Copy authorization header if exists
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    
    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
      cache: 'no-store'
    }
    
    // Add body for POST/PUT requests
    if (method === 'POST' || method === 'PUT') {
      try {
        const body = await request.text()
        if (body) {
					requestOptions.body = body;
					(headers as any)['Content-Type'] = 'application/json'
        }
      } catch (error) {
        console.error('Error reading request body:', error)
      }
    }
    
    // Make request to Laravel API
    const response = await fetch(finalUrl, requestOptions)
    
    // Get response data
    let data
    const contentType = response.headers.get('content-type')
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }
    
    console.log(`[PROXY] Response: ${response.status}`)
    
    // Return response with CORS headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
    
  } catch (error) {
    console.error('[PROXY] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from API', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
        }
      }
    )
  }
}