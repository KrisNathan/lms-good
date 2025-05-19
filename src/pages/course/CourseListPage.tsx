import HorizontalTab from "../../components/tab/HorizontalTab";
import ClassCard from "../../components/ClassCard";

export default function CourseListPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto">
        <HorizontalTab tabs={["All", "CL", "LAB", "LEC"]} />
      </div>
      <div className="mx-32 flex flex-col gap-5">
        <ClassCard

          courseCode="AIUEO"
          courseName="Data Structures"
          instructor="Skibidi Philip, M.Kom."
          onClick={() => {
            window.location.href = "/course/course123";
          }}
        />
        <ClassCard
          courseCode="AIUEO"
          courseName="Data Structures"
          instructor="Skibidi Philip, M.Kom."
        />
        <ClassCard
          courseCode="AIUEO"
          courseName="Data Structures"
          instructor="Skibidi Philip, M.Kom."
        />
      </div>
    </div>
  )
}