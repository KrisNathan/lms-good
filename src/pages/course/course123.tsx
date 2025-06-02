import { useState } from "react"
import ClassCard from "../../components/ClassCard"
import SessionsTab from "../../components/course_session/SessionsTab"
import HorizontalTab from "../../components/tab/HorizontalTab"
import SyllabusTab from "../../components/course_session/SyllabusTab";
import AssignmentTab from "../../components/course_session/AssigmentTab";
import ForumTab from "../../components/course_session/ForumTab";
import PeopleTab from "../../components/course_session/PeopleTab";
import GradesTab from "../../components/course_session/GradesTab";

export default function Course123Page() {
  const [activeTab, setActiveTab] = useState('Sessions');
  const handleBackClick = () => {
    window.location.href = '/course';
  };
  const tabContent = () => {
    switch (activeTab) {
      case 'Sessions':
        return <SessionsTab />;
      case 'Syllabus':
        return <SyllabusTab />;
      case 'Assignment':
        return <AssignmentTab />;
      case 'Forum':
        return <ForumTab />;
      case 'People':
        return <PeopleTab />
      case 'Grades':
        return <GradesTab />

    }
  }

  return (
    <div className="flex flex-col gap-5 mx-32">
      <button
          onClick={handleBackClick}
          className="mb-4  flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Course
        </button>
      <ClassCard
        courseCode="AIUEO"
        courseName="Data Structures"
        instructor="Skibidi Philip, M.Kom."
        onClick={() => window.location.href = '/course'}
      />
      <HorizontalTab tabs={['Sessions', 'Syllabus', 'Assignment', 'Forum', 'People', 'Grades']} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col p-5 gap-5 border-solid border-1 border-slate-200 rounded-2xl">
        {
          tabContent()
        }
      </div>
    </div>
  )
}