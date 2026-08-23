import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, DataTable, PageHeader, Section, useToast } from "@/components/ui";
import { Copy, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { InvoiceStatistics, InvoiceStatusBadge } from "../components";
import useInvoices from "../hooks/useInvoices";
import { invoiceService } from "../services/invoiceService";

export default function InvoicePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { invoices, loading, refreshInvoices } = useInvoices();
  const [deleteIds, setDeleteIds] = useState([]);
  const [selectionVersion, setSelectionVersion] = useState(0);

  const columns = [
    { key: "invoiceNumber", label: "Invoice #", sortable: true },
    { key: "issueDate", label: "Issue Date", sortable: true },
    { key: "status", label: "Status", render: (invoice) => <InvoiceStatusBadge status={invoice.status} /> },
    { key: "grandTotal", label: "Total", render: (invoice) => Number(invoice.grandTotal).toLocaleString() },
  ];

  async function duplicate(invoice) {
    await invoiceService.duplicate(invoice.id);
    await refreshInvoices();
    toast.success("Invoice duplicated.");
  }

  async function removeSelected() {
    const ids = [...new Set(deleteIds.filter(Boolean))];
    if (!ids.length) return;

    try {
      await Promise.all(ids.map((id) => invoiceService.delete(id)));
      await refreshInvoices();
      setSelectionVersion((value) => value + 1);
      setDeleteIds([]);
      toast.success(`${ids.length} invoice${ids.length === 1 ? "" : "s"} deleted.`);
    } catch {
      toast.error("Unable to delete selected invoices.");
    } finally {
      setDeleteIds([]);
    }
  }

  async function duplicateSelected(selectedIds) {
    const ids = [...new Set((selectedIds || []).filter(Boolean))];
    if (!ids.length) return;

    try {
      await Promise.all(ids.map((id) => invoiceService.duplicate(id)));
      await refreshInvoices();
      setSelectionVersion((value) => value + 1);
      toast.success(`${ids.length} invoice${ids.length === 1 ? "" : "s"} duplicated.`);
    } catch {
      toast.error("Unable to duplicate selected invoices.");
    }
  }

  async function markSelectedAsSent(selectedIds) {
    const ids = [...new Set((selectedIds || []).filter(Boolean))];
    if (!ids.length) return;

    try {
      await Promise.all(
        ids.map(async (id) => {
          const invoice = invoices.find((item) => String(item.id) === String(id));
          if (!invoice) return null;
          return invoiceService.update(id, { ...invoice, status: "sent" });
        })
      );
      await refreshInvoices();
      setSelectionVersion((value) => value + 1);
      toast.success(`${ids.length} invoice${ids.length === 1 ? "" : "s"} marked as sent.`);
    } catch {
      toast.error("Unable to update selected invoices.");
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Invoice Management" description="Manage invoices, payments, and outstanding balances." />
      <InvoiceStatistics invoices={invoices} />

      <Section title="Invoices">
        <DataTable
          data={invoices}
          columns={columns}
          loading={loading}
          selectionVersion={selectionVersion}
          getRowLabel={(invoice) => invoice.invoiceNumber}
          searchFields={["invoiceNumber", "status"]}
          primaryAction={{ label: "+ New Invoice", onClick: () => navigate("/invoices/new") }}
          emptyState={{ icon: FileText, title: "No invoices", primaryAction: { label: "+ New Invoice", onClick: () => navigate("/invoices/new") } }}
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
          getRowActions={(invoice) => [
            { label: "View", icon: Eye, onClick: () => navigate(`/invoices/${invoice.id}`) },
            { label: "Edit", icon: Pencil, onClick: () => navigate(`/invoices/${invoice.id}/edit`) },
            { label: "Duplicate", icon: Copy, onClick: () => duplicate(invoice) },
            { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteIds([invoice.id]) },
          ]}
        />
      </Section>

      <ConfirmDialog
        open={deleteIds.length > 0}
        title={`Delete ${deleteIds.length} Invoice${deleteIds.length === 1 ? "" : "s"}?`}
        message={
          deleteIds.length > 0
            ? `This action will permanently remove the selected invoice${deleteIds.length === 1 ? "" : "s"}.`
            : "This action will permanently remove the selected invoices."
        }
        danger
        confirmText={`Delete ${deleteIds.length} Invoice${deleteIds.length === 1 ? "" : "s"}`}
        onConfirm={removeSelected}
        onCancel={() => setDeleteIds([])}
      />
    </div>
  );
}

