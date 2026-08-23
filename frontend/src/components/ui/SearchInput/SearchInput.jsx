import { Search, X } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Search...", ariaLabel = "Search" }) {
  return <div className="relative"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={value} onChange={(event) => onChange(event.target.value)} aria-label={ariaLabel} placeholder={placeholder} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103746] focus:ring-2 focus:ring-[#103746]/15" />{value && <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#103746]"><X aria-hidden="true" className="h-4 w-4" /></button>}</div>;
}
