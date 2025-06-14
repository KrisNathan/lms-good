import HorizontalTab from "../../components/tab/HorizontalTab";
import ClassCard from "../../components/ClassCard";
import { useState } from 'react';


const courses = [
  {
    code: 'AIUEO',
    name: 'Data Structures',
    instructor: 'Prof. Dr. Ir. Jeremy Zhang, Ph.D.',
    link: '/course/course123'
  },
  {
    code: 'AIUEO',
    name: 'Data Structures',
    instructor: 'Prof. Dr. Ir. Jeremy Zhang, Ph.D.',
    link: '/course/course123'
  },
  {
    code: 'AIUEO',
    name: 'Data Structures',
    instructor: 'Prof. Dr. Ir. Jeremy Zhang, Ph.D.',
    link: '/course/course123'
  },
  {
    code: 'AIUEO',
    name: 'Data Structures',
    instructor: 'Prof. Dr. Ir. Jeremy Zhang, Ph.D.',
    link: '/course/course123'
  },
];

export default function CourseListPage() {
  const [activeTab, setActiveTab] = useState('All');
  const handleBackClick = () => {
    window.location.href = '/home';
  };

  return (
    <div className="pt-6 flex flex-col gap-5">
      <button
        onClick={handleBackClick}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
        Back to Home
      </button>
      <div className="flex flex-col gap-5 items-center">
        <div className="mx-auto">
          <HorizontalTab activeTab={activeTab} setActiveTab={setActiveTab} tabs={["All", "CL", "LAB", "LEC"]} />
        </div>
        <div className="md:min-w-xl sm:w-fit flex flex-col gap-5 items-center">
          {
            courses.map((course) => (
              <ClassCard
                courseCode={course.code}
                courseName={course.name}
                instructor={course.instructor}
                buttonText="View Course"
                onClick={() => {
                  window.location.href = course.link;
                }}
              />
            ))
          }
        </div>

      </div>
    </div>
  )
}