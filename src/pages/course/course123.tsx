import { useState } from "react"
import ClassCard from "../../components/ClassCard"
import SessionsTab from "../../components/course_session/SessionsTab"
import HorizontalTab from "../../components/tab/HorizontalTab"
import SyllabusTab from "../../components/course_session/SyllabusTab";
import AssignmentTab from "../../components/course_session/AssigmentTab";

export default function Course123Page() {
  const [activeTab, setActiveTab] = useState('Sessions');

  return (
    <div className="flex flex-col gap-5 mx-32">
      <ClassCard
        courseCode="AIUEO"
        courseName="Data Structures"
        instructor="Skibidi Philip, M.Kom."
        onClick={() => window.location.href = '/course'}
      />
      <HorizontalTab tabs={['Sessions', 'Syllabus', 'Assignment', 'People', 'Grades']} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col p-5 gap-5 border-solid border-1 border-slate-200 rounded-2xl">
        {
          activeTab === 'Sessions' ?
            <SessionsTab />
            : activeTab === 'Syllabus' ?
              <SyllabusTab />
              : activeTab === 'Assignment' ?
                <AssignmentTab />
                :
                <></>
        }
      </div>
    </div>
  )
}