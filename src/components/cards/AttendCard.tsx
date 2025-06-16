import { CheckCircle, Clock } from "lucide-react";
import CardSideButton from "../buttons/CardSideButton";
import { useState } from "react";

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
    <div className="flex flex-col gap-3">
      <div className="border border-slate-200 rounded-2xl bg-white shadow-sm transition p-6 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
            {attended ? (
              <CheckCircle className="w-7 h-7 text-green-500" />
            ) : (
              <Clock className="w-7 h-7 text-blue-500" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Attendance</h3>
            <p className={`text-sm ${attended ? "text-green-600" : "text-gray-600"}`}>
              {attended ? "Recorded" : "Available"}
            </p>
          </div>
        </div>

        {/* Right button */}
        <CardSideButton
          text={attended ? "Attended" : "Attend"}
          icon=""
          className={`px-6 py-2 rounded-full font-medium text-white transition-all ${
            attended ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleAttendClick}
        />
      </div>

      {showError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-center rounded-lg font-medium transition-all">
          You are not in the range for attendance!
        </div>
      )}
    </div>
  );
}
