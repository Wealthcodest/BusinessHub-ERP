import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

import Button from "../Button";

export default function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search records...",
  selectedCount,
  onBulkAction,
  bulkActions,
  selectedIds,
  primaryAction,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search records</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103746] focus:ring-2 focus:ring-[#103746]/15"
          />
        </label>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-600" aria-live="polite">
            <span>{selectedCount} selected</span>
            <div className="relative">
            <button
              type="button"
              onClick={() => bulkActions?.length ? setMenuOpen((open) => !open) : onBulkAction?.()}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2"
            >
              Bulk actions
              {bulkActions?.length > 0 && <ChevronDown aria-hidden="true" className="h-4 w-4" />}
            </button>
            {menuOpen && bulkActions?.length > 0 && <div className="absolute left-0 z-20 mt-1 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
              {bulkActions.map((action) => <button key={action.label} type="button" className={`block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50 ${action.destructive ? "text-rose-600" : "text-slate-700"}`} onClick={() => { setMenuOpen(false); action.onClick(selectedIds); }}>{action.label}</button>)}
            </div>}
            </div>
          </div>
        )}
      </div>

      {primaryAction && (
        <Button type="button" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
      )}
    </div>
  );
}
