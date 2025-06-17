import type React from "react";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'transparent';

interface Props {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

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

export default function Button({ icon, text, variant = 'primary', className = '', onClick = (e) => { } }: Props) {
  return <button className={`flex flex-row w-fit gap-1 rounded-full py-2 px-6 hover:cursor-pointer font-medium ${colorVariantMatcher(variant)} ${className}`}
    onClick={onClick}>
    {icon}
    <div>{text}</div>
  </button>
}