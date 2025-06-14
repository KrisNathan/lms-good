import React from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface StudentStatCardProps {
  title: string;
  status: "complete" | "warning" | "critical";
  note?: string;
}

const statusConfig = {
  complete: { icon: <CheckCircle size={56} className="text-green-500" /> },
  warning: { icon: <AlertTriangle size={56} className="text-yellow-500" /> },
  critical: { icon: <XCircle size={56} className="text-red-500" /> },
};

const StudentStatCard: React.FC<StudentStatCardProps> = ({ title, status, note }) => {
  const config = statusConfig[status];

  return (
    <div className="flex flex-col items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm w-48 h-52 hover:shadow-md transition-shadow p-4">
      <div className="text-base font-semibold text-gray-900 text-center">{title}</div>

      <div className="flex flex-col items-center justify-center flex-grow">
        {config.icon}
      </div>

      {note && (
        <div className="text-xs text-gray-400 mt-1 text-center">{note}</div>
      )}
    </div>
  );
};

export default StudentStatCard;
