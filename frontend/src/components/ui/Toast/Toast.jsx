import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";

const toastStyles = {
  success: {
    Icon: CircleCheck,
    iconClassName: "text-emerald-600",
    accentClassName: "bg-emerald-500",
  },
  error: {
    Icon: CircleX,
    iconClassName: "text-rose-600",
    accentClassName: "bg-rose-500",
  },
  warning: {
    Icon: TriangleAlert,
    iconClassName: "text-amber-600",
    accentClassName: "bg-amber-500",
  },
  info: {
    Icon: Info,
    iconClassName: "text-sky-600",
    accentClassName: "bg-sky-500",
  },
};

export default function Toast({ toast, onDismiss }) {
  const { Icon, iconClassName, accentClassName } = toastStyles[toast.type] || toastStyles.info;

  return (
    <div
      role="status"
      className={`relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ease-out ${
        toast.isExiting || toast.isEntering
          ? "translate-x-8 opacity-0"
          : "translate-x-0 opacity-100"
      }`}
    >
      <div className={`absolute inset-y-0 left-0 w-1 ${accentClassName}`} />

      <div className="flex items-start gap-3 px-4 py-3 pl-5">
        <Icon aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${iconClassName}`} />

        <p className="flex-1 text-sm font-medium leading-5 text-slate-700">
          {toast.message}
        </p>

        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(toast.id)}
          className="-mr-1 -mt-1 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
