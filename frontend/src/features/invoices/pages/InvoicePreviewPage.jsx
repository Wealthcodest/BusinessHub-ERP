import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentActions, LoadingSkeleton, PageHeader } from "@/components/ui";
import { resolveDocumentTheme } from "@/features/documentThemes";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { InvoicePreview } from "../components";
import { invoiceService } from "../services/invoiceService";

export default function InvoicePreviewPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  useEffect(() => { invoiceService.getById(id).then(setInvoice); }, [id]);
  useEffect(() => { const refresh = () => { if (document.visibilityState === "visible") invoiceService.getById(id).then(setInvoice); }; document.addEventListener("visibilitychange", refresh); window.addEventListener("focus", refresh); return () => { document.removeEventListener("visibilitychange", refresh); window.removeEventListener("focus", refresh); }; }, [id]);
  if (!invoice) return <LoadingSkeleton />;
  const business = getBusinesses().find((item) => String(item.id) === String(invoice.businessId));
  const customer = getCustomers().find((item) => String(item.id) === String(invoice.customerId));
  const resolvedTheme = resolveDocumentTheme({ business, selectedThemeId: invoice.themeId, document: invoice });
  return <div className="space-y-6"><PageHeader title="Invoice Preview" description={invoice.invoiceNumber} actions={<DocumentActions type="Invoice" number={invoice.invoiceNumber} customer={customer} selector=".businesshub-print-document" />} /><InvoicePreview invoice={invoice} business={business} customer={customer} resolvedTheme={resolvedTheme} /></div>;
}

