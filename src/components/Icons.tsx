export const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export const GridIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)

export const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export const IndonesiaFlag = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="14" fill="#FF5555"/>
    <rect y="14" width="40" height="14" fill="white"/>
  </svg>
)

export const GreatBritainFlag = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="28" fill="#012169"/>
    <path d="M0 0L40 28M40 0L0 28" stroke="white" strokeWidth="3"/>
    <path d="M0 0L40 28M40 0L0 28" stroke="#C8102E" strokeWidth="2"/>
    <path d="M20 0V28M0 14H40" stroke="white" strokeWidth="5"/>
    <path d="M20 0V28M0 14H40" stroke="#C8102E" strokeWidth="3"/>
  </svg>
)

export const SaudiArabiaFlag = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="28" fill="#006C35"/>
    <text x="20" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
      لا إله إلا الله محمد رسول الله
    </text>
    <path d="M8 20L12 22L8 24" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
) 