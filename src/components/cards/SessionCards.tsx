import React from 'react';

interface SessionCardProps {
  title: string;
  format: string;
  session: string;
  room: string;
  time: string;
  category: string;
}

const SessionCard: React.FC<SessionCardProps> = ({
  title,
  format,
  session,
  room,
  time,
  category,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{title}</h3>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          Onsite
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="w-4 h-4" src="f2f-icon.png"/>
            <span className="text-gray-600 text-sm ml-2">{format}</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">{category}</span>
        </div>

        <div className="flex items-center">
          <img className="w-4 h-4" src="session-icon.png"/>
          <span className="text-gray-600 text-sm ml-2">{session}</span>
        </div>

        <div className="flex items-center">
          <img className="w-4 h-4" src="location-icon.png"/>
          <span className="text-gray-600 text-sm ml-2">{room}</span>
        </div>

        <div className="flex items-center">
          <img className="w-4 h-4" src="clock-icon.png"/>
          <span className="text-gray-600 text-sm ml-2">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;