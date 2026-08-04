import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Businesses",
    icon: Building2,
    path: "/businesses",
  },
  {
    name: "Customers",
    icon: Users,
    path: "#",
  },
  {
    name: "Inventory",
    icon: Package,
    path: "#",
  },
  {
    name: "Invoices",
    icon: FileText,
    path: "#",
  },
  {
    name: "Accounting",
    icon: CreditCard,
    path: "#",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "#",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "#",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#103746] text-white flex flex-col">

      <div className="h-20 flex items-center justify-center border-b border-white/10">

        <h1 className="text-2xl font-bold">
          BusinessHub ERP
        </h1>

      </div>

      <nav className="flex-1 px-4 py-6">

        {menus.map((menu) => {

          const Icon = menu.icon;

          return (

            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-[#18566E]"
                    : "hover:bg-white/10"
                }`
              }
            >

              <Icon size={20} />

              <span>{menu.name}</span>

            </NavLink>

          );
        })}

      </nav>

    </aside>
  );
}