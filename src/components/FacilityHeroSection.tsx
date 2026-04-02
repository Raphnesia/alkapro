'use client';

import Image from 'next/image';

interface Facility {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description?: string;
}

interface FacilitySettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string | null;
  banner_mobile: string | null;
}

interface FacilityHeroSectionProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  imageUrl?: string;
  facilities?: Facility[];
  settings?: FacilitySettings | null;
}

export default function FacilityHeroSection({
  title = "Elevate Your Learning Experience with",
  highlightedText = "Our Exceptional Facilities",
  description,
  imageUrl,
  facilities = [],
  settings
}: FacilityHeroSectionProps) {
  console.log('=== FacilityHeroSection Debug ===');
  console.log('Settings:', settings);
  console.log('Total facilities:', facilities.length);
  console.log('All facilities:', facilities.map(f => ({ name: f.name, slug: f.slug })));
  
  // Find "Ruang Kelas Nyaman" facility
  const ruangKelasNyaman = facilities.find(f => 
    f.name.toLowerCase().includes('ruang kelas nyaman') || 
    f.slug.toLowerCase().includes('ruang-kelas-nyaman')
  );

  console.log('Ruang Kelas Nyaman found:', ruangKelasNyaman);

  // Use imageUrl prop if provided, otherwise use facility image, otherwise use API image
  const finalImageUrl = imageUrl || ruangKelasNyaman?.image || 'https://api.alkapro.id/storage/facilities/01K2KZNSX6KHGFKRNG42RD5ZT7.jpeg';
  
  // Use description from settings.subtitle if available, otherwise use prop, otherwise use facility description, otherwise use default
  const finalDescription = settings?.subtitle || description || ruangKelasNyaman?.description || "At SMA Unggulan Rushd, our thoughtfully designed facilities foster an environment conducive to growth and exploration. With modern classrooms, dedicated art spaces, and versatile sports areas, we provide students with the resources to pursue their passions.";
  
  console.log('Final Image URL:', finalImageUrl);
  console.log('Final Description:', finalDescription);

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Decorative Line with Icon */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-0.5 bg-gray-300"></div>
          <div className="w-16 h-16 flex items-center justify-center">
            <Image
              src="/LOGOSEKOLAH.png"
              alt="Logo Sekolah"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div className="flex-1 h-0.5 bg-gray-300"></div>
        </div>

        {/* Title */}
        <div className="mx-auto mb-6" style={{ maxWidth: '1240px', minHeight: '36px' }}>
          <h2 
            className="text-center leading-tight"
            style={{ 
              fontFamily: "'SF Pro Display Bold', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: '30px',
              letterSpacing: '-0.5px'
            }}
          >
            <span className="text-gray-900">{title} </span>
            <span className="text-orange-500">{highlightedText}</span>
          </h2>
        </div>

        {/* Description */}
        <div className="mx-auto mb-12" style={{ maxWidth: '760px', minHeight: '90px' }}>
          <p 
            className="text-gray-500 leading-relaxed"
            style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '16px',
              lineHeight: '30px',
              textAlign: 'justify'
            }}
          >
            {finalDescription}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mx-auto relative overflow-hidden rounded-3xl shadow-xl" style={{ maxWidth: '1240px', height: '460px' }}>
          <Image
            src={finalImageUrl}
            alt="School Facilities"
            fill
            className="object-cover"
            sizes="1240px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
