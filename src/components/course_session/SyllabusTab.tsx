const syllabuses: string[] = [
  "LO1: (C2) Comprehension : describe the concept of interaction design",
  "LO2: (C3) Application : use guidelines, principles, models, and framework related with interaction design",
  "LO3: (C6) Evaluation : choose the data gathering technique from user to develop successful interaction design",
  "LO4: (C3) Application : design the user requirements with interaction styles",
  "LO5: (C6) Evaluation : evaluate the user interfaces of interactive software"
];

export default function SyllabusTab() {
  return <>
    <div>This course comprises the human factors in interactive software, theories, principles and guidance in interface development, interface components, interface styles, disciplines associated with design and evaluation of user interface in order to support the usability. This course gives students the ability to design and evaluate the user interface.</div>
    <div className="flex flex-col gap-2 rounded-2xl border-solid border-1 border-slate-200 p-5">
      <div>
        <div className="font-semibold">Learning Outcomes</div>
        <div>
          On successful completion of this course, student will be able to:
        </div>
      </div>
      <ol className="flex flex-col gap-1">
        {syllabuses.map((syl) => (
          <li>
            {syl}
          </li>
        ))}
      </ol>

    </div>
  </>
}