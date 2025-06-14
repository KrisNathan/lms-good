import { CheckCircle, InfoIcon, CircleAlert } from "lucide-react";

export type NotifVariant = "success" | "error";

export interface InlineNotifProps {
  variant?: NotifVariant;
  message: string;
}

const variantMatcher = (message: string, variant?: NotifVariant) => {
  switch (variant) {
    case "success":
      return (
        <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2 mt-3">
          <CheckCircle size={16} className="text-green-600" />
          <span className="text-sm text-green-700">{message}</span>
        </div>
      )
    case "error":
      return (
        <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2 mt-3">
          <CircleAlert size={16} className="text-red-600" />
          <span className="text-sm text-red-700">{message}</span>
        </div>
      )
    default:
      return (
        <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-2 mt-3">
          <InfoIcon size={16} className="text-blue-600" />
          <span className="text-sm text-blue-700">{message}</span>
        </div>
      )
  }
}

export default function InlineNotif({
  variant,
  message
}: InlineNotifProps) {
  return (
    <>
      {variantMatcher(message, variant)}
    </>
  )
}