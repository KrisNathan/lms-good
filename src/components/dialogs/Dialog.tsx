import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

export default function Dialog({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "lg",
  showCloseButton = true 
}: DialogProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-[400px] h-[300px]",
    md: "w-[600px] h-[500px]",
    lg: "w-[800px] h-[600px]",
    xl: "w-[90vw] h-[90vh]",
    full: "w-screen h-screen"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white rounded-xl shadow-xl flex flex-col ${sizeClasses[size]}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded"
              title="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}