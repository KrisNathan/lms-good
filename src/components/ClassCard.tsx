interface Props {
  courseCode: string;
  courseName: string;
  instructor: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ClassCard({ courseCode, courseName, instructor, buttonText = 'View Class', onClick = () => { } }: Props) {
  return (
    <button className="rounded-2xl border-slate-200 border-solid border-1 w-full overflow-hidden hover:border-orange-100 hover:cursor-pointer hover:animate-pulse text-left" onClick={onClick}>
      <div className="p-5">
        {courseCode}
      </div>
      <div className="bg-orange-100 p-5 flex flex-col gap-5">
        <div>
          <h2 className="font-bold text-xl">{courseName}</h2>
          <p className="">{instructor}</p>
        </div>

        <div className="rounded-3xl bg-white w-full flex flex-row py-3 px-5">
          <div className="text-left">
            {buttonText}
          </div>
          <span className="ml-auto">▶</span>
        </div>
      </div>
    </button>
  )
}