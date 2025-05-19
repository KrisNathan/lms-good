interface Props {
  courseCode: string;
  courseName: string;
  instructor: string;
  buttonText?: string;
}

export default function ClassCard({ courseCode, courseName, instructor, buttonText = 'View Class' }: Props) {
  return (
    <div className="rounded-2xl border-slate-200 border-solid border-1 w-full overflow-hidden">
      <div className="p-5">
        {courseCode}
      </div>
      <div className="bg-orange-100 p-5 flex flex-col gap-5">
        <div>
          <h2 className="font-bold text-xl">{courseName}</h2>
          <p className="">{instructor}</p>
        </div>

        <button className="rounded-2xl bg-white w-full flex flex-row py-1 px-5">
          <div className="text-left">
            {buttonText}
          </div>
          <span className="ml-auto">▶</span>
        </button>
      </div>
    </div>
  )
}