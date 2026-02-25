import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { access_token, user_id } = await request.json()
    
    const response = await fetch('https://open-api.tiktok.com/video/list/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        max_count: 20,
        cursor: 0,
        fields: [
          'id',
          'video_description', 
          'cover_image_url',
          'share_url',
          'view_count',
          'like_count',
          'comment_count',
          'share_count',
          'create_time'
        ]
      })
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('TikTok API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch TikTok videos' },
      { status: 500 }
    )
  }
}