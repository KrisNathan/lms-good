import React from 'react';

interface GroupMember {
  name: string;
  nim: string;
  profilePhoto?: string;
}

interface GroupCardProps {
  name: string;
  id: string;
  members: GroupMember[];
}

export default function GroupCard({ name, id, members }: GroupCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100 min-h-96">
      <div className="flex flex-col h-full">
        {/* Group Header */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-base text-gray-500 font-medium">{id}</p>
        </div>

        {/* Members Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Members
            </h4>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              {members.length}
            </span>
          </div>

          {members.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
              {members.map((member, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <img 
                    src={member.profilePhoto || "/user-icon.png"} 
                    alt={`${member.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-base font-medium text-gray-900 block truncate">
                      {member.name}
                    </span>
                    <span className="text-sm text-gray-500 font-mono block">
                      {member.nim}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-base">😶 No members yet</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
