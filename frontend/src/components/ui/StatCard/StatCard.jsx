const accentClasses = {
  primary: "bg-[#103746]/10 text-[#103746]",
  secondary: "bg-[#18566E]/10 text-[#18566E]",
  accent: "bg-[#dfb786]/20 text-[#8b6427]",
};

export default function StatCard({ title, value, icon: Icon, description, accent = "primary" }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p></div>{Icon && <div className={`rounded-lg p-2.5 ${accentClasses[accent] || accentClasses.primary}`}><Icon aria-hidden="true" className="h-5 w-5" /></div>}</div>{description && <p className="mt-4 text-xs text-slate-500">{description}</p>}</div>;
}
