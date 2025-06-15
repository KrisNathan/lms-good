import React from "react";

interface GradeItem {
  name: string;
  weight: number;
  score: string | number;
  status?: string;
}

export default function GradebookCard() {
  const title = "Final Score";
  const status = "23 May 2025, 17:59 GMT+7";
  const totalWeight = 100;
  const totalScore = "N/A";
  const totalGrade = "N/A";

  const gradeItems: GradeItem[] = [
    { name: "THEORY: ASSIGNMENT", weight: 20, score: "95", status: "Scored on 23 May 2025, 17:59 GMT+7" },
    { name: "THEORY: MID EXAM", weight: 30, score: "N/A", status: "Currently being checked by lecturer" },
    { name: "THEORY: FINAL PROJECT", weight: 50, score: "N/A", status: "This assessment hasn't started" }
  ];

  return (
    <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-5">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 font-medium">Last Updated: {status}</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Summary label="Weight" value={`${totalWeight}%`} />
        <Summary label="Score" value={totalScore} />
        <Summary label="Grade" value={totalGrade} />
      </div>

      {/* Grade Items */}
      <div className="flex flex-col gap-4">
        {gradeItems.map((item, index) => (
          <div key={index} className="flex items-start justify-between bg-slate-50 rounded-xl p-4 border border-slate-200">
            {/* Left: Name & status */}
            <div className="flex flex-col gap-1 flex-1 pr-4">
              <div className="font-medium text-gray-800">{item.name}</div>
              {item.status && (
                <div className="text-sm text-gray-500">{item.status}</div>
              )}
            </div>

            {/* Right: Weight + Score */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                {item.weight}%
              </div>
              <div className="text-lg font-semibold text-gray-900">{item.score}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}


// Bimay Version
// interface GradeItem {
//   name: string;
//   weight: number;
//   score: string | number;
//   status?: string;
// }

// export default function Gradebook() {
//   const title = "Final Score";
//   const status = "23 May 2025, 17:59 GMT+7";
//   const totalWeight = 100;
//   const totalScore = "N/A";
//   const totalGrade = "N/A";

//   const gradeItems: GradeItem[] = [
//     {
//       name: "THEORY: ASSIGNMENT",
//       weight: 20,
//       score: "95",
//       status: "Scored on 23 May 2025, 17:59 GMT+7"
//     },
//     {
//       name: "THEORY: MID EXAM",
//       weight: 30,
//       score: "N/A",
//       status: "Currently being checked by lecturer"
//     },
//     {
//       name: "THEORY: FINAL PROJECT",
//       weight: 50,
//       score: "N/A",
//       status: "This assessment hasn't started"
//     }
//   ];

//   return (
//     <div className="h-full w-full p-4">
//       <div className="h-full w-full font-sans rounded-lg overflow-hidden shadow-lg">
//         <div className="flex justify-between items-center p-6 bg-blue-500 text-white">
//           <div>
//             <h2 className="text-2xl font-semibold m-0">{title}</h2>
//             <p className="text-sm opacity-80 mt-1 mb-0">
//               Last Updated: {status}
//             </p>
//           </div>
//           <div className="flex gap-8">
//             <div className="flex flex-col items-center text-center">
//               <span className="text-sm opacity-90">Weight</span>
//               <span className="text-2xl font-semibold">{totalWeight}%</span>
//             </div>
//             <div className="flex flex-col items-center text-center">
//               <span className="text-sm opacity-90">Score</span>
//               <span className="text-2xl font-semibold">{totalScore}</span>
//             </div>
//             <div className="flex flex-col items-center text-center">
//               <span className="text-sm opacity-90">Grade</span>
//               <span className="text-2xl font-semibold">{totalGrade}</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white">
//           {gradeItems.map((item, index) => (
//             <div
//               key={index}
//               className={`grid grid-cols-[1fr_80px_80px] gap-4 p-6 ${
//                 index !== gradeItems.length - 1 ? 'border-b border-gray-200' : ''
//               }`}
//             >
//               <div className="flex flex-col">
//                 <div className="font-medium text-gray-800">{item.name}</div>
//                 {item.status && (
//                   <div className="text-sm text-gray-500 mt-1">
//                     Status: {item.status}
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-center items-center">
//                 <span className="font-medium bg-gray-100 rounded-full px-3 py-1 text-center w-12">
//                   {item.weight}%
//                 </span>
//               </div>
//               <div className="flex justify-center items-center">
//                 <span className="font-semibold text-xl">{item.score}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }