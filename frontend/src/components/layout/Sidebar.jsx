import { NavLink } from "react-router-dom";
import { BarChart3, Building2, CreditCard, FileText, FolderKanban, LayoutDashboard, Package, ReceiptText, Settings, Users, WalletCards } from "lucide-react";

const menus = [
  { label: "Overview", items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/" }] },
  { label: "Workspace", items: [{ name: "Businesses", icon: Building2, path: "/businesses" }, { name: "Customers", icon: Users, path: "/customers" }, { name: "Products & Services", icon: Package, path: "/products" }, { name: "Projects", icon: FolderKanban, path: "/projects" }] },
  { label: "Finance", items: [{ name: "Quotations", icon: FileText, path: "/quotations" }, { name: "Invoices", icon: CreditCard, path: "/invoices" }, { name: "Payments", icon: WalletCards, path: "/payments" }, { name: "Expenses", icon: ReceiptText, path: "/project-expenses" }, { name: "Reports", icon: BarChart3, path: "/reports" }] },
  { label: "System", items: [{ name: "User Management", icon: Users, path: "/users" }, { name: "Settings", icon: Settings, path: "/settings/document-themes" }] },
];

export default function Sidebar() {
  return <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#103746] text-white lg:flex"><div className="flex h-16 items-center gap-3 border-b border-white/10 px-5"><div className="grid h-8 w-8 place-items-center rounded-md bg-[#D7B159] text-sm font-black text-[#103746]">O</div><div><h1 className="text-[15px] font-semibold tracking-tight">Ovixa</h1><p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">ERP workspace</p></div></div><nav className="flex-1 overflow-y-auto px-3 py-4">{menus.map((group) => <div key={group.label} className="mb-5"><p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{group.label}</p>{group.items.map((menu) => { const Icon = menu.icon; return <NavLink key={menu.name} to={menu.path} title={menu.name} className={({ isActive }) => `mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white/14 text-white shadow-sm" : "text-white/70 hover:bg-white/8 hover:text-white"}`}><Icon size={17} strokeWidth={1.9} /><span>{menu.name}</span></NavLink>; })}</div>)}</nav><div className="border-t border-white/10 px-5 py-4 text-xs text-white/45">Ovixa ERP · Admin</div></aside>;
}


