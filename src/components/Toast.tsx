import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  key?: string;
  toast: ToastItem;
  onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const bgClass =
    toast.type === "success"
      ? "bg-slate-900 border-emerald-500/30 text-white"
      : toast.type === "error"
      ? "bg-slate-900 border-red-500/30 text-white"
      : "bg-slate-900 border-slate-700 text-white";

  const Icon =
    toast.type === "success"
      ? CheckCircle2
      : toast.type === "error"
      ? AlertCircle
      : AlertCircle;

  const iconColor =
    toast.type === "success"
      ? "text-emerald-400"
      : toast.type === "error"
      ? "text-red-400"
      : "text-slate-400";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${bgClass} animate-slide-in min-w-[280px] max-w-sm pointer-events-auto`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
      <p className="flex-1 text-xs font-bold leading-normal">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
