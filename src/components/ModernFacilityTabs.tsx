'use client';

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
}

interface ModernFacilityTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ModernFacilityTabs({ tabs, activeTab, onTabChange }: ModernFacilityTabsProps) {
  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                  : 'bg-white text-gray-600 border-gray-400 hover:border-gray-600'
              }`}
              style={{ fontFamily: 'SF Pro Display Bold, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
