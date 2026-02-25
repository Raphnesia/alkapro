import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export async function GET() {
  try {
    const username = 'smpmuh.alkautsarpk';
    
    // Fetch Instagram profile page
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Instagram returned ${response.status}`);
    }

    const html = await response.text();
    
    // Extract JSON data from HTML
    const scriptRegex = /<script type="application\/ld\+json">({.*?})<\/script>/g;
    const matches = html.matchAll(scriptRegex);
    
    const posts: InstagramPost[] = [];
    
    for (const match of matches) {
      try {
        const jsonData = JSON.parse(match[1]);
        
        // Check if it's a social media posting
        if (jsonData['@type'] === 'SocialMediaPosting') {
          posts.push({
            id: jsonData.identifier || Date.now().toString(),
            caption: jsonData.articleBody || jsonData.headline || '',
            media_url: jsonData.image || '',
            media_type: 'IMAGE',
            permalink: jsonData.url || `https://www.instagram.com/p/${jsonData.identifier}/`,
            timestamp: jsonData.datePublished || new Date().toISOString(),
            like_count: jsonData.interactionStatistic?.find((stat: any) => stat.interactionType === 'http://schema.org/LikeAction')?.userInteractionCount || 0,
            comments_count: jsonData.commentCount || 0,
          });
        }
      } catch (e) {
        // Skip invalid JSON
        continue;
      }
    }

    // Alternative: Try to extract from shared data
    if (posts.length === 0) {
      const sharedDataRegex = /window\._sharedData = ({.*?});<\/script>/;
      const sharedDataMatch = html.match(sharedDataRegex);
      
      if (sharedDataMatch) {
        try {
          const sharedData = JSON.parse(sharedDataMatch[1]);
          const edges = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];
          
          edges.slice(0, 12).forEach((edge: any) => {
            const node = edge.node;
            posts.push({
              id: node.id,
              caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
              media_url: node.display_url || node.thumbnail_src,
              media_type: node.is_video ? 'VIDEO' : 'IMAGE',
              permalink: `https://www.instagram.com/p/${node.shortcode}/`,
              timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
              like_count: node.edge_liked_by?.count || 0,
              comments_count: node.edge_media_to_comment?.count || 0,
            });
          });
        } catch (e) {
          console.error('Error parsing shared data:', e);
        }
      }
    }

    if (posts.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No posts found. Instagram may have changed their HTML structure.',
        data: []
      });
    }

    return NextResponse.json({
      success: true,
      data: posts.slice(0, 12),
      cached_at: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Instagram scrape error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch Instagram posts',
      data: []
    }, { status: 500 });
  }
}
