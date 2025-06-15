import { useRef, useEffect } from "react";

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

  // Handle horizontal scrolling with the mouse wheel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center mb-6">
      <div
        ref={scrollContainerRef}
        className="flex flex-row bg-white rounded-full shadow-md border border-slate-200 overflow-x-auto max-w-full p-1 scrollbar-thin scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = tab.label === activeTab;
          return (
            <button
              key={i}
              className={`appearance-none px-6 py-3 whitespace-nowrap flex-shrink-0 font-medium text-base transition-colors rounded-full ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-slate-100 text-gray-700"
              }`}
              onClick={() => onTabChange(tab.label)}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-2 text-sm font-semibold ${isActive ? "text-white" : "text-gray-500"}`}>
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
