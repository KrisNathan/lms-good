import { MapPin, Clock, Layers, Monitor, Calendar, Users } from "lucide-react";
import React from "react";

interface SessionCardProps {
  classId: string;
  title: string;
  format: string;
  session: string;
  room: string;
  time: string;
  category: string;
  date?: string;
  instructor?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SessionCard: React.FC<SessionCardProps> = ({
  classId,
  title,
  format,
  session,
  room,
  time,
  category,
  date,
  instructor,
  onClick = () => {},
}) => {
  return (
    <div
      className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition cursor-pointer"
      onClick={onClick}
    >
      {/* Onsite Badge (top-right) */}
      <div className="absolute top-4 right-4">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          Onsite
        </span>
      </div>

      {/* Category + Class ID Badge (top-left) */}
      <div className="absolute top-4 left-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap">
          {category} - {classId}
        </span>
      </div>

      {/* Title Section */}
      <div className="mt-8 mb-5">
        <h3 className="text-xl font-bold text-gray-900 break-words">{title}</h3>
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-sm text-gray-700">
        {date && (
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            <span>{date}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Monitor size={18} className="text-blue-500" />
          <span>{format}</span>
        </div>

        <div className="flex items-center gap-2">
          <Layers size={18} className="text-blue-500" />
          <span>{session}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-orange-500" />
          <span>{room}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} className="text-green-500" />
          <span>{time}</span>
        </div>

        {instructor && (
          <div className="flex items-center gap-2">
            <Users size={18} className="text-purple-500" />
            <span>{instructor}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
