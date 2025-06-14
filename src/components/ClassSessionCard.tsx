// ClassSessionCard.tsx
import React, { useState } from "react";

interface ClassSessionCardProps {
  title: string;
  sessionNumber: number;
  classCode: string;
  timeSlot: string;
  isOngoing?: boolean;
}

const ClassSessionCard: React.FC<ClassSessionCardProps> = ({
  title,
  sessionNumber,
  classCode,
  timeSlot,
  isOngoing = false,
}) => {
  const [attended, setAttended] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAttend = () => {
    if (attended) {
      setAttended(false);
      setShowError(false);
      return;
    }
    const isSuccess = Math.random() < 0.5;
    if (isSuccess) {
      setAttended(true);
      setShowError(false);
    } else {
      setAttended(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="font-sans bg-white rounded-2xl p-5 border-solid border-1 border-slate-200 max-w-[500px] flex-1 relative">
      {isOngoing && (
        <div className="text-red-600 font-bold mb-1 text-base">ONGOING NOW</div>
      )}

      <h2 className="text-2xl font-bold mt-1 mb-4 text-[#212121]">{title}</h2>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-[#888888] text-base w-6 h-6 flex items-center justify-center">📝</span>
          <span>Session {sessionNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-[#888888] text-base w-6 h-6 flex items-center justify-center">📍</span>
          <span>{classCode}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-[#888888] text-base w-6 h-6 flex items-center justify-center">🕒</span>
          <span>{timeSlot}</span>
        </div>
      </div>

      {isOngoing && (
        <>
          <button
            type="button"
            className={`w-full bg-red-100 py-3 px-4 rounded-3xl flex items-center justify-center gap-2 font-medium mt-3 transition-all duration-200 ease-in-out cursor-pointer border-none hover:bg-red-200 ${
              attended
                ? "bg-green-100 hover:bg-green-200"
                : ""
            }`}
            onClick={handleAttend}
          >
            <span className="font-bold">⊙</span>
            <span>
              {attended ? "Attended Ongoing Class" : "Attend Ongoing Class"}
            </span>
          </button>
          {showError && (
            <div
              className="bg-red-100 text-red-600 p-3 rounded-xl mt-3 border border-red-200 text-center font-medium text-xs animate-fadeIn"
            >
              You must be in the classroom.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassSessionCard;
