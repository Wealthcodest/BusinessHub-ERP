import { DocumentPreview } from "@/features/documentThemes/components";
export default function QuotationPreview({ quotation, business, customer, resolvedTheme, printable = false }) { return <DocumentPreview document={quotation} business={business} customer={customer} theme={resolvedTheme?.theme} type="quotation" printable={printable} />; }
