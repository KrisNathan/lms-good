import { useState, useEffect } from "react";
import { FileCheck, FileClock, FileWarning, Upload, FileText, Calendar, Clock, User } from "lucide-react";
import Dialog from "./Dialog";
import Button from "../buttons/Button";

interface AssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    title: string;
    description: string;
    dueDate: string;
    status: "submitted" | "pending" | "late";
    maxPoints: number;
    submittedFile?: string;
    submittedAt?: string;
    grade?: number;
    feedback?: string;
  };
  onSubmit?: (file: File) => void;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case "submitted":
      return { icon: <FileCheck className="w-5 h-5 text-green-500" />, text: "Submitted", color: "text-green-600", bgColor: "bg-green-50" };
    case "pending":
      return { icon: <FileClock className="w-5 h-5 text-yellow-500" />, text: "Pending", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    case "late":
      return { icon: <FileWarning className="w-5 h-5 text-red-500" />, text: "Late", color: "text-red-600", bgColor: "bg-red-50" };
    default:
      return { icon: <FileClock className="w-5 h-5 text-gray-400" />, text: "Unknown", color: "text-gray-600", bgColor: "bg-gray-50" };
  }
};

function AssignmentDialogContent({ assignment, onSubmit, onClose }: Omit<AssignmentDialogProps, 'isOpen'>) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusInfo = getStatusInfo(assignment.status);
  const isSubmitted = assignment.status === "submitted";
  const canSubmit = assignment.status === "pending" || assignment.status === "late";

  useEffect(() => {
    setSelectedFile(null);
  }, [assignment]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0] && canSubmit) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && canSubmit) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleChooseFileClick = () => {
    if (canSubmit) {
      document.getElementById('assignment-file-upload')?.click();
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !onSubmit) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(selectedFile);
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Assignment Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold text-gray-900">{assignment.title}</h1>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
              {statusInfo.icon}
              <span className={`font-medium text-sm ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(assignment.dueDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Max Points: {assignment.maxPoints}</span>
            </div>
          </div>
        </div>

        {/* Assignment Description */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Description</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
          </div>
        </div>

        {/* Submission Status */}
        {isSubmitted && (
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Your Submission</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              {assignment.submittedFile && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">File: {assignment.submittedFile}</span>
                </div>
              )}
              {assignment.submittedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Submitted: {formatDate(assignment.submittedAt)}</span>
                </div>
              )}
              {assignment.grade !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Grade: {assignment.grade}/{assignment.maxPoints}</span>
                </div>
              )}
              {assignment.feedback && (
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">Feedback:</p>
                  <p className="text-sm text-gray-700">{assignment.feedback}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* File Upload Section */}
        {canSubmit && (
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Submit Assignment</h3>
            <div 
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleFileDrop}
              className={`p-6 border-2 border-dashed rounded-lg text-center transition 
                ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="mb-2 text-sm text-gray-600">
                {selectedFile ? selectedFile.name : "Drag & drop your assignment file or click to select"}
              </p>
              <input 
                id="assignment-file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.zip,.rar"
              />
              <div className="flex justify-center">
                <Button 
                  text="Choose File" 
                  variant="secondary" 
                  onClick={handleChooseFileClick}
                  className="text-sm"
                />
              </div>
            </div>
            {selectedFile && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <FileText className="w-4 h-4" />
                  <span>Selected: {selectedFile.name}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
        <Button text="Close" variant="secondary" onClick={onClose} />
        {canSubmit && selectedFile && (
          <Button 
            text={isSubmitting ? "Submitting..." : "Submit Assignment"} 
            variant="primary" 
            onClick={handleSubmit}
            className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
          />
        )}
      </div>
    </div>
  );
}

export default function AssignmentDialog({ isOpen, onClose, assignment, onSubmit }: AssignmentDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Assignment Details"
      size="lg"
    >
      <AssignmentDialogContent 
        assignment={assignment}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Dialog>
  );
}
