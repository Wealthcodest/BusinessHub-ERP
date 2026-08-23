import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";

export default function DataTableRow({
  row,
  columns,
  rowId,
  rowLabel,
  isSelected,
  onToggleSelect,
  actions,
  isActionMenuOpen,
  onToggleActionMenu,
  onCloseActionMenu,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isActionMenuOpen) return undefined;

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) onCloseActionMenu();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") onCloseActionMenu();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActionMenuOpen, onCloseActionMenu]);

  return (
    <tr className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${isSelected ? "bg-teal-50/70" : "even:bg-slate-50/50"}`}>
      <td className="px-4 py-4 sm:px-6">
        <input
          type="checkbox"
          aria-label={`Select ${rowLabel}`}
          checked={isSelected}
          onChange={() => onToggleSelect(rowId)}
          className="h-4 w-4 rounded border-slate-300 text-[#103746] focus:ring-[#103746]"
        />
      </td>

      {columns.map((column) => (
        <td key={column.key} className={`whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6 ${column.cellClassName || ""}`}>
          {column.render ? column.render(row) : row[column.key] ?? "—"}
        </td>
      ))}

      {actions?.length > 0 && (
        <td className="relative px-4 py-4 text-right sm:px-6">
          <div ref={menuRef} className="inline-block">
            <button
              type="button"
              aria-label={`Actions for ${rowLabel}`}
              aria-expanded={isActionMenuOpen}
              aria-haspopup="menu"
              onClick={() => onToggleActionMenu(rowId)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2"
            >
              <MoreHorizontal aria-hidden="true" className="h-5 w-5" />
            </button>

            {isActionMenuOpen && (
              <div role="menu" className="absolute right-6 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                {actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      action.onClick(row);
                      onCloseActionMenu();
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none ${action.destructive ? "text-rose-600" : "text-slate-700"}`}
                  >
                    {action.icon && <action.icon aria-hidden="true" className="h-4 w-4" />}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}
