import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { ButtonVariant } from "./Button";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface Props {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  variant?: ButtonVariant;
  items: DropdownItem[];
  disabled?: boolean;
  maxHeight?: string;
  searchable?: boolean;
  placeholder?: string;
}

const colorVariantMatcher = (variant: ButtonVariant) => {
  switch(variant) {
    case 'primary':
      return 'bg-blue-500 text-white hover:bg-blue-600';
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600';
    default:
      return 'bg-blue-500 text-white hover:bg-blue-600';
  }
}

export default function DropdownButton({ 
  icon, 
  text, 
  variant = 'primary', 
  className = '', 
  items,
  disabled = false,
  maxHeight = "300px",
  searchable = false,
  placeholder = "Search..."
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search term
  const filteredItems = searchable 
    ? items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  // Check if current item is selected
  const isItemSelected = (item: DropdownItem) => {
    return item.label === text || text.includes(item.label);
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button 
        className={`flex flex-row items-center w-full gap-2 rounded-xl py-3 px-4 font-medium transition-all duration-200 border ${
          disabled 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
            : `hover:cursor-pointer ${colorVariantMatcher(variant)} border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`
        } ${className}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        {icon}
        <div className="flex-1 text-left truncate">{text}</div>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Search Input */}
          {searchable && (
            <div className="p-3 border-b border-gray-100">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          )}
          
          {/* Items Container */}
          <div 
            className="overflow-y-auto"
            style={{ maxHeight }}
          >
            {filteredItems.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {searchable ? 'No results found' : 'No items available'}
              </div>
            ) : (
              <div className="py-1">
                {filteredItems.map((item, index) => {
                  const isSelected = isItemSelected(item);
                  return (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors cursor-pointer group relative ${
                        item.disabled
                          ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                          : isSelected
                          ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => handleItemClick(item)}
                      disabled={item.disabled}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}