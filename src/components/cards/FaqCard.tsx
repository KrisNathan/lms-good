import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQCardProps {
  title: string;
  details: string;
}

export default function FAQCard({ title, details }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={toggleOpen}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-black pr-4">{title}</h3>
        <div className="flex-shrink-0">
          <ChevronDown className={`w-5 h-5 text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <div className={`px-6  border-slate-200 bg-white transition-all duration-200 ${isOpen ? "h-fit py-4 border-t" : "max-h-0 overflow-hidden"}`}>
        <p className="text-black leading-relaxed">{details}</p>
      </div>
    </div>
  );
}
