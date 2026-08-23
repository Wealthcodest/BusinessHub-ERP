export default function LoadingSkeleton({ columnCount = 5, rowCount = 5 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white" aria-label="Loading records" role="status">
      <span className="sr-only">Loading records</span>
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4"><div className="h-4 w-32 animate-pulse rounded bg-slate-200" /></div>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-flow-col auto-cols-fr gap-4 border-b border-slate-100 px-6 py-5 last:border-b-0">
          {Array.from({ length: columnCount }).map((__, columnIndex) => (
            <div key={columnIndex} className="h-4 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      ))}
    </div>
  );
}
