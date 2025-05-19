import { useState, useRef, useEffect } from "react";

interface Props {
  tabs: string[];
  onTabChanged?: (newTab: string, prevTab: string) => void;
}

export default function HorizontalTab({ tabs, onTabChanged = () => {} }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle horizontal scrolling with the mouse wheel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer) {
        // Prevent the default vertical scroll
        e.preventDefault();
        
        // Scroll horizontally instead
        scrollContainer.scrollLeft += e.deltaY;
      }
    };
    
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex flex-row rounded-2xl border border-slate-200 overflow-x-auto max-w-full scrollbar-thin scroll-smooth"
        style={{
          // Add custom scrollbar styling
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
      >
        {tabs.map((t, i) => (
          t === activeTab ? (
            <button
              key={i}
              id={`tab-${t}-tab`}
              className="appearance-none p-2 bg-slate-100 hover:bg-slate-200 whitespace-nowrap flex-shrink-0 hover:cursor-pointer"
            >
              {t}
            </button>
          ) : (
            <button
              key={i}
              id={`tab-${t}-tab`}
              className="appearance-none p-2 hover:bg-slate-200 whitespace-nowrap flex-shrink-0 hover:cursor-pointer"
              onClick={() => {
                const prevTab = activeTab;
                setActiveTab(t);
                onTabChanged(t, prevTab);
              }}
            >
              {t}
            </button>
          )
        ))}
      </div>
    </div>
  );
}