import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, CheckCircle, Circle } from "lucide-react";
import InlineNotif from "./notif/InlineNotif";

interface ClassSessionCardProps {
  title: string;
  sessionNumber: number;
  totalSessions: number;
  classCode: string;
  classStartTime: string; // format: "HH:mm"
  classEndTime: string;   // format: "HH:mm"
  date: string;
  duration: string;
  instructor: string;
  topic: string;
  location: string;
  classroom: string;
  isOngoing?: boolean; // you control this manually
}

const ClassSessionCard: React.FC<ClassSessionCardProps> = ({
  title,
  sessionNumber,
  totalSessions,
  classCode,
  classStartTime,
  classEndTime,
  date,
  duration,
  instructor,
  topic,
  location,
  classroom,
  isOngoing = false,
}) => {
  const [isAttended, setIsAttended] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!isOngoing) {
      setTimeRemaining("");
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [endHour, endMinute] = classEndTime.split(":").map(Number);
      const endTime = new Date(today);
      endTime.setHours(endHour, endMinute, 0, 0);

      const diff = endTime.getTime() - now.getTime();

      if (diff > 0) {
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

        if (hoursLeft > 0) {
          setTimeRemaining(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
        } else if (minutesLeft > 0) {
          setTimeRemaining(`${minutesLeft}m ${secondsLeft}s`);
        } else {
          setTimeRemaining(`${secondsLeft}s`);
        }
      } else {
        setTimeRemaining("Class ended");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isOngoing, classEndTime]);

  const handleAttendanceClick = () => {
    setIsAttended((prev) => !prev);
  };

  return (
    <div className="font-sans bg-white rounded-2xl p-6 border border-slate-200 max-w-2xl w-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        {isOngoing ? (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-bold text-sm">ONGOING NOW</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-bold text-sm">UPCOMING CLASS</span>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2 text-gray-900">{classCode} - {title}</h2>
      <p className="text-gray-600 mb-4">{topic}</p>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Session {sessionNumber} of {totalSessions}</span>
          <span>{Math.round((sessionNumber / totalSessions) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(sessionNumber / totalSessions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar size={18} className="text-blue-500" />
          <div>
            <div className="font-medium text-gray-900">{date}</div>
            <div className="text-sm">{classStartTime} - {classEndTime}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Clock size={18} className="text-green-500" />
          <div>
            <div className="font-medium text-gray-900">{duration}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <MapPin size={18} className="text-orange-500" />
          <div>
            <div className="font-medium text-gray-900">{location}</div>
            <div className="text-sm">{classroom}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Users size={18} className="text-purple-500" />
          <div>
            <div className="font-medium text-gray-900">{instructor}</div>
          </div>
        </div>
      </div>

      {isOngoing && (
        <>
          <div className="mb-3 p-2 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700 font-medium">Time remaining for attendance:</span>
              <span className="text-lg font-bold text-orange-600">{timeRemaining}</span>
            </div>
          </div>

          <div
            onClick={handleAttendanceClick}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer select-none ${isAttended ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
          >
            {isAttended ? (
              <>
                <CheckCircle size={20} /> Attendance Marked
              </>
            ) : (
              <>
                <Circle size={20} /> Mark Attendance
              </>
            )}
          </div>

          {isAttended && (
            <InlineNotif
              variant="success"
              message="Your attendance has been recorded for this session." 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ClassSessionCard;
