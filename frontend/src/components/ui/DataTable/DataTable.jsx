import { useEffect, useMemo, useState } from "react";

import DataTableHeader from "./DataTableHeader";
import DataTablePagination from "./DataTablePagination";
import DataTableRow from "./DataTableRow";
import DataTableToolbar from "./DataTableToolbar";
import EmptyState from "./EmptyState";
import LoadingSkeleton from "./LoadingSkeleton";

const defaultGetRowId = (row) => row.id;
const defaultGetRowLabel = () => "record";

export default function DataTable({
  data = [],
  columns,
  getRowId = defaultGetRowId,
  getRowLabel = defaultGetRowLabel,
  searchFields = [],
  searchPlaceholder,
  primaryAction,
  emptyState,
  getRowActions,
  onBulkAction,
  bulkActions,
  selectionVersion,
  loading = false,
  initialPageSize = 10,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openActionId, setOpenActionId] = useState(null);

  useEffect(() => { setSelectedIds([]); }, [selectionVersion]);

  const filteredData = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query || !searchFields.length) return data;

    return data.filter((row) => searchFields.some((field) =>
      String(typeof field === "function" ? field(row) : row[field] ?? "").toLowerCase().includes(query)
    ));
  }, [data, searchFields, searchValue]);

  const sortedData = useMemo(() => {
    if (!sort.key) return filteredData;
    const column = columns.find((item) => item.key === sort.key);

    return [...filteredData].sort((left, right) => {
      const leftValue = column?.sortValue ? column.sortValue(left) : left[sort.key];
      const rightValue = column?.sortValue ? column.sortValue(right) : right[sort.key];
      const comparison = String(leftValue ?? "").localeCompare(String(rightValue ?? ""), undefined, { numeric: true, sensitivity: "base" });
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [columns, filteredData, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const visibleIds = paginatedData.map(getRowId);
  const dataIds = new Set(data.map(getRowId));
  const validSelectedIds = selectedIds.filter((id) => dataIds.has(id));
  const selectedVisibleCount = visibleIds.filter((id) => validSelectedIds.includes(id)).length;
  const allSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;

  function handleSort(key) {
    setPage(1);
    setSort((currentSort) => ({
      key,
      direction: currentSort.key === key && currentSort.direction === "asc" ? "desc" : "asc",
    }));
  }

  function handleToggleSelect(id) {
    setSelectedIds((currentIds) => currentIds.includes(id)
      ? currentIds.filter((currentId) => currentId !== id)
      : [...currentIds, id]);
  }

  function handleToggleAll() {
    setSelectedIds((currentIds) => {
      const currentValidIds = currentIds.filter((id) => dataIds.has(id));
      return allSelected
        ? currentValidIds.filter((id) => !visibleIds.includes(id))
        : [...new Set([...currentValidIds, ...visibleIds])];
    });
  }

  function handleSearchChange(value) {
    setSearchValue(value);
    setPage(1);
  }

  function handlePageSizeChange(value) {
    setPageSize(value);
    setPage(1);
  }

  if (loading) return <LoadingSkeleton columnCount={columns.length + 2} />;

  if (data.length === 0) return <EmptyState {...emptyState} primaryAction={emptyState?.primaryAction || primaryAction} />;

  const visibleStart = (currentPage - 1) * pageSize + 1;
  const visibleEnd = Math.min(currentPage * pageSize, sortedData.length);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <DataTableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        searchPlaceholder={searchPlaceholder}
        selectedCount={validSelectedIds.length}
        onBulkAction={() => onBulkAction?.(validSelectedIds)}
        bulkActions={bulkActions}
        selectedIds={validSelectedIds}
        primaryAction={primaryAction}
      />

      {sortedData.length === 0 ? <EmptyState {...emptyState} /> : (
        <>
          <div className="max-h-[calc(100vh-18rem)] overflow-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-0">
              <DataTableHeader
                columns={columns}
                allSelected={allSelected}
                someSelected={selectedVisibleCount > 0 && !allSelected}
                onToggleAll={handleToggleAll}
                sort={sort}
                onSort={handleSort}
                showActions={Boolean(getRowActions)}
              />
              <tbody>
                {paginatedData.map((row) => {
                  const rowId = getRowId(row);
                  return <DataTableRow key={rowId} row={row} rowId={rowId} rowLabel={getRowLabel(row)} columns={columns} isSelected={validSelectedIds.includes(rowId)} onToggleSelect={handleToggleSelect} actions={getRowActions?.(row)} isActionMenuOpen={openActionId === rowId} onToggleActionMenu={(id) => setOpenActionId((currentId) => currentId === id ? null : id)} onCloseActionMenu={() => setOpenActionId(null)} />;
                })}
              </tbody>
            </table>
          </div>
          <DataTablePagination page={currentPage} pageCount={pageCount} pageSize={pageSize} onPageSizeChange={handlePageSizeChange} onPreviousPage={() => setPage((activePage) => Math.max(1, activePage - 1))} onNextPage={() => setPage((activePage) => Math.min(pageCount, activePage + 1))} totalRecords={sortedData.length} visibleStart={visibleStart} visibleEnd={visibleEnd} />
        </>
      )}
    </div>
  );
}
