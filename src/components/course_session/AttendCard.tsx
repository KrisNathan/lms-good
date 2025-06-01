import CardSideButton from "../buttons/CardSideButton";
import { useState } from "react";
interface Props {

}

export default function AttendCard() {
  const [attended, setAttended] = useState(false);

  return (
    <div className="flex flex-row border border-slate-200 rounded-2xl">
      <div className="p-5">
        <div>Attendance</div>
      </div>
      <CardSideButton
        text={attended ? "Attended" : "Attend"}
        icon=""
        className={`ml-auto transition-colors ${
          attended ? "bg-green-300" : "bg-red-200 hover:bg-red-300"
        }`}
        onClick={() => setAttended(true)}
      />
    </div>
  );
}