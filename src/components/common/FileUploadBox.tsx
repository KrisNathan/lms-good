import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import Button from "../buttons/Button";

interface FileUploadBoxProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  autoFillTitle?: boolean;
  onTitleSuggestion?: (title: string) => void;
  className?: string;
}

export default function FileUploadBox({
  selectedFile,
  onFileSelect,
  accept,
  placeholder = "Drag & drop or click to select file",
  disabled = false,
  error,
  autoFillTitle = false,
  onTitleSuggestion,
  className = ""
}: FileUploadBoxProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0] && !disabled) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      
      // Auto-suggest title if enabled
      if (autoFillTitle && onTitleSuggestion) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        onTitleSuggestion(fileName);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && !disabled) {
      const file = e.target.files[0];
      onFileSelect(file);
      
      // Auto-suggest title if enabled
      if (autoFillTitle && onTitleSuggestion) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        onTitleSuggestion(fileName);
      }
    }
  };

  const handleChooseFileClick = () => {
    if (!disabled) {
      document.getElementById('file-upload-input')?.click();
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
  };

  return (
    <div className={className}>
      <div 
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleFileDrop}
        className={`p-6 border-2 border-dashed rounded-lg text-center transition 
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${dragActive && !disabled ? "border-blue-500 bg-blue-50" : 
            error ? "border-red-500 bg-red-50" : 
            "border-gray-300 hover:border-gray-400"}`}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="mb-2 text-sm text-gray-600">
          {selectedFile ? selectedFile.name : placeholder}
        </p>
        <input 
          id="file-upload-input" 
          type="file" 
          className="hidden" 
          onChange={handleFileSelect}
          accept={accept}
          disabled={disabled}
        />
        <div className="flex justify-center gap-2">
          <Button 
            text="Choose File" 
            variant="secondary" 
            onClick={handleChooseFileClick}
            className="text-sm"
          />
          {selectedFile && (
            <Button 
              text="Remove" 
              variant="danger" 
              onClick={handleRemoveFile}
              className="text-sm"
            />
          )}
        </div>
      </div>
      
      {selectedFile && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <FileText className="w-4 h-4" />
            <span>Selected: {selectedFile.name}</span>
            <span className="text-xs text-gray-500">
              ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
