import Dialog from "./Dialog";
import ForumContent from "./ForumContent";

interface ForumDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  authorName?: string;
  authorDate?: string;
  authorAvatar?: string;
  authorStatus: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

export default function ForumDialog({ 
  isOpen, 
  onClose, 
  title, 
  content,
  authorName = "Amogussi Cappucino",
  authorDate = "3 May 2025, 05:21 GMT+7",
  authorAvatar = "/user-icon.png",
  authorStatus = "Lecturer",
  size = "xl",
  showCloseButton = true 
}: ForumDialogProps) {
  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Session 1" 
      size={size}
      showCloseButton={showCloseButton}
    >
      <ForumContent
        title={title}
        content={content}
        authorName={authorName}
        authorDate={authorDate}
        authorAvatar={authorAvatar}
        authorStatus={authorStatus}
      />
    </Dialog>
  );
}