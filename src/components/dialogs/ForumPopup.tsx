import { useState, useRef } from "react";

interface ForumPopupProps {
  name: string;
  id: string;
  class?: string;
  status: string;
  children: React.ReactNode;
}

export default function ForumPopup({ 
  name, 
  id,
  status, 
  class: userClass = "Not specified",
  children 
}: ForumPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      setPosition({
        top: rect.bottom + scrollTop + 8,
        left: rect.left + scrollLeft
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-3 min-w-48"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">ID:</span>
              <span className="font-mono text-sm text-gray-700">{id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Class:</span>
              <span className="text-sm text-gray-700">{userClass}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm text-gray-700">{status}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}