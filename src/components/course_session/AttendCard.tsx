import CardSideButton from "../buttons/CardSideButton";

interface Props {

}

export default function AttendCard() {
  return (
    <div className="flex flex-row border-solid border-1 border-slate-200 rounded-2xl">
      <div className="p-5">
        <div>Attendance</div>
      </div>
      <CardSideButton text="Attend" icon="" className="bg-red-200 hover:bg-red-300 ml-auto" />
    </div>
  );
}