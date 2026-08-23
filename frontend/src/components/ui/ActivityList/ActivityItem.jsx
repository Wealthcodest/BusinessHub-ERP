const accentClasses = {
  primary: "bg-[#103746]/10 text-[#103746]",
  secondary: "bg-[#18566E]/10 text-[#18566E]",
  accent: "bg-[#dfb786]/20 text-[#8b6427]",
};

export default function ActivityItem({ icon: Icon, title, description, timestamp, accent = "secondary" }) {
  return <li className="flex gap-3 py-4 first:pt-0 last:pb-0"><div className={`mt-0.5 rounded-lg p-2 ${accentClasses[accent] || accentClasses.secondary}`}>{Icon && <Icon aria-hidden="true" className="h-4 w-4" />}</div><div className="min-w-0 flex-1"><div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><p className="font-medium text-slate-800">{title}</p>{timestamp && <time className="text-xs text-slate-400">{timestamp}</time>}</div>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div></li>;
}
