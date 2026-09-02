import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, DocumentActions, LoadingSkeleton, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { QuotationPreview } from "../components";
import { quotationService } from "../services/quotationService";
import { resolveDocumentTheme } from "@/features/documentThemes";

export default function QuotationPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [quotation, setQuotation] = useState(null);
  useEffect(() => { quotationService.getById(id).then((item) => { if (!item) { toast.warning("Quotation not found."); navigate("/quotations"); return; } setQuotation(item); }); }, [id, navigate, toast]);
  useEffect(() => { const refresh = () => { if (document.visibilityState === "visible") quotationService.getById(id).then((item) => item && setQuotation(item)); }; document.addEventListener("visibilitychange", refresh); window.addEventListener("focus", refresh); return () => { document.removeEventListener("visibilitychange", refresh); window.removeEventListener("focus", refresh); }; }, [id]);
  if (!quotation) return <LoadingSkeleton />;
  const business = getBusinesses().find((item) => String(item.id) === String(quotation.businessId));
  const customer = getCustomers().find((item) => String(item.id) === String(quotation.customerId));
  const resolvedTheme = resolveDocumentTheme({ business, selectedThemeId: quotation.themeId, document: quotation });
  return <div className="space-y-6"><PageHeader title="Quotation Preview" description={quotation.quotationNumber} breadcrumb={<Breadcrumb items={[{ label: "Quotations", href: "/quotations" }, { label: quotation.quotationNumber, href: `/quotations/${id}` }, { label: "Preview" }]} />} actions={<DocumentActions type="Quotation" number={quotation.quotationNumber} customer={customer} selector=".businesshub-print-document" />} /><QuotationPreview quotation={quotation} business={business} customer={customer} resolvedTheme={resolvedTheme} printable /></div>;
}

