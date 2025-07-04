import TabSwitcher from "../../components/tab/TabSwitcher";
import HorizontalTab from "../../components/tab/HorizontalTab";
import ClassCard from "../../components/cards/ClassCard";
import { useState } from 'react';

const courses = [
  {
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Alice Johnson',
    link: '/course/course123',
    type: 'CL'
  },
  {
    code: 'CS102',
    name: 'Data Structures & Algorithms',
    instructor: 'Prof. Bob Smith',
    link: '/course/course123',
    type: 'LAB'
  },
  {
    code: 'CS103',
    name: 'Database Systems',
    instructor: 'Dr. Clara Lee',
    link: '/course/course123',
    type: 'LEC'
  },
  {
    code: 'CS104',
    name: 'Operating Systems',
    instructor: 'Dr. Daniel Martinez',
    link: '/course/course123',
    type: 'CL'
  },
  {
    code: 'CS105',
    name: 'Machine Learning Basics',
    instructor: 'Prof. Emma Zhang',
    link: '/course/course123',
    type: 'LAB'
  },
  {
    code: 'CS106',
    name: 'Web Development',
    instructor: 'Ms. Fiona Davis',
    link: '/course/course123',
    type: 'LEC'
  }
];

export default function CourseListPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredCourses = activeTab === "All"
    ? courses
    : courses.filter(course => course.type === activeTab);

  // Calculate counts for each tab
  const allCount = courses.length;
  const clCount = courses.filter(course => course.type === 'CL').length;
  const labCount = courses.filter(course => course.type === 'LAB').length;
  const lecCount = courses.filter(course => course.type === 'LEC').length;

  return (
    <div className="pt-6 flex flex-col gap-8 max-w-5xl mx-auto px-4">

      <TabSwitcher 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        tabs={[
          { label: "All", count: allCount },
          { label: "CL", count: clCount },
          { label: "LAB", count: labCount },
          { label: "LEC", count: lecCount }
        ]}
      />
      {/* <HorizontalTab 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        tabs={[
          { label: "All" },
          { label: "CL" },
          { label: "LAB" },
          { label: "LEC" }
        ]}
      /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => (
          <ClassCard
            key={idx}
            courseCode={course.code}
            courseName={course.name}
            instructor={course.instructor}
            onClick={() => { window.location.href = course.link; }}
          />
        ))}
      </div>

    </div>
  );
}