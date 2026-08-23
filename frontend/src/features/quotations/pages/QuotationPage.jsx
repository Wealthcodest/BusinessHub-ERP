import { useState } from "react";
import { Copy, Eye, Pencil, Trash2, FileText } from "lucide-react";
import { ConfirmDialog, DataTable, PageHeader, Section, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { QuotationStatistics, QuotationStatusBadge } from "../components";
import useQuotations from "../hooks/useQuotations";
import { quotationService } from "../services/quotationService";

const money = (value) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Number(value || 0));

export default function QuotationPage() {
  const toast = useToast();
  const { quotations, loading, refreshQuotations } = useQuotations();
  const [deleteIds, setDeleteIds] = useState([]);
  const [selectionVersion, setSelectionVersion] = useState(0);

  const businesses = getBusinesses();
  const customers = getCustomers();
  const customerName = (id) => customers.find((item) => String(item.id) === String(id))?.displayName || "Unknown customer";
  const businessName = (id) => businesses.find((item) => String(item.id) === String(id))?.name || "Unknown business";

  async function duplicate(quotation) {
    await quotationService.duplicate(quotation.id);
    await refreshQuotations();
    toast.success("Quotation duplicated as a draft.");
  }

  async function removeSelected() {
    const ids = [...new Set(deleteIds.filter(Boolean))];
    if (!ids.length) return;

    try {
      await Promise.all(ids.map((id) => quotationService.delete(id)));
      await refreshQuotations();
      setSelectionVersion((value) => value + 1);
      setDeleteIds([]);
      toast.success(`${ids.length} quotation${ids.length === 1 ? "" : "s"} deleted.`);
    } catch {
      toast.error("Unable to delete selected quotations.");
    } finally {
      setDeleteIds([]);
    }
  }

  async function duplicateSelected(selectedIds) {
    const ids = [...new Set((selectedIds || []).filter(Boolean))];
    if (!ids.length) return;

    try {
      await Promise.all(ids.map((id) => quotationService.duplicate(id)));
      await refreshQuotations();
      setSelectionVersion((value) => value + 1);
      toast.success(`${ids.length} quotation${ids.length === 1 ? "" : "s"} duplicated.`);
    } catch {
      toast.error("Unable to duplicate selected quotations.");
    }
  }

  async function markSelectedAsSent(selectedIds) {
    const ids = [...new Set((selectedIds || []).filter(Boolean))];
    if (!ids.length) return;

    try {
      await Promise.all(
        ids.map(async (id) => {
          const quotation = quotations.find((item) => String(item.id) === String(id));
          if (!quotation) return null;
          return quotationService.update(id, { ...quotation, status: "sent" });
        })
      );
      await refreshQuotations();
      setSelectionVersion((value) => value + 1);
      toast.success(`${ids.length} quotation${ids.length === 1 ? "" : "s"} marked as sent.`);
    } catch {
      toast.error("Unable to update selected quotations.");
    }
  }

  const columns = [
    { key: "quotationNumber", label: "Quotation #", sortable: true, render: (item) => <span className="font-semibold text-[#103746]">{item.quotationNumber}</span> },
    { key: "customerId", label: "Customer", sortable: true, sortValue: (item) => customerName(item.customerId), render: (item) => customerName(item.customerId) },
    { key: "businessId", label: "Business", sortable: true, sortValue: (item) => businessName(item.businessId), render: (item) => businessName(item.businessId) },
    { key: "issueDate", label: "Issue Date", sortable: true },
    { key: "status", label: "Status", sortable: true, render: (item) => <QuotationStatusBadge status={item.status} /> },
    { key: "grandTotal", label: "Total", sortable: true, render: (item) => money(item.grandTotal) },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Quotation Management" description="Create, send, and track customer quotations." />
      <QuotationStatistics quotations={quotations} />

      <Section title="Quotations" description="Search, sort, and manage quotation records.">
        <DataTable
          data={quotations}
          columns={columns}
          loading={loading}
          selectionVersion={selectionVersion}
          getRowLabel={(item) => item.quotationNumber}
          searchFields={["quotationNumber", (item) => customerName(item.customerId), (item) => businessName(item.businessId), "status"]}
          searchPlaceholder="Search quotations, customers, businesses..."
          primaryAction={{ label: "+ New Quotation", onClick: () => window.location.assign("/quotations/new") }}
          emptyState={{
            icon: FileText,
            title: "No quotations found",
            description: "Create your first customer quotation.",
            primaryAction: { label: "+ New Quotation", onClick: () => window.location.assign("/quotations/new") },
          }}
          bulkActions={[
            {
              label: "Delete",
              destructive: true,
              onClick: (selectedIds) => {
                const ids = [...new Set((selectedIds || []).filter(Boolean))];
                if (ids.length) setDeleteIds(ids);
              },
            },
            {
              label: "Mark as Sent",
              onClick: (selectedIds) => markSelectedAsSent(selectedIds),
            },
            {
              label: "Duplicate",
              onClick: (selectedIds) => duplicateSelected(selectedIds),
            },
          ]}
          getRowActions={(item) => [
            { label: "View", icon: Eye, onClick: () => window.location.assign(`/quotations/${item.id}`) },
            { label: "Edit", icon: Pencil, onClick: () => window.location.assign(`/quotations/${item.id}/edit`) },
            { label: "Duplicate", icon: Copy, onClick: () => duplicate(item) },
            { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteIds([item.id]) },
          ]}
        />
      </Section>

      <ConfirmDialog
        open={deleteIds.length > 0}
        title={`Delete ${deleteIds.length} Quotation${deleteIds.length === 1 ? "" : "s"}?`}
        message={
          deleteIds.length > 0
            ? `This action will permanently remove the selected quotation${deleteIds.length === 1 ? "" : "s"}.`
            : "This action will permanently remove the selected quotations."
        }
        danger
        confirmText={`Delete ${deleteIds.length} Quotation${deleteIds.length === 1 ? "" : "s"}`}
        onConfirm={removeSelected}
        onCancel={() => setDeleteIds([])}
      />
    </div>
  );
}

