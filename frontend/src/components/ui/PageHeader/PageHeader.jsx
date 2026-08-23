export default function PageHeader({ title, description, breadcrumb, actions }) {
  return <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div>{breadcrumb && <div className="mb-3">{breadcrumb}</div>}<h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>{description && <p className="mt-2 text-sm text-slate-500 sm:text-base">{description}</p>}</div>{actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}</div>;
}
