import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTablePagination({
  page,
  pageCount,
  pageSize,
  onPageSizeChange,
  onPreviousPage,
  onNextPage,
  totalRecords,
  visibleStart,
  visibleEnd,
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-2">
        <label htmlFor="data-table-page-size">Rows per page</label>
        <select
          id="data-table-page-size"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-[#103746] focus:ring-2 focus:ring-[#103746]/15"
        >
          {[5, 10, 25, 50].map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
        <span className="hidden sm:inline">{totalRecords ? `${visibleStart}-${visibleEnd} of ${totalRecords}` : "0 records"}</span>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span>Page {page} of {pageCount}</span>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Previous page" onClick={onPreviousPage} disabled={page === 1} className="rounded-md p-1.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#103746]">
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next page" onClick={onNextPage} disabled={page === pageCount} className="rounded-md p-1.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#103746]">
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
