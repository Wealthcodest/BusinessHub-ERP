import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">{items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">{index > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />}{item.href && index !== items.length - 1 ? <Link to={item.href} className="rounded hover:text-[#103746] focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2">{item.label}</Link> : <span className={index === items.length - 1 ? "font-medium text-slate-700" : ""}>{item.label}</span>}</li>)}</ol></nav>;
}
