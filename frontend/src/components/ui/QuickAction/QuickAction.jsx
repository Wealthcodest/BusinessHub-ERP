import { ArrowUpRight } from "lucide-react";

const accentClasses = {
  primary: "bg-[#103746]/10 text-[#103746]",
  secondary: "bg-[#18566E]/10 text-[#18566E]",
  accent: "bg-[#dfb786]/20 text-[#8b6427]",
};

export default function QuickAction({ title, description, icon: Icon, onClick, accent = "primary", disabled = false }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="group flex w-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2"><div className={`rounded-lg p-2.5 ${accentClasses[accent] || accentClasses.primary}`}>{Icon && <Icon aria-hidden="true" className="h-5 w-5" />}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><h3 className="font-semibold text-slate-800">{title}</h3><ArrowUpRight aria-hidden="true" className="h-4 w-4 text-slate-400 transition group-hover:text-[#103746]" /></div><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div></button>;
}
