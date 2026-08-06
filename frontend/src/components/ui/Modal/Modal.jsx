import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  size = "md",
}) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Window */}

      <div
        className={`relative w-full ${sizes[size]} rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95`}
      >

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}