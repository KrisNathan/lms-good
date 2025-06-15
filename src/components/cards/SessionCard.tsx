import { MapPin, Clock, Layers, Monitor, Calendar, Users } from 'lucide-react';
import React from 'react';

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
      className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer relative"
      onClick={onClick}
    >
      {/* Class ID and Badge in one row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-base font-medium text-gray-700">{classId}</span>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          Onsite
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 break-words mb-4">
        {title}
      </h3>

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

      {/* Bottom-right Category Badge */}
      <div className="absolute bottom-4 right-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap">
          {category}
        </span>
      </div>
    </div>
  );
};

export default SessionCard;
