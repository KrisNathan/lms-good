import { useState } from "react";
import AssignmentCard from "../cards/AssignmentCard";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "submitted" | "pending" | "late";
  maxPoints: number;
  submittedFile?: string;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
}

export default function AssignmentTab() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Project Report: Sorting Algorithm",
      description: "Create a comprehensive report analyzing different sorting algorithms including time complexity, space complexity, and practical applications. Include code examples and performance benchmarks.",
      dueDate: "20 June 2025",
      status: "pending",
      maxPoints: 100
    },
    {
      id: "2", 
      title: "Project Report: Sorting Algorithm",
      description: "Create a comprehensive report analyzing different sorting algorithms including time complexity, space complexity, and practical applications. Include code examples and performance benchmarks.",
      dueDate: "20 June 2025",
      status: "pending",
      maxPoints: 100
    },
    {
      id: "3",
      title: "Project Report: Sorting Algorithm", 
      description: "Create a comprehensive report analyzing different sorting algorithms including time complexity, space complexity, and practical applications. Include code examples and performance benchmarks.",
      dueDate: "20 June 2025",
      status: "pending",
      maxPoints: 100
    }
  ]);

  const handleSubmit = (assignmentId: string, file: File) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? {
            ...assignment,
            status: "submitted" as const,
            submittedFile: file.name,
            submittedAt: new Date().toISOString()
          }
        : assignment
    ));
  };

  return (
    <>
      {assignments.map(assignment => (
        <AssignmentCard
          key={assignment.id}
          title={assignment.title}
          description={assignment.description}
          dueDate={assignment.dueDate}
          status={assignment.status}
          maxPoints={assignment.maxPoints}
          submittedFile={assignment.submittedFile}
          submittedAt={assignment.submittedAt}
          grade={assignment.grade}
          feedback={assignment.feedback}
          onSubmit={(file) => handleSubmit(assignment.id, file)}
        />
      ))}
    </>
  );
}