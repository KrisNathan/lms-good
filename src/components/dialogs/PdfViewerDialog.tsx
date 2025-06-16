import Dialog from "./Dialog";
import PdfContent from "./PdfContent";

interface PdfViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string;
}

export default function PdfViewerDialog({ isOpen, onClose, title, pdfUrl }: PdfViewerDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
    >
      <PdfContent title={title} pdfUrl={pdfUrl} />
    </Dialog>
  );
}
