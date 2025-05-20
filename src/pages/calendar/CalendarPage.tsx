import React from 'react';
import Calendar from '../../components/Calendar';
import SessionCard from '../../components/cards/SessionCard';

export default function CalendarPage() {
  const sessions = [
    {
      title: "Scientific Computing",
      format: "F2F",
      session: "Session 10",
      room: "A0507",
      time: "07:20–09:00",
      category: "LEC"
    },
    {
      title: "Data Structures",
      format: "F2F",
      session: "Session 10",
      room: "B0501",
      time: "09:20–11:00",
      category: "LEC"
    },
    {
      title: "Human and Computer Interaction",
      format: "F2F",
      session: "Session 10",
      room: "A0507",
      time: "11:20–13:00",
      category: "LEC"
    },
    {
      title: "Human and Computer Interaction",
      format: "F2F",
      session: "Session 10",
      room: "A1503",
      time: "13:20–15:00",
      category: "LAB"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <main className="pt-16 pl-16">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex gap-6">
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
                    title={session.title}
                    format={session.format}
                    session={session.session}
                    room={session.room}
                    time={session.time}
                    category={session.category}
                    onClick={() => window.location.href = '/course/course123'}
                  />
                ))}
              </div>
            </div>

            <div className="w-80">
              <Calendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}