import { Building2, CirclePlus, FileText, PackagePlus, ScrollText, TrendingDown, TrendingUp, Users, WalletCards } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useActiveBusiness } from "@/app/ActiveBusinessContext";
import { ActivityList, Avatar, Breadcrumb, DataTable, PageHeader, QuickAction, Section, StatCard } from "@/components/ui";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { getExpenses } from "@/features/expenses/storage/expenseStorage";
import { getInvoices } from "@/features/invoices/storage/invoiceStorage";
import { getPayments } from "@/features/payments/storage/paymentStorage";
import { getProducts } from "@/features/products/storage/productStorage";
import { getQuotations } from "@/features/quotations/storage/quotationStorage";

const overviewColumns = [
  { key: "name", label: "Business", sortable: true, render: (business) => <div className="flex items-center gap-3"><Avatar src={business.logo} name={business.name} size="sm" /><span className="font-medium text-slate-800">{business.name}</span></div> },
  { key: "industry", label: "Industry", sortable: true },
  { key: "status", label: "Status", sortable: true, render: (business) => <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${business.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{business.status}</span> },
  { key: "createdAt", label: "Created", sortable: true },
];

const number = (value) => Number(value || 0);

function CollectionProgress({ collected, revenue }) {
  const percent = Math.min(100, revenue ? (collected / revenue) * 100 : 0);
  return <div><div className="mb-2 flex items-center justify-between text-sm"><span className="text-slate-500">Collection rate</span><strong className="text-slate-800">{percent.toFixed(1)}%</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#18566E]" style={{ width: `${percent}%` }} /></div><p className="mt-3 text-xs text-slate-500">{percent >= 100 ? "All invoiced revenue has been collected." : "Based on recorded payments against issued invoices."}</p></div>;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { activeBusiness, businesses } = useActiveBusiness();
  const activeBusinesses = businesses.filter((business) => business.status === "active").length;
  const inactiveBusinesses = businesses.filter((business) => business.status === "inactive").length;
  const latestBusinesses = [...businesses].sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt))).slice(0, 5);
  const dashboard = useMemo(() => {
    if (!activeBusiness) return null;
    const hasBusiness = (item) => String(item.businessId) === String(activeBusiness.id);
    const invoices = getInvoices().filter(hasBusiness);
    const payments = getPayments().filter(hasBusiness);
    const customers = getCustomers().filter(hasBusiness);
    const products = getProducts().filter(hasBusiness);
    const quotations = getQuotations().filter(hasBusiness);
    const expenses = getExpenses().filter(hasBusiness);
    const revenue = invoices.filter((item) => item.status !== "cancelled").reduce((total, item) => total + number(item.grandTotal), 0);
    const collected = payments.reduce((total, item) => total + number(item.amount), 0);
    const costs = expenses.reduce((total, item) => total + number(item.amount), 0);
    const outstanding = invoices.filter((item) => item.status !== "cancelled").reduce((total, item) => total + Math.max(0, number(item.balance ?? number(item.grandTotal) - number(item.amountPaid))), 0);
    const activities = [
      ...payments.map((item) => ({ id: `payment-${item.id}`, icon: WalletCards, title: "Payment recorded", description: `${item.receiptNumber || "Payment"} received`, timestamp: item.paymentDate || item.createdAt, accent: "secondary" })),
      ...invoices.map((item) => ({ id: `invoice-${item.id}`, icon: FileText, title: "Invoice updated", description: `${item.invoiceNumber || "Invoice"} is ${String(item.status || "draft").replaceAll("_", " ")}`, timestamp: item.updatedAt || item.issueDate, accent: "primary" })),
      ...quotations.map((item) => ({ id: `quotation-${item.id}`, icon: ScrollText, title: "Quotation updated", description: `${item.quotationNumber || "Quotation"} is ${item.status || "draft"}`, timestamp: item.updatedAt || item.issueDate, accent: "accent" })),
    ].sort((first, second) => String(second.timestamp || "").localeCompare(String(first.timestamp || ""))).slice(0, 6);
    return { invoices, customers, products, activities, revenue, collected, expenses: costs, outstanding, profit: collected - costs, lowStock: products.filter((item) => item.trackInventory && number(item.openingStock) <= number(item.reorderLevel || item.minimumStock)).length };
  }, [activeBusiness]);
  const formatMoney = useMemo(() => new Intl.NumberFormat("en-NG", { style: "currency", currency: activeBusiness?.currency || "NGN", maximumFractionDigits: 2 }), [activeBusiness?.currency]);

  return <div className="space-y-6">
    <PageHeader title="Dashboard" description={activeBusiness ? `${activeBusiness.name} · operational and financial overview` : "Create or select a business to view its dashboard."} breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />} />
    {activeBusiness ? <>
      <Section title="Financial overview" description="Current figures for the selected business.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard title="Revenue" value={formatMoney.format(dashboard.revenue)} icon={TrendingUp} description="Issued invoices" />
          <StatCard title="Collected" value={formatMoney.format(dashboard.collected)} icon={WalletCards} description="Recorded payments" accent="secondary" />
          <StatCard title="Outstanding" value={formatMoney.format(dashboard.outstanding)} icon={FileText} description={`${dashboard.invoices.filter((item) => item.status !== "paid" && item.status !== "cancelled").length} open invoice(s)`} accent="accent" />
          <StatCard title="Expenses" value={formatMoney.format(dashboard.expenses)} icon={TrendingDown} description="Recorded project costs" accent="accent" />
          <StatCard title="Net cash position" value={formatMoney.format(dashboard.profit)} icon={dashboard.profit >= 0 ? TrendingUp : TrendingDown} description="Collected less expenses" accent={dashboard.profit >= 0 ? "secondary" : "accent"} />
        </div>
      </Section>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <Section title="Payment collection" description="How much issued revenue has been collected."><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"><CollectionProgress collected={dashboard.collected} revenue={dashboard.revenue} /><div className="mt-5 grid grid-cols-2 border-t border-slate-100 pt-4 text-sm"><div><p className="text-slate-500">Active customers</p><p className="mt-1 text-lg font-semibold text-slate-900">{dashboard.customers.filter((item) => item.status === "active").length}</p></div><div className="border-l border-slate-100 pl-4"><p className="text-slate-500">Low-stock items</p><p className="mt-1 text-lg font-semibold text-slate-900">{dashboard.lowStock}</p></div></div></div></Section>
        <Section title="Recent activity" description="Latest business records."><div className="rounded-lg border border-slate-200 bg-white px-5 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"><ActivityList items={dashboard.activities.length ? dashboard.activities : [{ id: "empty", icon: CirclePlus, title: "No activity yet", description: "Create an invoice, quotation, or payment to begin.", timestamp: "Selected business", accent: "primary" }]} /></div></Section>
      </div>
      <Section title="Quick actions" description={`Create and manage records for ${activeBusiness.name}.`}><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><QuickAction title="Add Customer" description="Create a customer for this business." icon={Users} onClick={() => navigate("/customers/new")} /><QuickAction title="Add Product" description="Add to the catalog." icon={PackagePlus} onClick={() => navigate("/products/new")} accent="secondary" /><QuickAction title="Create Invoice" description="Issue an invoice." icon={FileText} onClick={() => navigate("/invoices/new")} accent="accent" /><QuickAction title="Create Quotation" description="Prepare a quotation." icon={ScrollText} onClick={() => navigate("/quotations/new")} accent="secondary" /></div></Section>
    </> : <Section title="Get started" description="A business must be selected before business-specific information can be displayed."><QuickAction title="Create Business" description="Add your first business profile." icon={CirclePlus} onClick={() => navigate("/businesses/new")} /></Section>}
    <Section title="Workspace overview" description="A concise super-admin view across all businesses."><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard title="Total Businesses" value={businesses.length} icon={Building2} description="Across your workspace" /><StatCard title="Active Businesses" value={activeBusinesses} icon={Building2} description="Currently operating" accent="secondary" /><StatCard title="Inactive Businesses" value={inactiveBusinesses} icon={Building2} description="Require attention" accent="accent" /><StatCard title="Selected Catalog" value={dashboard?.products.length || 0} icon={PackagePlus} description="Products and services" accent="secondary" /></div></Section>
    <Section title="Business overview" description="Your most recently created businesses." action={<button type="button" onClick={() => navigate("/businesses")} className="text-sm font-semibold text-[#103746] hover:text-[#18566E] focus:outline-none focus:ring-2 focus:ring-[#103746] focus:ring-offset-2">View all businesses</button>}><DataTable data={latestBusinesses} columns={overviewColumns} getRowLabel={(business) => business.name} searchFields={["name", "industry", "status"]} searchPlaceholder="Search recent businesses..." emptyState={{ title: "No businesses found", description: "Create your first business to see it here.", primaryAction: { label: "Create Business", onClick: () => navigate("/businesses/new") } }} initialPageSize={5} /></Section>
  </div>;
}
