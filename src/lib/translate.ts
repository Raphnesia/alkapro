// Simple client-side translation helper with caching
// Uses LibreTranslate-compatible server. Provide your own via NEXT_PUBLIC_TRANSLATE_BASE_URL

const TRANSLATE_BASE = process.env.NEXT_PUBLIC_TRANSLATE_BASE_URL || 'https://libretranslate.de';

function cacheKey(text: string, target: string, source?: string) {
  const key = `${source || 'auto'}:${target}:${text}`;
  try {
    return 'tr:' + btoa(unescape(encodeURIComponent(key))).slice(0, 200);
  } catch {
    return 'tr:' + key.slice(0, 200);
  }
}

export function isArabic(text?: string | null): boolean {
  if (!text) return false;
  return /[\u0600-\u06FF]/.test(text);
}

export async function translateText(text: string, target: string, source: string = 'auto'): Promise<string> {
  if (!text || target === 'id') return text;
  const key = cacheKey(text, target, source);
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(key);
    if (cached) return cached;
  }
  try {
    // Try internal API route (Gemini if configured)
    const resApi = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target, source }),
    });
    if (resApi.ok) {
      const j = await resApi.json();
      const translated = j?.translatedText || j?.translated || text;
      if (typeof window !== 'undefined') localStorage.setItem(key, translated);
      return translated;
    }
  } catch {}
  try {
    const res = await fetch(`${TRANSLATE_BASE}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text' }),
    });
    if (!res.ok) throw new Error(String(res.status));
    const json: any = await res.json();
    const translated = json?.translatedText || text;
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, translated);
    }
    return translated;
  } catch {
    return text;
  }
}

export async function translateIfNeeded(text: string | undefined | null, target: string): Promise<string | undefined> {
  if (!text) return text || undefined;
  if (target === 'ar' && isArabic(text)) return text;
  if (target !== 'ar' && !isArabic(text)) return text; // assume already in target or neutral
  return await translateText(text, target);
}


