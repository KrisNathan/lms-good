import type React from "react";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import type { ButtonVariant } from "./Button";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface Props {
  className?: string;
  variant?: ButtonVariant;
  items: DropdownItem[];
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorVariantMatcher = (variant: ButtonVariant) => {
  switch(variant) {
    case 'primary':
      return 'bg-blue-500 text-white hover:bg-blue-600';
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600';
    case 'transparent':
      return 'bg-transparent text-gray-600 hover:bg-gray-100';
    default:
      return 'bg-blue-500 text-white hover:bg-blue-600';
  }
}

const sizeVariantMatcher = (size: 'sm' | 'md' | 'lg') => {
  switch(size) {
    case 'sm':
      return 'p-1.5';
    case 'md':
      return 'p-2';
    case 'lg':
      return 'p-3';
    default:
      return 'p-2';
  }
}

const iconSizeVariantMatcher = (size: 'sm' | 'md' | 'lg') => {
  switch(size) {
    case 'sm':
      return 16;
    case 'md':
      return 20;
    case 'lg':
      return 24;
    default:
      return 20;
  }
}

export default function EllipsisButton({ 
  variant = 'secondary', 
  className = '', 
  items,
  disabled = false,
  size = 'md'
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button 
        className={`flex items-center justify-center rounded-full font-medium transition-colors ${
          disabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : `hover:cursor-pointer ${colorVariantMatcher(variant)}`
        } ${sizeVariantMatcher(size)} ${className}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-label="More options"
      >
        <MoreHorizontal size={iconSizeVariantMatcher(size)} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 min-w-48">
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors cursor-pointer ${
                  item.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
