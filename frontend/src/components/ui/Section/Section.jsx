export default function Section({ title, description, action, children, className = "" }) {
  return <section className={className}>{(title || description || action) && <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div>{title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div>{action && <div>{action}</div>}</div>}{children}</section>;
}
