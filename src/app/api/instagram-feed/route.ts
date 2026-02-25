import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
    const USER_ID = process.env.INSTAGRAM_USER_ID;

    if (!TOKEN || !USER_ID) {
      console.log('⚠️ Instagram credentials not configured, using fallback data');
      
      // Return fallback data jika credentials tidak ada
      return NextResponse.json({
        data: [
          {
            id: 'fallback-1',
            media_type: 'IMAGE',
            media_url: '/BeritaGambar/beritacontoh1.webp',
            thumbnail_url: '/BeritaGambar/beritacontoh1.webp',
            caption: 'Kegiatan belajar mengajar di sekolah kami - Semangat belajar untuk masa depan yang lebih baik! 📚✨',
            permalink: 'https://instagram.com/your_school_instagram',
            timestamp: new Date().toISOString()
          },
          {
            id: 'fallback-2',
            media_type: 'IMAGE',
            media_url: '/guru/611115.jpeg',
            thumbnail_url: '/guru/611115.jpeg',
            caption: 'Tim guru profesional kami siap membimbing siswa-siswi menuju kesuksesan 🎓👨‍🏫',
            permalink: 'https://instagram.com/your_school_instagram',
            timestamp: new Date(Date.now() - 86400000).toISOString() // 1 hari yang lalu
          },
          {
            id: 'fallback-3',
            media_type: 'IMAGE',
            media_url: '/image112.png',
            thumbnail_url: '/image112.png',
            caption: 'Fasilitas sekolah yang modern dan nyaman untuk mendukung proses pembelajaran 🏫🌟',
            permalink: 'https://instagram.com/your_school_instagram',
            timestamp: new Date(Date.now() - 172800000).toISOString() // 2 hari yang lalu
          }
        ]
      });
    }

    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'permalink',
      'thumbnail_url',
      'timestamp',
    ].join(',');

    const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&access_token=${TOKEN}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text();
      console.error('Instagram API error:', res.status, text);
      
      // Jika API gagal, return fallback data
      return NextResponse.json({
        data: [
          {
            id: 'fallback-api-error-1',
            media_type: 'IMAGE',
            media_url: '/BeritaGambar/beritacontoh1.webp',
            thumbnail_url: '/BeritaGambar/beritacontoh1.webp',
            caption: 'Kegiatan belajar mengajar di sekolah kami - Semangat belajar untuk masa depan yang lebih baik! 📚✨',
            permalink: 'https://instagram.com/your_school_instagram',
            timestamp: new Date().toISOString()
          }
        ]
      });
    }

    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];

    const normalized = items.map((p: any) => ({
      id: p.id,
      media_type: p.media_type,
      media_url: p.media_url,
      thumbnail_url: p.thumbnail_url,
      caption: p.caption,
      permalink: p.permalink,
      timestamp: p.timestamp,
    }));

    return NextResponse.json({ data: normalized });
  } catch (err: any) {
    console.error('Instagram API Error:', err?.message || err);
    
    // Return fallback data jika terjadi error
    return NextResponse.json({
      data: [
        {
          id: 'fallback-error-1',
          media_type: 'IMAGE',
          media_url: '/BeritaGambar/beritacontoh1.webp',
          thumbnail_url: '/BeritaGambar/beritacontoh1.webp',
          caption: 'Kegiatan belajar mengajar di sekolah kami - Semangat belajar untuk masa depan yang lebih baik! 📚✨',
          permalink: 'https://instagram.com/your_school_instagram',
          timestamp: new Date().toISOString()
        }
      ]
    });
  }
}