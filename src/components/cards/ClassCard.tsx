interface Props {
  courseCode: string;
  courseName: string;
  instructor: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ClassCard({ courseCode, courseName, instructor, onClick = () => {} }: Props) {
  return (
    <button 
      className="w-full h-56 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 text-left overflow-hidden focus:outline-none flex flex-col"
      onClick={onClick}
    >
      {/* Code Header with gradient accent */}
      <div className="px-5 py-3 text-sm font-semibold text-blue-600 bg-blue-50 border-b border-slate-200 flex-shrink-0">
        {courseCode}
      </div>

      {/* Main Content */}
      <div className="p-5 flex flex-col flex-1 min-h-0">
        <h2 className="font-bold text-xl text-gray-900 leading-snug break-words line-clamp-3 mb-3">
          {courseName}
        </h2>
        
        <p className="text-sm text-gray-500 mt-auto">{instructor}</p>
      </div>
    </button>
  );
}