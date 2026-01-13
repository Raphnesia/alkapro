import { NextRequest, NextResponse } from 'next/server'

// Serverless translate endpoint
// If GEMINI_API_KEY is provided, use Gemini 2.0 Flash (or 2.5 Flash-lite when available) for translation.
// Otherwise, return 501 and let client fallback to LibreTranslate public instance.

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY

export async function POST(req: NextRequest) {
  try {
    const { q, target, source } = await req.json()
    if (!q || !target) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ translatedText: null }, { status: 501 })
    }

    // Gemini translate via Text model prompt (stream off)
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
    const prompt = `Translate the following text from ${source || 'auto-detected language'} to ${target}.
Only return the translated text without additional explanation.
Text: """${q}"""`

    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, topP: 0.9, topK: 40, maxOutputTokens: 1024 },
      }),
    })

    if (!res.ok) {
      const t = await res.text()
      return NextResponse.json({ error: 'Gemini error', details: t }, { status: 502 })
    }
    const json = await res.json()
    const translated = json?.candidates?.[0]?.content?.parts?.[0]?.text || q
    return NextResponse.json({ translatedText: translated })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 500 })
  }
}


