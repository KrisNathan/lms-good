import CardSideButton from "../buttons/CardSideButton";
import { useState } from "react";

interface Props {

}

export default function AttendCard() {
  const [attended, setAttended] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAttendClick = () => {
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
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row border border-slate-200 rounded-2xl">
        <div className="p-5 flex-1">
          <div className="font-semibold mb-2">Attendance</div>
          <div className="text-sm text-gray-600">
            {attended 
              ? "20 minutes and 11 seconds until class ends"
              : "20 minutes and 11 seconds until class starts and attendance is available"
            }
          </div>
        </div>
        <CardSideButton
          text={attended ? "Attended" : "Attend"}
          icon=""
          className={`ml-auto transition-colors ${
            attended ? "bg-green-300" : "bg-red-200 hover:bg-red-300"
          }`}
          onClick={handleAttendClick}
        />
      </div>
      {showError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center font-medium animate-fade-in">
          You are not in the range for attendance!
        </div>
      )}
    </div>
  );
}