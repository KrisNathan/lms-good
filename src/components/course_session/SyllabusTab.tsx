const syllabuses: string[] = [
  "LO1: (C2) Comprehension : describe the concept of interaction design",
  "LO2: (C3) Application : use guidelines, principles, models, and framework related with interaction design",
  "LO3: (C6) Evaluation : choose the data gathering technique from user to develop successful interaction design",
  "LO4: (C3) Application : design the user requirements with interaction styles",
  "LO5: (C6) Evaluation : evaluate the user interfaces of interactive software"
];

export default function SyllabusTab() {
  return (
    <div className="flex flex-col gap-6">

      {/* Course Description */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Course Description</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          This course comprises the human factors in interactive software, theories, principles and guidance in interface development, interface components, interface styles, disciplines associated with design and evaluation of user interface in order to support the usability. This course gives students the ability to design and evaluate the user interface.
        </p>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Learning Outcomes</h2>
        <p className="text-gray-700 text-sm mb-4">On successful completion of this course, students will be able to:</p>

        <ol className="flex flex-col gap-3">
          {syllabuses.map((syl, index) => (
            <li key={index} className="bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-100 text-sm">
              {syl}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
