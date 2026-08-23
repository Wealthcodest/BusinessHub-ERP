import { Building2, Eye, Pencil, Trash2 } from "lucide-react";

import { DataTable } from "@/components/ui";
import BusinessStatusBadge from "./BusinessStatusBadge";

const columns = [
  {
    key: "name",
    label: "Business",
    sortable: true,
    render: (business) => (
      <div className="flex items-center gap-3 font-medium text-slate-800">
        {business.logo ? (
          <img
            src={business.logo}
            alt=""
            className="h-9 w-9 rounded-lg border border-slate-200 object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-500">
            {business.name.charAt(0)}
          </div>
        )}
        <span>{business.name}</span>
      </div>
    ),
  },
  { key: "industry", label: "Industry", sortable: true },
  { key: "owner", label: "Owner", sortable: true, render: (business) => business.owner || "—" },
  { key: "status", label: "Status", sortable: true, render: (business) => <BusinessStatusBadge status={business.status} /> },
  { key: "createdAt", label: "Created", sortable: true },
];

export default function BusinessTable({ businesses, loading, onCreate, onView, onEdit, onDelete }) {
  return <DataTable data={businesses} columns={columns} loading={loading} getRowLabel={(business) => business.name} searchFields={["name", "industry", "owner", "status"]} searchPlaceholder="Search businesses..." primaryAction={{ label: "+ New Business", onClick: onCreate }} emptyState={{ icon: Building2, title: "No businesses found", description: "Create your first business.", primaryAction: { label: "+ New Business", onClick: onCreate } }} getRowActions={(business) => [
    { label: "View", icon: Eye, onClick: () => onView(business) },
    { label: "Edit", icon: Pencil, onClick: () => onEdit(business) },
    { label: "Delete", icon: Trash2, destructive: true, onClick: () => onDelete(business.id, business.name) },
  ]} />;
}
