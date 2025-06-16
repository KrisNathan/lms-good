import { AlertTriangle } from "lucide-react";
import Dialog from "./Dialog";
import Button from "../buttons/Button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'danger'
}: ConfirmationDialogProps) {
  const variantStyles = {
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600"
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className={`w-5 h-5 ${variantStyles[variant]}`} />
          <span className="font-medium text-gray-900">Confirmation Required</span>
        </div>
        
        <p className="text-gray-600 mb-6 flex-1">{message}</p>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            text={cancelText}
            variant="secondary"
            onClick={onClose}
          />
          <Button
            text={confirmText}
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Dialog>
  );
}