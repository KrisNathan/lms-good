interface GradeItem {
  name: string;
  weight: number;
  score: string | number;
  status?: string;
}

export default function Gradebook() {
  const title = "Final Score";
  const status = "23 May 2025, 17:59 GMT+7";
  const totalWeight = 100;
  const totalScore = "N/A";
  const totalGrade = "N/A";

  const gradeItems: GradeItem[] = [
    {
      name: "THEORY: ASSIGNMENT",
      weight: 20,
      score: "95",
      status: "Scored on 23 May 2025, 17:59 GMT+7"
    },
    {
      name: "THEORY: MID EXAM",
      weight: 30,
      score: "N/A",
      status: "Currently being checked by lecturer"
    },
    {
      name: "THEORY: FINAL PROJECT",
      weight: 50,
      score: "N/A",
      status: "This assessment hasn't started"
    }
  ];

  return (
    <div className="h-full w-full p-4">
      <div className="h-full w-full font-sans rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-center p-6 bg-blue-500 text-white">
          <div>
            <h2 className="text-2xl font-semibold m-0">{title}</h2>
            <p className="text-sm opacity-80 mt-1 mb-0">
              Last Updated: {status}
            </p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center text-center">
              <span className="text-sm opacity-90">Weight</span>
              <span className="text-2xl font-semibold">{totalWeight}%</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-sm opacity-90">Score</span>
              <span className="text-2xl font-semibold">{totalScore}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-sm opacity-90">Grade</span>
              <span className="text-2xl font-semibold">{totalGrade}</span>
            </div>
          </div>
        </div>

        <div className="bg-white">
          {gradeItems.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1fr_80px_80px] gap-4 p-6 ${
                index !== gradeItems.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="flex flex-col">
                <div className="font-medium text-gray-800">{item.name}</div>
                {item.status && (
                  <div className="text-sm text-gray-500 mt-1">
                    Status: {item.status}
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <span className="font-medium bg-gray-100 rounded-full px-3 py-1 text-center w-12">
                  {item.weight}%
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="font-semibold text-xl">{item.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}