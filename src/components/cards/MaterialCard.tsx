import { FileText, FileImage, FileVideo, FileArchive, BookOpen, File } from "lucide-react";
import React from "react";

interface MaterialCardProps {
  type: "pdf" | "ppt" | "video" | "image" | "doc" | "book" | "other";
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-7 h-7 text-red-500" />;
    case "ppt":
      return <FileArchive className="w-7 h-7 text-orange-500" />;
    case "video":
      return <FileVideo className="w-7 h-7 text-purple-500" />;
    case "image":
      return <FileImage className="w-7 h-7 text-green-500" />;
    case "book":
      return <BookOpen className="w-7 h-7 text-blue-500" />;
    default:
      return <File className="w-7 h-7 text-gray-400" />;
  }
};

const MaterialCard: React.FC<MaterialCardProps> = ({ type, title, subtitle, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-md transition p-5 flex items-center gap-4 cursor-pointer"
    >
      <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full">
        {getIcon(type)}
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 break-words">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
