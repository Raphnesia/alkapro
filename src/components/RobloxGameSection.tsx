'use client';

import Link from 'next/link';
import MacBookMockup from './MacBookMockup';

interface RobloxGameSectionProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  youtubeVideoId?: string;
  registerLink?: string;
  learnMoreLink?: string;
}

export default function RobloxGameSection({
  title = "Ready to join",
  highlightedText = "with us?",
  description = "To begin your journey at SMA Unggulan Rushd, please complete the registration form and submit all required documents",
  youtubeVideoId = "dQw4w9WgXcQ",
  registerLink = "/info-ppdb",

}: RobloxGameSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{ 
                fontFamily: "'SF Pro Display Bold', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700
              }}
            >
              <span className="text-gray-900">{title} </span>
              <span className="text-blue-500">{highlightedText}</span>
            </h2>

            <p 
              className="leading-relaxed text-justify"
              style={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px',
                lineHeight: '26px',
                textAlign: 'justify'
              }}
            >
              {description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <Link
                href={registerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg text-sm md:text-base"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Jelajahi Sekarang
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-5 md:h-5">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - MacBook Mockup with YouTube Video */}
          <div className="flex justify-center order-1 lg:order-2">
            <MacBookMockup youtubeVideoId={youtubeVideoId} />
          </div>
        </div>
      </div>
    </section>
  );
}
