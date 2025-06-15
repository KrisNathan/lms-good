import React from 'react';

interface Tab {
  label: string;
  count?: number;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  const activeIndex = tabs.findIndex(tab => tab.label === activeTab);
  const totalTabs = tabs.length;

  return (
    <div className="flex justify-center mb-8">
      <div className="relative bg-white rounded-full shadow-md flex p-1 w-fit">
        {/* Sliding highlight */}
        <div
          className="absolute top-1 bottom-1 left-1 rounded-full bg-blue-500 transition-all duration-300 ease-in-out z-0"
          style={{
            width: `calc((100% - ${8 * (totalTabs - 1)}px) / ${totalTabs})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        ></div>

        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => onTabChange(tab.label)}
              className={`relative z-10 px-5 py-2 rounded-full font-medium flex items-center space-x-2 transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-blue-500' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
