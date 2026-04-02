'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Header } from '@/components/Header'
import { useFacility } from '@/hooks/useFacility'
import { FacilityLoading } from '@/components/FacilityLoading'
import { FacilityBanner } from '@/components/FacilityBanner'
import { FacilityContentSections } from '@/components/FacilityContentSections'
import { ErrorMessage } from '@/components/ErrorMessage'
import ModernFacilityTabs from '@/components/ModernFacilityTabs'
import FacilityHeroSection from '@/components/FacilityHeroSection'

const FasilitasList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const { 
    data, 
    settings, 
    content,
    photos,
    boxes, 
    facilities, 
    isLoading, 
    error, 
    refreshData 
  } = useFacility()

  // Get unique categories for tabs from content sections
  const categories = Array.from(new Set(content.map(c => c.section_title).filter(Boolean)))
  const tabs = [
    { id: 'all', label: 'All Facilities' },
    ...categories.map(cat => ({ 
      id: cat.toLowerCase().replace(/\s+/g, '-'), 
      label: cat 
    }))
  ]

  // Filter content by active tab
  const filteredContent = activeTab === 'all' 
    ? content 
    : content.filter(c => c.section_title?.toLowerCase().replace(/\s+/g, '-') === activeTab)

  if (isLoading) {
    return <FacilityLoading />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <ErrorMessage 
          message={error} 
          onRetry={refreshData}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Banner Section */}
      {settings && <FacilityBanner settings={settings} />}

      {/* Hero Section */}
      <FacilityHeroSection facilities={facilities} settings={settings} />

      {/* Modern Tabs */}
      {tabs.length > 1 && (
        <ModernFacilityTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      {/* Facility Content Sections with Modern Design */}
      <FacilityContentSections 
        content={filteredContent} 
        photos={photos}
        facilities={facilities}
      />
    </div>
  )
}

export default FasilitasList