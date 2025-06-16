import { useState } from "react";
import HorizontalTab from "../tab/HorizontalTab";
import AttendCard from "../cards/AttendCard";
import MaterialCard from "../cards/MaterialCard";
import PdfViewerDialog from "../dialogs/PdfViewerDialog";
import MaterialDialog from "../dialogs/MaterialDialog";
import FloatingActionButton from "../buttons/FloatingActionButton";
import Toast from "../notif/Toast";
import { Plus } from "lucide-react";

interface Material {
  id: string;
  type: "pdf" | "ppt" | "video" | "image" | "doc" | "book" | "other";
  title: string;
  subtitle?: string;
  url?: string;
}

export default function SessionsTab() {
  const [activeTab, setActiveTab] = useState("Session 1");
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [addMaterialDialogOpen, setAddMaterialDialogOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url?: string } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    visible: boolean;
  }>({ message: "", type: "success", visible: false });
  
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      type: "pdf",
      title: "Lecture 1: Dynamic Programming",
      subtitle: "Uploaded 2 days ago",
    },
    {
      id: "2",
      type: "ppt",
      title: "Lecture 1: Dynamic Programming",
      subtitle: "Uploaded 2 days ago",
    },
    {
      id: "3",
      type: "video",
      title: "Lecture 1: Dynamic Programming",
      subtitle: "Uploaded 2 days ago",
    },
  ]);

  const tabs = Array.from({ length: 24 }, (_, i) => ({
    label: `Session ${i + 1}`,
  }));

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type, visible: true });
  };

  const handlePdfClick = (title: string, url?: string) => {
    setSelectedPdf({ title, url });
    setPdfDialogOpen(true);
  };

  const handleAddMaterial = (data: { 
    title: string; 
    subtitle: string; 
    type: string; 
    uploadMethod: 'file' | 'link';
    file?: File;
    url?: string;
  }) => {
    // Generate a unique ID for the new material
    const newId = (materials.length + 1).toString();
    
    const newMaterial: Material = {
      id: newId,
      type: data.type as Material['type'],
      title: data.title,
      subtitle: data.subtitle || `Added via ${data.uploadMethod}`,
      url: data.url
    };

    setMaterials(prev => [...prev, newMaterial]);
    showToast(`Material "${data.title}" added successfully!`, "success");
  };

  const handleNewMaterial = () => {
    setAddMaterialDialogOpen(true);
  };

  const handleMaterialEdit = (materialId: string, data: { title: string; subtitle: string; type: string }) => {
    setMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, ...data, type: data.type as Material['type'] }
          : material
      )
    );
  };

  const handleMaterialDelete = (materialId: string) => {
    setMaterials(prev => prev.filter(material => material.id !== materialId));
  };

  const handleMaterialCopyLink = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    if (material) {
      showToast(`Link copied for "${material.title}"!`, "success");
    }
  };

  return (
    <>
      <HorizontalTab
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <AttendCard />

      <FloatingActionButton 
        icon={<Plus />} 
        text="New Material" 
        onClick={handleNewMaterial} 
      />

      <div className="space-y-4">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            type={material.type}
            title={material.title}
            subtitle={material.subtitle}
            onClick={() => {
              if (material.type === "pdf") {
                handlePdfClick(material.title, material.url);
              }
            }}
            onEdit={(data) => handleMaterialEdit(material.id, data)}
            onDelete={() => handleMaterialDelete(material.id)}
            onCopyLink={() => handleMaterialCopyLink(material.id)}
          />
        ))}
      </div>

      {/* Add Material Dialog */}
      <MaterialDialog
        isOpen={addMaterialDialogOpen}
        onClose={() => setAddMaterialDialogOpen(false)}
        mode="add"
        onAdd={handleAddMaterial}
      />

      {/* PDF Viewer Dialog */}
      <PdfViewerDialog
        isOpen={pdfDialogOpen}
        onClose={() => setPdfDialogOpen(false)}
        title={selectedPdf?.title || ""}
        pdfUrl={selectedPdf?.url}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        duration={3000}
      />
    </>
  );
}