import CardSideButton from "../../components/buttons/CardSideButton"
import ClassCard from "../../components/ClassCard"
import HorizontalTab from "../../components/tab/HorizontalTab"

export default function Course123Page() {
  return (
    <div className="flex flex-col gap-5">
      <ClassCard
        courseCode="AIUEO"
        courseName="Data Structures"
        instructor="Skibidi Philip, M.Kom."
        onClick={() => window.location.href = '/course'}
      />
      <HorizontalTab tabs={['Syllabus', 'Sessions', 'Assignment', 'People', 'Grades']} />
      <div className="flex flex-col p-5 gap-5 border-solid border-1 border-slate-200 rounded-2xl">
        <HorizontalTab tabs={['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7', 'Session 8', 'Session 9', 'Session 10', 'Session 11']} />
        <div className="flex flex-row border-solid border-1 border-slate-200 rounded-2xl">
          <div className="p-5">
            <div>Attendance</div>
          </div>
          <CardSideButton text="Attend" icon="" className="bg-red-200 hover:bg-red-300 ml-auto" />
        </div>
      </div>
    </div>
  )
}