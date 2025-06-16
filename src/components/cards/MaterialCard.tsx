import { FileText, FileImage, FileVideo, FileArchive, BookOpen, File, Link, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import EllipsisButton from "../buttons/EllipsisButton";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import MaterialDialog from "../dialogs/MaterialDialog";
import Toast from "../notif/Toast";

interface MaterialCardProps {
  type: "pdf" | "ppt" | "video" | "image" | "doc" | "book" | "other";
  title: string;
  subtitle?: string;
  onClick?: () => void;
  onEdit?: (data: { title: string; subtitle: string; type: string }) => void;
  onDelete?: () => void;
  onCopyLink?: () => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-7 h-7 text-red-500" />;
    case "ppt":
      return <FileArchive className="w-7 h-7 text-orange-500" />;
    case "video":
      return <FileVideo className="w-7 h-7 text-purple-500" />;
    case "image":
      return <FileImage className="w-7 h-7 text-green-500" />;
    case "book":
      return <BookOpen className="w-7 h-7 text-blue-500" />;
    default:
      return <File className="w-7 h-7 text-gray-400" />;
  }
};

const MaterialCard: React.FC<MaterialCardProps> = ({ 
  type, 
  title, 
  subtitle, 
  onClick,
  onEdit,
  onDelete,
  onCopyLink
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    visible: boolean;
  }>({ message: "", type: "success", visible: false });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type, visible: true });
  };

  const handleCopyLink = async () => {
    try {
      // Generate a sample link - in real app, this would be the actual material URL
      const link = `${window.location.origin}/materials/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`;
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      showToast("Link copied to clipboard!", "success");
      onCopyLink?.();
    } catch (error) {
      showToast("Failed to copy link", "error");
    }
  };

  const handleEdit = (data: { title: string; subtitle: string; type: string }) => {
    onEdit?.(data);
    showToast("Material updated successfully!", "success");
  };

  const handleDelete = () => {
    onDelete?.();
    showToast("Material deleted successfully!", "success");
  };

  const ellipsisItems = [
    {
      label: "Copy Link",
      icon: <Link className="w-4 h-4" />,
      onClick: handleCopyLink,
    },
    {
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      onClick: () => setEditDialogOpen(true),
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4 text-red-500" />,
      onClick: () => setDeleteDialogOpen(true),
    },
  ];

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-md transition p-5 flex flex-row items-center gap-4 cursor-pointer"
      >
        <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full">
          {getIcon(type)}
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 break-words">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        <div className="flex" onClick={(e) => e.stopPropagation()}>
          <EllipsisButton items={ellipsisItems} />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Material"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Edit Material Dialog */}
      <MaterialDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        mode="edit"
        onSave={handleEdit}
        initialData={{ title, subtitle: subtitle || "", type }}
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
};

export default MaterialCard;