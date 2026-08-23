import { Building2, CirclePlus, FileText, PackagePlus, Pencil, ScrollText, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ActivityList, Avatar, Breadcrumb, DataTable, PageHeader, QuickAction, Section, StatCard } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";

const overviewColumns = [
  {
    key: "name",
    label: "Business",
    sortable: true,
    render: (business) => <div className="flex items-center gap-3"><Avatar src={business.logo} name={business.name} size="sm" /><span className="font-medium text-slate-800">{business.name}</span></div>,
  },
  { key: "industry", label: "Industry", sortable: true },
  { key: "status", label: "Status", sortable: true, render: (business) => <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${business.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{business.status}</span> },
  { key: "createdAt", label: "Created", sortable: true },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const businesses = getBusinesses();
  const activeBusinesses = businesses.filter((business) => business.status === "active").length;
  const inactiveBusinesses = businesses.filter((business) => business.status === "inactive").length;
  const latestBusinesses = [...businesses].sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt))).slice(0, 5);
  const activityItems = [
    { id: "created", icon: CirclePlus, title: "Business created", description: "New business records will appear here.", timestamp: "Activity feed", accent: "primary" },
    { id: "updated", icon: Pencil, title: "Business updated", description: "Business changes will be tracked here.", timestamp: "Activity feed", accent: "secondary" },
    { id: "deleted", icon: Trash2, title: "Business deleted", description: "Deleted business records will be tracked here.", timestamp: "Activity feed", accent: "accent" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Welcome back, Administrator. Here is your business overview." breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />} />

      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Businesses" value={businesses.length} icon={Building2} description="Across your workspace" />
          <StatCard title="Active Businesses" value={activeBusinesses} icon={Building2} description="Currently operating" accent="secondary" />
          <StatCard title="Inactive Businesses" value={inactiveBusinesses} icon={Building2} description="Require attention" accent="accent" />
          <StatCard title="Monthly Revenue" value="₦0.00" icon={FileText} description="Available with invoicing" accent="secondary" />
        </div>
      </Section>

      <Section title="Recent Activity" description="Business activity will expand as additional modules are introduced.">
        <ActivityList items={activityItems} />
      </Section>

      <Section title="Quick Actions" description="Common tasks across your workspace.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickAction title="Create Business" description="Add a new business profile." icon={CirclePlus} onClick={() => navigate("/businesses/new")} />
          <QuickAction title="View Businesses" description="Manage your business records." icon={Building2} onClick={() => navigate("/businesses")} accent="secondary" />
          <QuickAction title="Add Customer" description="Add a customer to a business." icon={Users} onClick={() => navigate("/customers/new")} accent="accent" />
          <QuickAction title="Add Product" description="Add a product or service to your catalog." icon={PackagePlus} onClick={() => navigate("/products/new")} accent="secondary" />
          <QuickAction title="Create Quotation" description="Prepare a customer quotation." icon={ScrollText} onClick={() => navigate("/quotations/new")} accent="accent" />
        </div>
      </Section>

      <Section title="Business Overview" description="Your most recently created businesses." action={<button type="button" onClick={() => navigate("/businesses")} className="text-sm font-semibold text-[#103746] hover:text-[#18566E] focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2">View all businesses</button>}>
        <DataTable data={latestBusinesses} columns={overviewColumns} getRowLabel={(business) => business.name} searchFields={["name", "industry", "status"]} searchPlaceholder="Search recent businesses..." emptyState={{ title: "No businesses found", description: "Create your first business to see it here.", primaryAction: { label: "Create Business", onClick: () => navigate("/businesses/new") } }} initialPageSize={5} />
      </Section>
    </div>
  );
}
