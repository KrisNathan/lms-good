import { useState } from "react";
import ClassCard from "../../components/cards/ClassCard";
import SessionsTab from "../../components/course_session/SessionsTab";
import HorizontalTab from "../../components/tab/HorizontalTab";
import SyllabusTab from "../../components/course_session/SyllabusTab";
import AssignmentTab from "../../components/course_session/AssigmentTab";
import ForumTab from "../../components/course_session/ForumTab";
import PeopleTab from "../../components/course_session/PeopleTab";
import GradesTab from "../../components/course_session/GradesTab";

export default function Course123Page() {
  const [activeTab, setActiveTab] = useState('Sessions');

  const tabs = [
    { label: 'Sessions' },
    { label: 'Syllabus' },
    { label: 'Assignment' },
    { label: 'Forum' },
    { label: 'People' },
    { label: 'Grades' },
  ];

  const tabComponents: { [key: string]: React.ReactNode } = {
    Sessions: <SessionsTab />,
    Syllabus: <SyllabusTab />,
    Assignment: <AssignmentTab />,
    Forum: <ForumTab />,
    People: <PeopleTab />,
    Grades: <GradesTab />,
  };

  const handleBackClick = () => {
    window.location.href = '/course';
  };

  return (
    <div className="pt-6 flex flex-col gap-5 w-full">
      <button
        onClick={handleBackClick}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Course List
      </button>

      <ClassCard
        courseCode="CS101"
        courseName="Introduction to Computer Science"
        instructor="Dr. Alice Johnson"
      />

      <HorizontalTab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} variant="primary" />

      <div className="flex flex-col p-5 gap-5 border border-slate-200 rounded-2xl w-full">
        {tabComponents[activeTab]}
      </div>
    </div>
  );
}
