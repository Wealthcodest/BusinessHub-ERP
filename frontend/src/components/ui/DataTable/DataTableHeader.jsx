import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

export default function DataTableHeader({
  columns,
  allSelected,
  someSelected,
  onToggleAll,
  sort,
  onSort,
  showActions,
}) {
  return (
    <thead className="sticky top-0 z-10 bg-slate-50 shadow-[0_1px_0_0_rgb(226_232_240)]">
      <tr>
        <th scope="col" className="w-12 px-4 py-3 text-left sm:px-6">
          <input
            type="checkbox"
            aria-label="Select all visible records"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = someSelected;
            }}
            onChange={onToggleAll}
            className="h-4 w-4 rounded border-slate-300 text-[#103746] focus:ring-[#103746]"
          />
        </th>

        {columns.map((column) => {
          const isSorted = sort.key === column.key;
          const SortIcon = isSorted
            ? sort.direction === "asc"
              ? ArrowUp
              : ArrowDown
            : ChevronsUpDown;

          return (
            <th
              key={column.key}
              scope="col"
              className={`whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 ${column.headerClassName || ""}`}
            >
              {column.sortable ? (
                <button
                  type="button"
                  onClick={() => onSort(column.key)}
                  className="inline-flex items-center gap-1 rounded text-left transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2"
                >
                  {column.label}
                  <SortIcon aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ) : column.label}
            </th>
          );
        })}

        {showActions && (
          <th scope="col" className="w-16 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
            <span className="sr-only">Actions</span>
          </th>
        )}
      </tr>
    </thead>
  );
}
