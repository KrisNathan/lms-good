interface Props {
  courseCode: string;
  courseName: string;
  instructor: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ClassCard({ courseCode, courseName, instructor, onClick = () => {} }: Props) {
  return (
    <button 
      className="w-full rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left overflow-hidden min-h-56"
      onClick={onClick}
    >
      {/* Header Code */}
      <div className="px-5 py-4 text-sm font-medium text-gray-500 bg-slate-50 border-b border-slate-200">
        {courseCode}
      </div>

      {/* Main Content */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-xl text-gray-900">{courseName}</h2>
          <p className="text-gray-600">{instructor}</p>
        </div>
      </div>
    </button>
  );
}
