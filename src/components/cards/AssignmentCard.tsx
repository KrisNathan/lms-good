import React, { useState } from "react";
import { FileCheck, FileClock, FileWarning } from "lucide-react";
import AssignmentDialog from "../dialogs/AssignmentDialog";

interface AssignmentCardProps {
  title: string;
  dueDate: string;
  status: "submitted" | "pending" | "late";
  onClick?: () => void;
  // Extended props for dialog
  description?: string;
  maxPoints?: number;
  submittedFile?: string;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  onSubmit?: (file: File) => void;
}

const getStatus = (status: string) => {
  switch (status) {
    case "submitted":
      return { icon: <FileCheck className="w-7 h-7 text-green-500" />, text: "Submitted", color: "text-green-600" };
    case "pending":
      return { icon: <FileClock className="w-7 h-7 text-yellow-500" />, text: "Pending", color: "text-yellow-600" };
    case "late":
      return { icon: <FileWarning className="w-7 h-7 text-red-500" />, text: "Late", color: "text-red-600" };
    default:
      return { icon: <FileClock className="w-7 h-7 text-gray-400" />, text: "Unknown", color: "text-gray-600" };
  }
};

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  title, 
  dueDate, 
  status, 
  onClick,
  description = "No description available.",
  maxPoints = 100,
  submittedFile,
  submittedAt,
  grade,
  feedback,
  onSubmit
}) => {
  const { icon, text, color } = getStatus(status);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const assignmentData = {
    title,
    description,
    dueDate,
    status,
    maxPoints,
    submittedFile,
    submittedAt,
    grade,
    feedback
  };
  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-md transition p-5 flex items-center gap-4 cursor-pointer"
      >
        <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full">
          {icon}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-900 break-words">{title}</h3>
          <p className="text-sm text-gray-500">Due: {dueDate}</p>
        </div>

        <div className={`font-medium text-sm ${color}`}>
          {text}
        </div>
      </div>

      <AssignmentDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        assignment={assignmentData}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default AssignmentCard;
