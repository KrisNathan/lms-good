import Calendar from "../../components/Calendar";
import SessionCard from "../../components/cards/SessionCard";

export default function CalendarPage() {
  const sessions = [
    {
      classId: "CLS-2201",
      title: "Scientific Computing",
      format: "F2F",
      session: "Session 10",
      room: "A0507",
      time: "07:20-09:00",
      category: "LEC",
    },
    {
      classId: "CLS-2202",
      title: "Data Structures",
      format: "F2F",
      session: "Session 10",
      room: "B0501",
      time: "09:20-11:00",
      category: "LEC",
    },
    {
      classId: "CLS-2203",
      title: "Human and Computer Interaction",
      format: "F2F",
      session: "Session 10",
      room: "A0507",
      time: "11:20-13:00",
      category: "LEC",
    },
    {
      classId: "CLS-2204",
      title: "Human and Computer Interaction",
      format: "F2F",
      session: "Session 10",
      room: "A1503",
      time: "13:20-15:00",
      category: "LAB",
    },
  ];

  const handleBackClick = () => {
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sessions */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Monday, 16 June 2025
              </h1>
              <hr className="border-gray-300" />
            </div>

            <div className="space-y-4">
              {sessions.map((session, index) => (
                <SessionCard
                  key={index}
                  classId={session.classId}
                  title={session.title}
                  format={session.format}
                  session={session.session}
                  room={session.room}
                  time={session.time}
                  category={session.category}
                  onClick={() => (window.location.href = "/course/course123")}
                />
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="w-full lg:w-96 shrink-0">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
