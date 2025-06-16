import { useState, useEffect } from "react";
import { FileText, FileImage, FileVideo, FileArchive, BookOpen, File, Upload, Link } from "lucide-react";
import Dialog from "./Dialog";
import Button from "../buttons/Button";

interface MaterialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  onAdd?: (data: { title: string; subtitle: string; type: string; uploadMethod: 'file' | 'link'; file?: File; url?: string }) => void;
  onSave?: (data: { title: string; subtitle: string; type: string }) => void;
  initialData?: { title: string; subtitle?: string; type: string };
}

const materialTypes = [
  { value: "pdf", label: "PDF Document", icon: <FileText className="w-4 h-4" /> },
  { value: "ppt", label: "Presentation", icon: <FileArchive className="w-4 h-4" /> },
  { value: "video", label: "Video", icon: <FileVideo className="w-4 h-4" /> },
  { value: "image", label: "Image", icon: <FileImage className="w-4 h-4" /> },
  { value: "doc", label: "Document", icon: <File className="w-4 h-4" /> },
  { value: "book", label: "Book", icon: <BookOpen className="w-4 h-4" /> },
  { value: "other", label: "Other", icon: <File className="w-4 h-4" /> }
];

const uploadMethods = [
  { value: "file", label: "Upload File", icon: <Upload className="w-4 h-4" /> },
  { value: "link", label: "Add Link", icon: <Link className="w-4 h-4" /> }
];

// Extract the content into a separate component
function MaterialDialogContent({ mode, onAdd, onSave, initialData, onClose }: Omit<MaterialDialogProps, 'isOpen'>) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    type: "pdf",
    uploadMethod: "file" as 'file' | 'link',
    url: "",
    file: null as File | null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dragActive, setDragActive] = useState(false);
  const isAddMode = mode === 'add';

  useEffect(() => {
    setFormData({
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      type: initialData?.type || "pdf",
      uploadMethod: "file",
      url: "",
      file: null
    });
    setErrors({});
  }, [initialData]);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.length > 100) newErrors.title = "Max 100 characters";
    if (formData.subtitle.length > 200) newErrors.subtitle = "Max 200 characters";

    if (isAddMode) {
      if (formData.uploadMethod === "file" && !formData.file) newErrors.file = "File required";
      if (formData.uploadMethod === "link" && (!formData.url.trim() || !isValidUrl(formData.url))) {
        newErrors.url = "Valid URL required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try { new URL(string); return true; } catch { return false; }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isAddMode && onAdd) {
      onAdd({
        title: formData.title,
        subtitle: formData.subtitle,
        type: formData.type,
        uploadMethod: formData.uploadMethod,
        file: formData.file || undefined,
        url: formData.url || undefined
      });
    } else if (!isAddMode && onSave) {
      onSave({
        title: formData.title,
        subtitle: formData.subtitle,
        type: formData.type
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({ title: "", subtitle: "", type: "pdf", uploadMethod: "file", url: "", file: null });
    setErrors({});
    onClose();
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleInputChange("file", file);
      if (!formData.title) handleInputChange("title", file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      handleInputChange("file", file);
      if (!formData.title) handleInputChange("title", file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleChooseFileClick = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Upload Method */}
        {isAddMode && (
          <div>
            <label className="block font-medium mb-2">Upload Method</label>
            <div className="grid grid-cols-2 gap-3">
              {uploadMethods.map((method) => (
                <button key={method.value}
                  onClick={() => handleInputChange("uploadMethod", method.value)}
                  className={`flex items-center gap-2 p-3 border rounded-lg transition
                    ${formData.uploadMethod === method.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`}>
                  {method.icon} {method.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* File/URL Selection */}
        {isAddMode && (
          <>
            {formData.uploadMethod === "file" ? (
              <div>
                <label className="block font-medium mb-2">File *</label>
                <div onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                     onDragLeave={() => setDragActive(false)}
                     onDrop={handleFileDrop}
                     className={`p-6 border-2 border-dashed rounded-lg text-center transition 
                      ${dragActive ? "border-blue-500 bg-blue-50" : errors.file ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="mb-2 text-sm text-gray-600">{formData.file ? formData.file.name : "Drag & drop or click to select file"}</p>
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} />
                  <div className="flex justify-center">
                    <Button 
                      text="Choose File" 
                      variant="secondary" 
                      onClick={handleChooseFileClick}
                      className="text-sm"
                    />
                  </div>
                </div>
                {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
              </div>
            ) : (
              <div>
                <label className="block font-medium mb-2">URL *</label>
                <input type="url" value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  placeholder="https://example.com"
                  className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${errors.url ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
              </div>
            )}
          </>
        )}

        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Title *</label>
          <input type="text" value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            maxLength={100}
            className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter title"
          />
          <p className="text-xs text-gray-400">{formData.title.length}/100</p>
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-medium mb-2">Subtitle</label>
          <input type="text" value={formData.subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            maxLength={200}
            className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${errors.subtitle ? "border-red-500" : "border-gray-300"}`}
            placeholder="Optional subtitle"
          />
          <p className="text-xs text-gray-400">{formData.subtitle.length}/200</p>
          {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle}</p>}
        </div>

        {/* Material Type */}
        <div>
          <label className="block font-medium mb-2">Material Type</label>
          <div className="grid grid-cols-2 gap-2">
            {materialTypes.map((type) => (
              <button key={type.value}
                onClick={() => handleInputChange("type", type.value)}
                className={`flex items-center gap-2 p-2 border rounded-lg transition
                  ${formData.type === type.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`}>
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-5 border-t border-gray-200 flex-shrink-0">
        <Button text="Cancel" variant="secondary" onClick={handleClose} />
        <Button text={isAddMode ? "Add Material" : "Save Changes"} variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default function MaterialDialog({ isOpen, onClose, mode, onAdd, onSave, initialData }: MaterialDialogProps) {
  const isAddMode = mode === 'add';
  
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isAddMode ? "Add Material" : "Edit Material"}
      size={isAddMode ? "lg" : "md"}
    >
      <MaterialDialogContent 
        mode={mode}
        onAdd={onAdd}
        onSave={onSave}
        initialData={initialData}
        onClose={onClose}
      />
    </Dialog>
  );
}