import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Input } from "@/components/ui";

const matchesProduct = (product, query) => [product.name, product.sku, product.barcode, product.description, product.category, product.type]
  .filter(Boolean)
  .some((value) => String(value).toLowerCase().includes(query));

export default function ProductItemSelector({ item, products = [], currency, onSelectProduct, onUseCustom }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", "Products", "Services", ...new Set(products.map((product) => product.category).filter(Boolean))], [products]);
  const filtered = useMemo(() => products.filter((product) => {
    const typeMatches = category === "All" || (category === "Products" ? product.type === "Product" : category === "Services" ? product.type === "Service" : product.category === category);
    return typeMatches && matchesProduct(product, query.trim().toLowerCase());
  }), [products, query, category]);
  const money = (value) => new Intl.NumberFormat("en-NG", { style: "currency", currency: currency || "NGN" }).format(Number(value || 0));
  const select = (product) => { onSelectProduct(product); setOpen(false); setQuery(""); };

  return <div className="relative min-w-[16rem]">
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex min-h-10 flex-1 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-left text-sm hover:border-[#103746] focus:outline-none focus:ring-2 focus:ring-teal-100">
        <span className={item.productId ? "font-medium text-slate-800" : "text-slate-500"}>{item.productId ? item.description : "Select Product or Service"}</span>
        <span className="ml-3 text-slate-400">⌄</span>
      </button>
      {item.productId && <button type="button" onClick={onUseCustom} className="whitespace-nowrap text-xs font-medium text-[#103746] hover:underline">Use custom</button>}
    </div>
    {open && <div className="absolute z-20 mt-2 w-[min(28rem,calc(100vw-3rem))] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <div className="relative"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." className="pl-9 pr-9" />{query && <button type="button" aria-label="Clear product search" onClick={() => setQuery("")} className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button>}</div>
      <div className="mt-3 flex flex-wrap gap-1.5">{categories.map((value) => <button type="button" key={value} onClick={() => setCategory(value)} className={`rounded-full px-2.5 py-1 text-xs font-medium ${category === value ? "bg-[#103746] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{value}</button>)}</div>
      <div className="mt-3 max-h-60 overflow-y-auto">{filtered.length ? filtered.map((product) => <button type="button" key={product.id} onClick={() => select(product)} className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left hover:bg-teal-50 focus:bg-teal-50 focus:outline-none"><span><span className="block font-medium text-slate-800">{product.name}</span><span className="block text-xs text-slate-500">{[product.sku, product.category, product.type].filter(Boolean).join(" · ")}</span></span><span className="whitespace-nowrap text-sm font-semibold text-[#103746]">{money(product.sellingPrice)}</span></button>) : <div className="px-3 py-6 text-center text-sm text-slate-500">No products found.</div>}</div>
      <div className="mt-3 border-t border-slate-100 pt-3"><Button type="button" variant="secondary" className="w-full" onClick={() => { onUseCustom(); setOpen(false); }}>+ Add Custom Item</Button></div>
    </div>}
  </div>;
}
