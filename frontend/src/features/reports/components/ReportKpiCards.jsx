import { CircleDollarSign, CircleCheckBig, ReceiptText, TriangleAlert, TrendingDown, TrendingUp } from "lucide-react";

const cardStyles = { revenue: "bg-[#103746] text-white", standard: "border border-slate-200 bg-white text-slate-900" };

export default function ReportKpiCards({ metrics, formatMoney }) {
  const cards = [
    { label: "Total Revenue", value: formatMoney(metrics.revenue), note: "Amount collected", icon: CircleDollarSign, style: "revenue" },
    { label: "Outstanding", value: formatMoney(metrics.outstanding), note: "Across open invoices", icon: ReceiptText },
    { label: "Paid Invoices", value: metrics.paid.count, note: `${formatMoney(metrics.paid.value)} settled`, icon: CircleCheckBig },
    { label: "Overdue", value: formatMoney(metrics.overdue.value), note: `${metrics.overdue.count} invoice${metrics.overdue.count === 1 ? "" : "s"} overdue`, icon: TriangleAlert },
    { label: "Expenses", value: formatMoney(metrics.expenses || 0), note: "Recorded project costs", icon: TrendingDown },
    { label: "Net cash profit", value: formatMoney(metrics.profit || 0), note: `${(metrics.profitMargin || 0).toFixed(1)}% margin`, icon: TrendingUp },
  ];
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6">{cards.map(({ label, value, note, icon: Icon, style = "standard" }) => <article key={label} className={`rounded-2xl p-5 shadow-sm ${cardStyles[style]}`}><div className="flex items-start justify-between gap-4"><div><p className={`text-sm ${style === "revenue" ? "text-slate-200" : "text-slate-500"}`}>{label}</p><p className="mt-2 text-2xl font-bold tracking-tight">{value}</p></div><span className={`rounded-xl p-3 ${style === "revenue" ? "bg-white/15" : "bg-teal-50 text-[#18566E]"}`}><Icon className="h-5 w-5" /></span></div><p className={`mt-5 text-sm ${style === "revenue" ? "text-slate-200" : "text-slate-500"}`}>{note}</p></article>)}</div>;
}
