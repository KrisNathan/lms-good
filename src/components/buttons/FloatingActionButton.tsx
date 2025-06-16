import type React from "react";
import type { ButtonVariant } from "./Button";

interface Props {
  icon: React.ReactNode;
  text?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'custom';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const colorVariantMatcher = (variant: ButtonVariant) => {
  switch(variant) {
    case 'primary':
      return 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl';
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-lg hover:shadow-xl';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl';
    default:
      return 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl';
  }
}

const sizeVariantMatcher = (size: 'sm' | 'md' | 'lg', hasText: boolean) => {
  if (hasText) {
    // Extended FAB with text
    switch(size) {
      case 'sm':
        return 'h-10 px-4 text-sm';
      case 'md':
        return 'h-12 px-5 text-base';
      case 'lg':
        return 'h-14 px-6 text-lg';
      default:
        return 'h-12 px-5 text-base';
    }
  } else {
    // Circular FAB
    switch(size) {
      case 'sm':
        return 'w-10 h-10';
      case 'md':
        return 'w-12 h-12';
      case 'lg':
        return 'w-14 h-14';
      default:
        return 'w-12 h-12';
    }
  }
}

const positionVariantMatcher = (position: Props['position']) => {
  switch(position) {
    case 'bottom-right':
      return 'fixed bottom-6 right-6 md:bottom-6 bottom-20';
    case 'bottom-left':
      return 'fixed bottom-6 left-6 md:bottom-6 bottom-20';
    case 'top-right':
      return 'fixed top-6 right-6';
    case 'top-left':
      return 'fixed top-6 left-6';
    case 'custom':
      return '';
    default:
      return 'fixed bottom-6 right-6 md:bottom-6 bottom-20';
  }
}

export default function FloatingActionButton({ 
  icon, 
  text, 
  variant = 'primary', 
  size = 'md',
  position = 'bottom-right',
  className = '', 
  onClick = () => {} 
}: Props) {
  const hasText = Boolean(text);
  const isCircular = !hasText;

  return (
    <button 
      className={`
        flex items-center justify-center gap-2 
        ${isCircular ? 'rounded-full' : 'rounded-full'}
        font-medium transition-all duration-200 hover:scale-105 active:scale-95
        ${colorVariantMatcher(variant)}
        ${sizeVariantMatcher(size, hasText)}
        ${positionVariantMatcher(position)}
        z-50
        ${className}
      `}
      onClick={onClick}
      title={text || undefined}
    >
      {icon}
      {hasText && <span className="whitespace-nowrap">{text}</span>}
    </button>
  );
}
