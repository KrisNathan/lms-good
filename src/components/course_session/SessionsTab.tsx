import { useState } from "react";
import HorizontalTab from "../tab/HorizontalTab";
import AttendCard from "../cards/AttendCard";
import MaterialCard from "../cards/MaterialCard";
import PdfViewerDialog from "../dialogs/PdfViewerDialog";

export default function SessionsTab() {
  const [activeTab, setActiveTab] = useState("Session 1");
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url?: string } | null>(null);

  const tabs = Array.from({ length: 24 }, (_, i) => ({
    label: `Session ${i + 1}`,
  }));

  const handlePdfClick = (title: string, url?: string) => {
    setSelectedPdf({ title, url });
    setPdfDialogOpen(true);
  };

  return (
    <>
      <HorizontalTab
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <AttendCard />
      <MaterialCard
        type="pdf"
        title="Lecture 1: Dynamic Programming"
        subtitle="Uploaded 2 days ago"
        onClick={() => handlePdfClick("Lecture 1: Dynamic Programming")}
      />
      <MaterialCard
        type="ppt"
        title="Lecture 1: Dynamic Programming"
        subtitle="Uploaded 2 days ago"
        onClick={() => {}}
      />
      <MaterialCard
        type="video"
        title="Lecture 1: Dynamic Programming"
        subtitle="Uploaded 2 days ago"
        onClick={() => {}}
      />

      {/* PDF Viewer Dialog */}
      <PdfViewerDialog
        isOpen={pdfDialogOpen}
        onClose={() => setPdfDialogOpen(false)}
        title={selectedPdf?.title || ""}
        pdfUrl={selectedPdf?.url}
      />
    </>
  );
}
