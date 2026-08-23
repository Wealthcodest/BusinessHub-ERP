const accentClasses = {
  primary: "bg-[#103746]/10 text-[#103746]",
  secondary: "bg-[#18566E]/10 text-[#18566E]",
  accent: "bg-[#dfb786]/20 text-[#8b6427]",
};

export default function MetricCard({ label, value, helperText, icon: Icon, accent = "secondary" }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3">{Icon && <div className={`rounded-lg p-2 ${accentClasses[accent] || accentClasses.secondary}`}><Icon aria-hidden="true" className="h-4 w-4" /></div>}<p className="text-sm font-medium text-slate-500">{label}</p></div><p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>{helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}</div>;
}
