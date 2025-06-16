import { useRef, useEffect, useState } from "react";

interface Tab {
  label: string;
  count?: number;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function HorizontalTab({ tabs, activeTab, onTabChange }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check scroll position and update arrow visibility
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setIsScrollable(hasOverflow);
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  // Handle horizontal scrolling with the mouse wheel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
        updateScrollButtons();
      }
    };

    const handleScroll = () => {
      updateScrollButtons();
    };    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      scrollContainer.addEventListener("scroll", handleScroll);
      // Initial check
      updateScrollButtons();
      
      // Also check on resize to handle responsive changes
      const resizeObserver = new ResizeObserver(updateScrollButtons);
      resizeObserver.observe(scrollContainer);
      
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("scroll", handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };  return (
    <div className="w-full relative">      {/* Left scroll button */}
      {canScrollLeft && (        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 group"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>          {/* Tooltip */}
          <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
            Scroll left (or use mouse wheel)
          </div>
        </button>
      )}

      {/* Right scroll button */}
      {canScrollRight && (        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 group"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>          {/* Tooltip */}
          <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
            Scroll right (or use mouse wheel)
          </div>
        </button>
      )}{/* Left fade indicator - only show if scrollable and can scroll left */}
      {isScrollable && canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 rounded-l-full"></div>
      )}
      
      {/* Right fade indicator - only show if scrollable and can scroll right */}
      {isScrollable && canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 rounded-r-full"></div>
      )}
      
      <div
        ref={scrollContainerRef}
        className="flex flex-row bg-white rounded-full shadow-md border border-slate-200 overflow-x-auto p-1 scrollbar-thin relative"
        style={{
          scrollbarWidth: "none",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >
      {tabs.map((tab, i) => {
        const isActive = tab.label === activeTab;
        return (
          <button
            key={i}
            className={`appearance-none px-6 py-3 whitespace-nowrap flex-shrink-0 font-medium text-base transition-colors rounded-full ${isActive ? "bg-blue-500 text-white" : "hover:bg-slate-100 text-gray-700"
              }`}
            onClick={() => onTabChange(tab.label)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-500"}`}>
                ({tab.count})
              </span>
            )}
          </button>        );
      })}
    </div>
    </div>
  );
}
