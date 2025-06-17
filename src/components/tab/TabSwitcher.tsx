import { useRef, useEffect, useState } from 'react';

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
  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeIndex];
    if (activeTabElement) {
      const { offsetWidth, offsetLeft } = activeTabElement;
      setHighlightStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [activeIndex, tabs]);

  return (
    <div className="flex justify-center mb-8">
      <div className="relative bg-white rounded-full shadow-md flex p-1 w-fit">
        {/* Sliding highlight */}
        <div
          className="absolute top-1 bottom-1 rounded-full bg-blue-500 transition-all duration-300 ease-in-out z-0"
          style={{
            width: `${highlightStyle.width}px`,
            left: `${highlightStyle.left}px`,
          }}
        ></div>

        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              ref={el => {
                if (el) tabRefs.current[index] = el;
              }}
              onClick={() => onTabChange(tab.label)}
              className={`relative z-10 p-2 md:px-5 md:py-2 rounded-full font-medium flex items-center gap-2 transition-colors duration-300 whitespace-nowrap text-xs md:text-base ${
                isActive ? 'text-white' : 'text-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`flex items-center justify-center text-[10px] md:text-xs font-bold rounded-full py-0.5 md:px-2 px-1 ${ 
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